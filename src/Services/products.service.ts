import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'Modeles/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  
  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }
  

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`).pipe(
      map((products: any[]) => {
        const categories = new Set(products.map(product => product.category));
        return Array.from(categories);
      })
    );
  }

  getProductsByCategory(keyword: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`).pipe(
      map((products: any[]) => {
        return products.filter(product => product.category === keyword);
      })
    );
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${id}`);
  }
  GetAllProductss():Observable<Product[]>//les admin
  {
    //envoyer une requete en mode GET vers le backend donc en utilise le module predefine esmou HttpClientModule fel app.module.ts
    return this.http.get<Product[]> ('http://localhost:3000/products');
   
  }
  deleteProductById(id:string):Observable<void>
  {
    return this.http.delete<void> (`http://localhost:3000/products/${id}`);
  }
  UpdateProduct(id:string,product:Product):Observable<void>{
    return this.http.put<void>(`http://localhost:3000/products/${id}`,product)
  }
  AddProduct(x:Product):Observable<void>{
    return this.http.post<void>('http://localhost:3000/products',x)
  }

}
