import { Routes } from '@angular/router';
import { Principal } from './principal/principal';
import { Contacto } from './contacto/contacto';
import { Productos } from './productos/productos';
import { Carrito } from './carrito/carrito';
import { Intenso } from './intenso/intenso';
import { Bandejas } from './bandejas/bandejas';
import { Dulce } from './dulce/dulce';
import { Registro } from './registro/registro';
export const routes: Routes = [
  { path: '', component: Principal },
  { path: 'contacto', component: Contacto },
  { path: 'productos', component: Productos },
  { path: 'carrito', component: Carrito},
  { path: 'intenso', component: Intenso},
  { path: 'bandeja', component: Bandejas},
  {path: 'dulce', component: Dulce},
  {path: 'principal', component: Principal},
  {path: 'registro', component: Registro}


];
