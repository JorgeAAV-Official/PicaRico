// src/app/carrito/carrito.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, Product } from '../services/cart.service';
import { Router, RouterModule } from '@angular/router';
import { ProfileIconComponent } from '../shared/profile-icon/profile-icon.component';
import { FormsModule } from '@angular/forms';

import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule, ProfileIconComponent, FormsModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class Carrito {
  cart: Product[] = [];
  showSummary = false;
  totalCompra = 0;
  paymentMethod = '';
  address = '';

  constructor(
    public cartService: CartService,
    private router: Router,
    private auth: Auth
  ) {
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
    ) + 3000; // Add delivery fee
    this.showSummary = true;
  }

  // Cerrar el resumen
  closeSummary() {
    this.showSummary = false;
  }

  // Confirmar compra
  confirmPurchase() {
    if (this.paymentMethod === 'nequi') {
      this.cartService.setShippingAddress(this.address);
      this.router.navigate(['/pago-nequi']);
      this.closeSummary();
    } else if (this.paymentMethod === 'efectivo') {
      const user = this.auth.currentUser;
      const userName = user?.displayName || 'Cliente';

      let message = `Hola, soy ${userName}. Quiero realizar el pago de mi pedido en efectivo:\n\n`;

      this.cart.forEach(item => {
        message += `- ${item.name} x${item.quantity} ($${item.price * item.quantity})\n`;
      });

      message += `Domicilio: $3000\n`;
      message += `\nTotal a pagar: $${this.totalCompra}\n`;

      if (this.address) {
        message += `Dirección de entrega: ${this.address}\n`;
      }

      const encodedMessage = encodeURIComponent(message);
      const phoneNumber = '573107679730';

      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
      this.cartService.clearCart();
      this.closeSummary();
    } else {
      alert(`✅ Compra confirmada por un total de $${this.totalCompra.toLocaleString()}`);
      this.cartService.clearCart();
      this.closeSummary();
    }
  }
}
