import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService, Product } from '../services/cart.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class Productos {
  showToast = false;

  // 🔽 Variable para guardar la categoría seleccionada
  categoriaSeleccionada: string = 'todas';

  constructor(public cartService: CartService) {}

  // 🔥 Método para agregar producto al carrito (sin tocar)
  addToCart(name: string, price: number, description: string, image: string) {
    const product: Product = { name, price, description, image, quantity: 1 };
    this.cartService.addToCart(product);

    // Animación carrito
    const cartIcon = document.querySelector('.cart-icon') as HTMLElement;
    cartIcon?.classList.add('bounce');
    setTimeout(() => cartIcon?.classList.remove('bounce'), 500);

    // Mostrar toast
    this.showToast = true;
    setTimeout(() => this.showToast = false, 1500);
  }

  // 🧠 Método para manejar la selección de categoría
  filterCategory(category: string) {
    this.categoriaSeleccionada = category;
    console.log(`Categoría seleccionada: ${category}`);

    // Aquí podrías más adelante aplicar un filtro visual o cargar productos específicos
    // Por ahora solo muestra el cambio por consola
  }
}
