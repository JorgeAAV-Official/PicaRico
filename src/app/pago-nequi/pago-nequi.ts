import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { ProfileIconComponent } from '../shared/profile-icon/profile-icon.component';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-pago-nequi',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ProfileIconComponent],
  templateUrl: './pago-nequi.html',
  styleUrl: './pago-nequi.css',
})
export class PagoNequi {
  constructor(public cartService: CartService, private auth: Auth) { }

  getWhatsappLink(): string {
    const cart = this.cartService.getCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 3000;
    const address = this.cartService.getShippingAddress();
    const user = this.auth.currentUser;
    const userName = user?.displayName || 'Cliente';

    let message = `Hola, soy ${userName}. Quiero realizar el pago de mi pedido:\n\n`;

    cart.forEach(item => {
      message += `- ${item.name} x${item.quantity} ($${item.price * item.quantity})\n`;
    });

    message += `Domicilio: $3000\n`;
    message += `\nTotal a pagar: $${total}\n`;

    if (address) {
      message += `Dirección de entrega: ${address}\n`;
    }

    message += 'Adjunto mi comprobante de pago Nequi.';

    const encodedMessage = encodeURIComponent(message);
    // TODO: Replace with actual phone number
    const phoneNumber = '573107679730';

    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  }

  finalizePurchase() {
    this.cartService.clearCart();
  }
}
