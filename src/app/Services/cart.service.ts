import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

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
  private apiUrl = 'http://localhost:3000/carts';

  constructor(private authService: AuthService, private http: HttpClient) {
    this.loadCart();
  }

  // Charger le panier pour l'utilisateur connecté
  private loadCart() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.http.get<any[]>(this.apiUrl).subscribe(carts => {
        const userCart = carts.find(cart => cart.userId === currentUser.id);
        if (userCart) {
          this.cartSubject.next(userCart.items);
        } else {
          // Si aucun panier n'est trouvé, crée un nouveau panier vide
          this.createNewCart(currentUser.id);
        }
      });
    }
  }

  // Ajouter un article au panier
  addToCart(item: CartItem) {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.http.get<any[]>(this.apiUrl).subscribe(carts => {
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
          this.http.put(`${this.apiUrl}/${userCart.id}`, userCart).subscribe();
        } else {
          // Si le panier n'existe pas, créer un nouveau panier
          this.createNewCart(currentUser.id, [item]);
        }
      });
    }
  }

  // Supprimer un article du panier
  removeFromCart(itemId: number) {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.http.get<any[]>(this.apiUrl).subscribe(carts => {
        const userCart = carts.find(cart => cart.userId === currentUser.id);
        if (userCart) {
          userCart.items = userCart.items.filter(item => item.id !== itemId);
          this.cartSubject.next(userCart.items);
          this.http.put(`${this.apiUrl}/${userCart.id}`, userCart).subscribe();
        }
      });
    }
  }

  // Vider le panier
  clearCart() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.http.get<any[]>(this.apiUrl).subscribe(carts => {
        const userCart = carts.find(cart => cart.userId === currentUser.id);
        if (userCart) {
          userCart.items = [];
          this.cartSubject.next([]);
          this.http.put(`${this.apiUrl}/${userCart.id}`, userCart).subscribe();
        }
      });
    }
  }

  // Créer un nouveau panier pour un utilisateur donné
  createNewCart(userId: number, items: CartItem[] = []) {
    const newCart = {
      userId: userId,
      date: new Date(),
      products: items.map(i => ({
        productId: i.id,
        quantity: i.quantity
      }))
    };
    return this.http.post(this.apiUrl, newCart);
  }
  
  
  }

