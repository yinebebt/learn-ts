import { CurrencyPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { findRoomById } from './rooms.data';

@Component({
  selector: 'app-room-detail',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './room-detail.html',
  styleUrl: './room-detail.css',
})
export class RoomDetail {
  readonly id = input.required<string>();

  readonly room = computed(() => {
    const id = Number(this.id());
    if (Number.isNaN(id)) {
      return undefined;
    }
    return findRoomById(id);
  });
}
