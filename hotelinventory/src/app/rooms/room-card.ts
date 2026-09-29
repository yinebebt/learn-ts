import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Room } from './room.model';

@Component({
  selector: 'app-room-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './room-card.html',
  styleUrl: './room-card.css',
})
export class RoomCard {
  readonly room = input.required<Room>();
}
