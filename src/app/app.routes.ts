import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { App } from './app';

export const routes: Routes = [
    { path: 'dashboard', component: Dashboard },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }

    //{ path: '**', redirectTo: '/login' }
];
