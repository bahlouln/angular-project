import { Component, OnInit } from '@angular/core';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-cart',
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header card-header-success">
              <h4 class="card-title">Shopping Cart</h4>
              <p class="card-category">Review your items</p>
            </div>
            <div class="card-body">
              <div class="table-responsive" *ngIf="cartItems.length > 0">
                <table class="table">
                  <thead class="text-success">
                    <tr>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let item of cartItems">
                      <td>
                        <img [src]="item.image" alt="{{ item.name }}" class="product-image">
                      </td>
                      <td>{{ item.name }}</td>
                      <td>\${{ item.price }}</td>
                      <td>
                        <button mat-icon-button (click)="decreaseQuantity(item)">
                          <i class="material-icons">remove</i>
                        </button>
                        {{ item.quantity }}
                        <button mat-icon-button (click)="increaseQuantity(item)">
                          <i class="material-icons">add</i>
                        </button>
                      </td>
                      <td>\${{ item.price * item.quantity }}</td>
                      <td>
                        <button mat-icon-button color="warn" (click)="removeItem(item)">
                          <i class="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="total-section">
                  <h3>Total: \${{ calculateTotal() }}</h3>
                  <button mat-raised-button class="btn btn-success" (click)="checkout()">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
              <div *ngIf="cartItems.length === 0" class="empty-cart">
                <i class="material-icons">shopping_cart</i>
                <h3>Your cart is empty</h3>
                <button mat-raised-button color="success" routerLink="/products">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-image {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 4px;
    }
    .total-section {
      margin-top: 20px;
      text-align: right;
      padding: 20px;
    }
    .total-section h3 {
      margin-bottom: 15px;
    }
    .empty-cart {
      text-align: center;
      padding: 40px;
    }
    .empty-cart i {
      font-size: 64px;
      color: #9e9e9e;
      margin-bottom: 20px;
    }
    .empty-cart h3 {
      color: #757575;
      margin-bottom: 20px;
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Product 1',
      price: 99.99,
      quantity: 2,
      image: 'assets/img/product1.jpg'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  increaseQuantity(item: CartItem) {
    item.quantity++;
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeItem(item: CartItem) {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  checkout() {
    // TODO: Implement checkout functionality
    console.log('Proceeding to checkout with items:', this.cartItems);
  }
} 