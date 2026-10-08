import { Routes } from '@angular/router';
import { RoomDetail } from './rooms/room-detail';
import { RoomForm } from './rooms/room-form';
import { Rooms } from './rooms/rooms';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'rooms' },
  { path: 'rooms', component: Rooms },
  { path: 'rooms/new', component: RoomForm },
  { path: 'rooms/:id/edit', component: RoomForm },
  { path: 'rooms/:id', component: RoomDetail },
  { path: '**', redirectTo: 'rooms' },
];
