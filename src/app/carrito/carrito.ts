// src/app/carrito/carrito.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, Product } from '../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class Carrito {
  cart: Product[] = [];

  constructor(public cartService: CartService) {
    this.cart = this.cartService.getCart();

    // Suscribirse a cambios en el carrito
    this.cartService.cart$.subscribe(updatedCart => {
      this.cart = updatedCart;
    });
  }

  remove(product: Product) {
    this.cartService.removeFromCart(product);
  }

  clear() {
    this.cartService.clearCart();
  }
}
