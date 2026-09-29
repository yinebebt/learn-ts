import { Routes } from '@angular/router';
import { Home } from './home/home';
import { RoomDetail } from './rooms/room-detail';
import { Rooms } from './rooms/rooms';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Home },
  { path: 'rooms', component: Rooms },
  { path: 'rooms/:id', component: RoomDetail },
  { path: '**', redirectTo: '' },
];
