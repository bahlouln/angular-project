import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header card-header-success">
              <h4 class="card-title">Products</h4>
              <p class="card-category">Browse our available products</p>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-4" *ngFor="let product of products">
                  <div class="card product-card">
                    <div class="card-header card-header-image">
                      <img [src]="product.image" alt="{{ product.name }}">
                    </div>
                    <div class="card-body">
                      <h4 class="card-title">{{ product.name }}</h4>
                      <p class="card-text">{{ product.description }}</p>
                      <p class="price">\${{ product.price }}</p>
                      <button mat-raised-button class="btn btn-success" (click)="addToCart(product)">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-card {
      margin-bottom: 30px;
    }
    .product-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .price {
      font-size: 1.25rem;
      font-weight: bold;
      color: #4caf50;
      margin: 10px 0;
    }
    .card-header-image {
      height: 200px;
      overflow: hidden;
    }
  `]
})
export class ProductsComponent implements OnInit {
  products = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description for product 1',
      price: 99.99,
      image: 'assets/img/product1.jpg'
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description for product 2',
      price: 149.99,
      image: 'assets/img/product2.jpg'
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description for product 3',
      price: 199.99,
      image: 'assets/img/product3.jpg'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  addToCart(product: any) {
    // TODO: Implement cart functionality
    console.log('Adding to cart:', product);
  }
} 