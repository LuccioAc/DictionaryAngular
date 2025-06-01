import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {path:'admin/incidentes',loadComponent: () => import('./pages/admin/incident-list/incident-list.component').then(m => m.IncidentListComponent),canActivate: [authGuard]},
  { path: '', pathMatch: 'full', redirectTo: '' },
  {path: 'admin/usuarios',loadComponent: () => import('./pages/admin/user-list/user-list.component').then(m => m.UserListComponent),canActivate: [authGuard]},
  {path: 'admin/full-words',loadComponent: () => import('./pages/admin/full-words/full-words.component').then(m => m.FullWordsComponent), canActivate: [authGuard]}
  //{ path: '**', redirectTo: '' }, // catch-all
  //{ path: 'incidentes', component: IncidentListComponent, canActivate: [authGuard] }
];
