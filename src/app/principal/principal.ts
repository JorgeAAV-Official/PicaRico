import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service'; // ajusta la ruta si tu carpeta cambia

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './principal.html',
  styleUrls: ['./principal.css']
})
export class Principal {
  constructor(public cartService: CartService) {}
}
