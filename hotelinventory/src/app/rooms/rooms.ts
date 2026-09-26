import { Component, computed, signal } from '@angular/core';
import { Room } from './room.model';
import { RoomCard } from './room-card';

@Component({
  selector: 'app-rooms',
  imports: [RoomCard],
  templateUrl: './rooms.html',
  styleUrl: './rooms.css',
})
export class Rooms {
  readonly searchTerm = signal('');

  readonly rooms: Room[] = [
    {
      id: 1,
      name: 'Garden Twin',
      price: 100,
      image: '/room-1.jpg',
      capacity: 2,
      available: true,
    },
    {
      id: 2,
      name: 'City Queen',
      price: 200,
      image: '/room-2.jpeg',
      capacity: 2,
      available: false,
    },
    {
      id: 3,
      name: 'Patio Suite',
      price: 300,
      image:
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
      capacity: 3,
      available: true,
    },
  ];

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
