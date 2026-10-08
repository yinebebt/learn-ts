import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RoomsService } from './rooms.service';

@Component({
  selector: 'app-room-detail',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './room-detail.html',
  styleUrl: './room-detail.css',
})
export class RoomDetail {
  private readonly roomsService = inject(RoomsService);
  private readonly router = inject(Router);

  readonly id = input.required<string>();
  readonly status = this.roomsService.status;
  readonly errorMessage = this.roomsService.errorMessage;

  readonly room = computed(() => {
    const id = Number(this.id());
    if (Number.isNaN(id)) {
      return undefined;
    }
    return this.roomsService.findById(id);
  });

  constructor() {
    void this.roomsService.load();
  }

  retry(): void {
    void this.roomsService.load();
  }

  onDelete(): void {
    const room = this.room();
    if (!room) {
      return;
    }
    if (!confirm(`Delete ${room.name}?`)) {
      return;
    }
    this.roomsService.remove(room.id);
    void this.router.navigate(['/rooms']);
  }
}
