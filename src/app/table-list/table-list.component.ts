import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from '../Services/products.service';
import { Product } from '../Modeles/products';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.error = null;
    
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = [...data];
        // Extraire les catégories uniques
        this.categories = [...new Set(data.map(product => product.category))];
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des produits. Veuillez réessayer.';
        this.loading = false;
        console.error('Error loading products:', error);
      }
    });
  }

  filterByCategory(event: Event) {
    const category = (event.target as HTMLSelectElement).value;
    if (category === 'all') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(product => product.category === category);
    }
  }

  openDeleteDialog(productId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmer la suppression',
        message: 'Êtes-vous sûr de vouloir supprimer ce produit ?',
        confirmText: 'Supprimer',
        cancelText: 'Annuler'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(productId);
      }
    });
  }

  private deleteProduct(productId: string) {
    this.productsService.deleteProduct(productId).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== productId);
        this.filteredProducts = this.filteredProducts.filter(p => p.id !== productId);
      },
      error: (error) => {
        console.error('Error deleting product:', error);
        this.error = 'Erreur lors de la suppression du produit. Veuillez réessayer.';
      }
    });
  }

  trackByProductId(index: number, product: Product): string {
    return product.id;
  }
}
