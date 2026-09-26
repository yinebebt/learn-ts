import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Room } from './room.model';

@Component({
  selector: 'app-room-card',
  imports: [CurrencyPipe],
  templateUrl: './room-card.html',
  styleUrl: './room-card.css',
})
export class RoomCard {
  readonly room = input.required<Room>();
}
