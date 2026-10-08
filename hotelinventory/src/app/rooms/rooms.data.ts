import { Room } from './room.model';

/** Mock payload. `RoomsService` loads this the way a later HTTP call would. */
export const seedRooms: Room[] = [
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
