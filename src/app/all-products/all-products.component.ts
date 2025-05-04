import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../Modeles/products';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  loading: boolean = true;
  error: string | null = null;
  searchTerm: string = '';
  selectedCategory: string = 'all';  // Valeur par défaut (toutes les catégories)
  selectedPriceRange: string = 'all';
  selectedSort: string = 'default';
  cartProducts: any[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;

    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = [...data];
        this.categories = ['all', ...new Set(data.map(product => product.category))]; // Ajouter "all" aux catégories
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Une erreur est survenue lors du chargement des produits.';
        this.loading = false;
        console.error('Error loading products:', error);
      }
    });
  }

  searchProducts(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.toLowerCase();
    this.applyFilters();
  }

  filterCategory(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedCategory = select.value;
    this.applyFilters();
  }

  filterPrice(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedPriceRange = select.value;
    this.applyFilters();
  }

  sortProducts(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedSort = select.value;
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.products];

    // Appliquer la recherche
    if (this.searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(this.searchTerm) ||
        product.description.toLowerCase().includes(this.searchTerm)
      );
    }

    // Appliquer le filtre de catégorie
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    // Appliquer le filtre de prix
    if (this.selectedPriceRange !== 'all') {
      const [min, max] = this.selectedPriceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        } else {
          return product.price >= min;
        }
      });
    }

    // Appliquer le tri
    switch (this.selectedSort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    this.filteredProducts = filtered;
  }

  addToCart(product: Product): void {
    let cart = [];
    if ("cart" in localStorage) {
      cart = JSON.parse(localStorage.getItem("cart")!);
      const exist = cart.find((item: any) => item.item.id === product.id);
      
      if (exist) {
        alert("Le produit est déjà dans votre panier");
        return;
      }
    }else{
      console.warn("user is logged in")
    }
    
    cart.push({
      item: product,
      quantity: 1
    });
    
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produit ajouté au panier!");
  }

  viewProductDetails(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  toggleFavorite(product: Product): void {
    product.isFavorite = !product.isFavorite;
    console.log('Toggle favorite:', product);
  }
}
