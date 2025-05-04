import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http:HttpClient) { }
  createNewCart(model:any){
    return this.http.post('http://localhost:3000/cart', model)

  }
}
