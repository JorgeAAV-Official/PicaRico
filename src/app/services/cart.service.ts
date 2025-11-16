import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  setDoc,
  DocumentData
} from '@angular/fire/firestore';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

export interface Product {
  id?: string;
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
  public cart$ = new BehaviorSubject<Product[]>([]);
  private userUid: string | null = null;

  constructor(private firestore: Firestore, private auth: Auth) {
    // Escuchar cambios de autenticación en tiempo real
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userUid = user.uid;
        this.loadCartFromFirestore();
      } else {
        this.userUid = null;
        this.cart = [];
        this.cart$.next([]);
      }
    });
  }

  private getUserCartCollectionPath(): string | null {
    if (!this.userUid) return null;
    return `users/${this.userUid}/cart`;
  }

  private async loadCartFromFirestore() {
    const path = this.getUserCartCollectionPath();
    if (!path) return;

    const cartRef = collection(this.firestore, path);
    const snapshot = await getDocs(cartRef);
    this.cart = snapshot.docs.map(d => ({ id: d.id, ...(d.data() as Product) }));
    this.cart$.next(this.cart);
  }

  getCart() {
    return this.cart;
  }

  getTotalItems() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  isUserLogged() {
    return this.userUid !== null;
  }

  async addToCart(product: Product) {
    const path = this.getUserCartCollectionPath();
    if (!path) {
      // No hay usuario: no agregar nada
      return;
    }

    // Buscar si ya existe por nombre (podrías usar un ID real si lo prefieres)
    const existing = this.cart.find(p => p.name === product.name);

    const cartRef = collection(this.firestore, path);

    if (existing) {
      // Incrementar cantidad y actualizar doc en Firestore
      existing.quantity += 1;
      if (existing.id) {
        await setDoc(doc(this.firestore, `${path}/${existing.id}`), existing);
      } else {
        // si por alguna razón no tiene id, crear/actualizar
        const newDoc = await addDoc(cartRef, existing);
        existing.id = newDoc.id;
      }
    } else {
      // Crear nuevo documento en Firestore
      const docRef = await addDoc(cartRef, product as DocumentData);
      product.id = docRef.id;
      this.cart.push(product);
    }

    this.cart$.next(this.cart);
  }

  async removeFromCart(product: Product) {
    const path = this.getUserCartCollectionPath();
    if (!path || !product.id) return;

    // Actualizar local
    this.cart = this.cart.filter(p => p.id !== product.id);
    this.cart$.next(this.cart);

    // Borrar en Firestore
    await deleteDoc(doc(this.firestore, `${path}/${product.id}`));
  }

  async clearCart() {
    const path = this.getUserCartCollectionPath();
    if (!path) return;

    const cartRef = collection(this.firestore, path);
    const snapshot = await getDocs(cartRef);
    for (const d of snapshot.docs) {
      await deleteDoc(doc(this.firestore, `${path}/${d.id}`));
    }

    this.cart = [];
    this.cart$.next([]);
  }
}
