import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoomCard } from './room-card';
import { RoomsService } from './rooms.service';

@Component({
  selector: 'app-rooms',
  imports: [RoomCard, RouterLink],
  templateUrl: './rooms.html',
  styleUrl: './rooms.css',
})
export class Rooms {
  private readonly roomsService = inject(RoomsService);

  readonly searchTerm = signal('');
  readonly rooms = this.roomsService.rooms;
  readonly status = this.roomsService.status;
  readonly errorMessage = this.roomsService.errorMessage;

  readonly filteredRooms = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const list = this.rooms();
    if (!term) {
      return list;
    }
    return list.filter((room) => room.name.toLowerCase().includes(term));
  });

  constructor() {
    void this.roomsService.load();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  retry(): void {
    void this.roomsService.load();
  }
}
