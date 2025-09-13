import { Routes } from '@angular/router';
import { Principal } from './principal/principal';
import { Contacto } from './contacto/contacto';

export const routes: Routes = [
    { path: '', component: Principal }, 
    { path: 'contacto', component: Contacto}
];
