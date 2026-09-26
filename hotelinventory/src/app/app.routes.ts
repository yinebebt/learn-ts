import { Routes } from '@angular/router';
import { Rooms } from './rooms/rooms';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'rooms' },
  { path: 'rooms', component: Rooms },
];
