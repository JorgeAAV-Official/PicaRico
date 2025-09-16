import { Routes } from '@angular/router';
import { Principal } from './principal/principal';
import { Contacto } from './contacto/contacto';
import { Productos } from './productos/productos';

export const routes: Routes = [
  { path: '', component: Principal },
  { path: 'contacto', component: Contacto },
  { path: 'productos', component: Productos }
];
