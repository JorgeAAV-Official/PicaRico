// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);

  cart$ = this.cartSubject.asObservable();

  addToCart(product: Product) {
    // Si ya existe el producto, aumenta la cantidad
    const existing = this.cart.find(p => p.name === product.name);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push(product);
    }
    this.cartSubject.next(this.cart);
  }

  removeFromCart(product: Product) {
    this.cart = this.cart.filter(p => p.name !== product.name);
    this.cartSubject.next(this.cart);
  }

  getCart() {
    return this.cart;
  }

  getTotalItems(): number {
    return this.cart.reduce((acc, p) => acc + p.quantity, 0);
  }

  clearCart() {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }
}
