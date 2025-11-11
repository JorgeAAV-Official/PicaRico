import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Firestore, collection, addDoc, getDocs, deleteDoc, doc } from '@angular/fire/firestore';

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
  private cartCollection;
  public cart$ = new BehaviorSubject<Product[]>([]);

  constructor(private firestore: Firestore) {
    this.cartCollection = collection(this.firestore, 'carrito');
    this.loadCartFromFirestore();
  }

  async loadCartFromFirestore() {
    const snapshot = await getDocs(this.cartCollection);
    this.cart = snapshot.docs.map(doc => doc.data() as Product);
    this.cart$.next(this.cart);
  }

  getCart() {
    return this.cart;
  }

  getTotalItems() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  async addToCart(product: Product) {
    const existing = this.cart.find(p => p.name === product.name);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push(product);
      await addDoc(this.cartCollection, product);
    }
    this.cart$.next(this.cart);
  }

  // 🔥 Eliminar un solo producto (de local y Firestore)
  async removeFromCart(product: Product) {
    // Quitar del arreglo local
    this.cart = this.cart.filter(p => p.name !== product.name);
    this.cart$.next(this.cart);

    // Eliminar de Firestore
    const snapshot = await getDocs(this.cartCollection);
    for (const d of snapshot.docs) {
      const data = d.data() as Product;
      if (data.name === product.name) {
        await deleteDoc(doc(this.firestore, 'carrito', d.id));
      }
    }
  }

  // 🔥 Vaciar carrito completo (opcional)
  async clearCart() {
    this.cart = [];
    this.cart$.next([]);
    const snapshot = await getDocs(this.cartCollection);
    snapshot.forEach(async d => await deleteDoc(doc(this.firestore, 'carrito', d.id)));
  }
}
