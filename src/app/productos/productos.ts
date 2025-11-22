import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService, Product } from '../services/cart.service';
import { ProfileIconComponent } from '../shared/profile-icon/profile-icon.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterModule, CommonModule, ProfileIconComponent],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class Productos {
  showToast = false;
  showLoginError = false;

  // 🔽 Variable para guardar la categoría seleccionada
  categoriaSeleccionada: string = 'todas';

  constructor(public cartService: CartService) { }

  // Método para agregar producto al carrito con validación de sesión
  async addToCart(name: string, price: number, description: string, image: string) {
    // Si no está logueado, mostrar toast rojo y no hacer nada en la BD
    if (!this.cartService.isUserLogged()) {
      this.showLoginError = true;
      setTimeout(() => this.showLoginError = false, 2000);
      return;
    }

    const product: Product = { name, price, description, image, quantity: 1 };
    await this.cartService.addToCart(product);

    // Animación carrito (usa la clase .cart-icon que ya tienes)
    const cartIcon = document.querySelector('.cart-icon') as HTMLElement;
    cartIcon?.classList.add('bounce');
    setTimeout(() => cartIcon?.classList.remove('bounce'), 500);

    // Mostrar toast de éxito
    this.showToast = true;
    setTimeout(() => this.showToast = false, 1500);
  }

  // 🧠 Método para manejar la selección de categoría
  filterCategory(category: string) {
    this.categoriaSeleccionada = category;
    console.log(`Categoría seleccionada: ${category}`);
  }
}
