import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService, Product } from '../services/cart.service';
import { ProfileIconComponent } from '../shared/profile-icon/profile-icon.component';

@Component({
  selector: 'app-dulce',
  standalone: true,
  imports: [RouterModule, CommonModule, ProfileIconComponent],
  templateUrl: './dulce.html',
  styleUrls: ['./dulce.css']
})
export class Dulce {
  showToast = false;
  showLoginError = false;

  categoriaSeleccionada: string = 'todas';

  constructor(public cartService: CartService) { }

  async addToCart(name: string, price: number, description: string, image: string) {

    if (!this.cartService.isUserLogged()) {
      this.showLoginError = true;
      setTimeout(() => this.showLoginError = false, 2000);
      return;
    }

    const product: Product = { name, price, description, image, quantity: 1 };
    await this.cartService.addToCart(product);

    const cartIcon = document.querySelector('.cart-icon') as HTMLElement;
    cartIcon?.classList.add('bounce');
    setTimeout(() => cartIcon?.classList.remove('bounce'), 500);

    this.showToast = true;
    setTimeout(() => this.showToast = false, 1500);
  }

  filterCategory(category: string) {
    this.categoriaSeleccionada = category;
    console.log(`Categoría seleccionada: ${category}`);
  }
}
