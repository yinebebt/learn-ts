import { Injectable, InjectionToken, inject, signal } from '@angular/core';
import { PendingTasks } from '@angular/core';
import { Room } from './room.model';
import { seedRooms } from './rooms.data';

/** How long `load()` waits before publishing rooms. Tests override this with 0. */
export const ROOMS_LOAD_DELAY = new InjectionToken<number>('ROOMS_LOAD_DELAY', {
  factory: () => 400,
});

export type RoomsLoadStatus = 'idle' | 'loading' | 'ready' | 'error';

/**
 * In-memory stand-in for HTTP. `load()` waits, then publishes `seedRooms`.
 * A real API later replaces `fetchRooms()` only.
 */
@Injectable({ providedIn: 'root' })
export class RoomsService {
  private readonly pendingTasks = inject(PendingTasks);
  private readonly loadDelayMs = inject(ROOMS_LOAD_DELAY);

  private readonly roomsState = signal<Room[]>([]);
  private readonly statusState = signal<RoomsLoadStatus>('idle');
  private readonly errorState = signal<string | null>(null);

  private readonly removedIds = new Set<number>();
  private nextId = seedRooms.reduce((max, room) => Math.max(max, room.id), 0) + 1;
  private failNext = false;
  private inflight: Promise<void> | null = null;

  readonly rooms = this.roomsState.asReadonly();
  readonly status = this.statusState.asReadonly();
  readonly errorMessage = this.errorState.asReadonly();

  /** Next `load()` fails once, so the error UI can be tested. */
  failNextLoad(): void {
    this.failNext = true;
  }

  load(): Promise<void> {
    if (this.inflight) {
      return this.inflight;
    }
    if (this.statusState() === 'ready') {
      return Promise.resolve();
    }

    this.statusState.set('loading');
    this.errorState.set(null);

    let resolveLoad!: () => void;
    this.inflight = new Promise<void>((resolve) => {
      resolveLoad = resolve;
    });

    void this.pendingTasks.run(async () => {
      try {
        const fetched = await this.fetchRooms();
        this.applyFetched(fetched);
        this.statusState.set('ready');
      } catch (error: unknown) {
        this.statusState.set('error');
        this.errorState.set(error instanceof Error ? error.message : 'Could not load rooms.');
      } finally {
        this.inflight = null;
        resolveLoad();
      }
    });

    return this.inflight;
  }

  findById(id: number): Room | undefined {
    return this.roomsState().find((room) => room.id === id);
  }

  add(data: Omit<Room, 'id'>): Room {
    const room: Room = { ...data, id: this.nextId++ };
    this.roomsState.update((list) => [...list, room]);
    return room;
  }

  update(id: number, data: Omit<Room, 'id'>): Room | undefined {
    let updated: Room | undefined;
    this.roomsState.update((list) =>
      list.map((room) => {
        if (room.id !== id) {
          return room;
        }
        updated = { ...data, id };
        return updated;
      }),
    );
    return updated;
  }

  remove(id: number): boolean {
    if (!this.roomsState().some((room) => room.id === id)) {
      return false;
    }
    this.removedIds.add(id);
    this.roomsState.update((list) => list.filter((room) => room.id !== id));
    return true;
  }

  private fetchRooms(): Promise<Room[]> {
    const fail = this.failNext;
    this.failNext = false;
    const delay = this.loadDelayMs;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (fail) {
          reject(new Error('Could not load rooms.'));
          return;
        }
        resolve(seedRooms.map((room) => ({ ...room })));
      }, delay);
    });
  }

  /** Keep creates, edits, and deletes that happened while the first load was in flight. */
  private applyFetched(fetched: Room[]): void {
    this.roomsState.update((current) => {
      const currentById = new Map(current.map((room) => [room.id, room]));
      const fetchedIds = new Set(fetched.map((room) => room.id));
      const merged = fetched
        .filter((room) => !this.removedIds.has(room.id))
        .map((room) => currentById.get(room.id) ?? room);
      const localOnly = current.filter(
        (room) => !fetchedIds.has(room.id) && !this.removedIds.has(room.id),
      );
      return [...merged, ...localOnly];
    });
  }
}
