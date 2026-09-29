import { Component, computed, signal } from '@angular/core';
import { ROOMS } from './rooms.data';
import { RoomCard } from './room-card';

@Component({
  selector: 'app-rooms',
  imports: [RoomCard],
  templateUrl: './rooms.html',
  styleUrl: './rooms.css',
})
export class Rooms {
  readonly searchTerm = signal('');
  readonly rooms = ROOMS;

  readonly filteredRooms = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) {
      return this.rooms;
    }
    return this.rooms.filter((room) => room.name.toLowerCase().includes(term));
  });

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }
}
