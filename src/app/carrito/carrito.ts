// src/app/carrito/carrito.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, Product } from '../services/cart.service';
import { RouterModule } from '@angular/router';
import { ProfileIconComponent } from '../shared/profile-icon/profile-icon.component';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule, ProfileIconComponent],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class Carrito {
  cart: Product[] = [];
  showSummary = false;
  totalCompra = 0;

  constructor(public cartService: CartService) {
    this.cart = this.cartService.getCart();
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

  // Mostrar resumen de la compra
  openSummary() {
    if (this.cart.length === 0) return;
    this.totalCompra = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    this.showSummary = true;
  }

  // Cerrar el resumen
  closeSummary() {
    this.showSummary = false;
  }

  // Confirmar compra
  confirmPurchase() {
    alert(`✅ Compra confirmada por un total de $${this.totalCompra.toLocaleString()}`);
    this.cartService.clearCart();
    this.closeSummary();
  }
}
