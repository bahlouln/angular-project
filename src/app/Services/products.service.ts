import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Modeles/products';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/products'; // URL de base pour les produits

  constructor(private http: HttpClient) { }

  // Récupérer tous les produits
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Récupérer un produit par son ID
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un nouveau produit
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // Mettre à jour un produit existant
  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  // Supprimer un produit par son ID
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Récupérer les produits par catégorie
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?category=${category}`);
  }

  // Récupérer toutes les catégories uniques de produits
  getAllCategories(): Observable<string[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map((products: Product[]) => {
        const categories = new Set(products.map(product => product.category));
        return Array.from(categories);
      })
    );
  }
}
