import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RoomsService } from './rooms.service';

@Component({
  selector: 'app-room-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './room-form.html',
})
export class RoomForm {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly roomsService = inject(RoomsService);

  /** Present on `/rooms/:id/edit`; absent on `/rooms/new`. */
  readonly id = input<string>();

  readonly isEdit = computed(() => {
    const id = this.id();
    return id != null && id !== '';
  });

  readonly missing = signal(false);
  readonly status = this.roomsService.status;
  readonly errorMessage = this.roomsService.errorMessage;

  private readonly hydratedId = signal<number | null>(null);

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    capacity: [1, [Validators.required, Validators.min(1)]],
    image: [''],
    available: [true],
  });

  constructor() {
    void this.roomsService.load();

    effect(() => {
      const status = this.roomsService.status();
      const id = this.id();
      if (id == null || id === '') {
        this.missing.set(false);
        return;
      }

      const numericId = Number(id);
      const room = this.roomsService.findById(numericId);
      if (room) {
        if (this.hydratedId() !== room.id) {
          this.form.setValue({
            name: room.name,
            price: room.price,
            capacity: room.capacity,
            image: room.image,
            available: room.available,
          });
          this.hydratedId.set(room.id);
        }
        this.missing.set(false);
        return;
      }

      if (status === 'ready') {
        this.hydratedId.set(null);
        this.missing.set(true);
      }
    });
  }

  retry(): void {
    void this.roomsService.load();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    if (this.isEdit()) {
      const updated = this.roomsService.update(Number(this.id()), value);
      if (updated) {
        void this.router.navigate(['/rooms', updated.id]);
      }
      return;
    }

    const created = this.roomsService.add({
      ...value,
      available: true,
    });
    void this.router.navigate(['/rooms', created.id]);
  }
}
