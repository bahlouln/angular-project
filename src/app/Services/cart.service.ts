import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();
  private apiUrl = 'http://localhost:3000';

  constructor(private authService: AuthService, private http: HttpClient) {
    this.loadCart();
  }

  private loadCart() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.http.get<any[]>(`${this.apiUrl}/carts`).subscribe(carts => {
        const userCart = carts.find(cart => cart.userId === currentUser.id);
        if (userCart) {
          this.cartSubject.next(userCart.items);
        }
      });
    }
  }

  addToCart(item: CartItem) {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.http.get<any[]>(`${this.apiUrl}/carts`).subscribe(carts => {
        const userCart = carts.find(cart => cart.userId === currentUser.id);
        if (userCart) {
          const currentCart = userCart.items;
          const existingItem = currentCart.find(i => i.id === item.id);
          if (existingItem) {
            existingItem.quantity += item.quantity;
          } else {
            currentCart.push(item);
          }
          this.cartSubject.next(currentCart);
          this.http.put(`${this.apiUrl}/carts/${userCart.id}`, userCart).subscribe();
        } else {
          // Si le panier n'existe pas, créez-en un nouveau
          const newCart = {
            id: Date.now(), // Utilisez un ID unique
            userId: currentUser.id,
            items: [item]
          };
          this.http.post(`${this.apiUrl}/carts`, newCart).subscribe();
          this.cartSubject.next([item]);
        }
      });
    }
  }

  removeFromCart(itemId: number) {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.http.get<any[]>(`${this.apiUrl}/carts`).subscribe(carts => {
        const userCart = carts.find(cart => cart.userId === currentUser.id);
        if (userCart) {
          userCart.items = userCart.items.filter(item => item.id !== itemId);
          this.cartSubject.next(userCart.items);
          this.http.put(`${this.apiUrl}/carts/${userCart.id}`, userCart).subscribe();
        }
      });
    }
  }

  clearCart() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.http.get<any[]>(`${this.apiUrl}/carts`).subscribe(carts => {
        const userCart = carts.find(cart => cart.userId === currentUser.id);
        if (userCart) {
          userCart.items = [];
          this.cartSubject.next([]);
          this.http.put(`${this.apiUrl}/carts/${userCart.id}`, userCart).subscribe();
        }
      });
    }
  }
} 