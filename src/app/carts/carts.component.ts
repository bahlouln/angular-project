import { Component, OnInit } from '@angular/core';
import { CartsService } from 'Services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartComponent implements OnInit{
  constructor(private service: CartsService){}
  cartProducts:any[] = [];
  total:any=0;
  success:boolean = false
  ngOnInit(): void {
    this.getCartProducts()
  }
  getCartProducts(){
    if("cart" in localStorage){
      this.cartProducts =JSON.parse(localStorage.getItem("cart")!)
  }
  //console.log(this.cartProducts)
  this.getCartTotal()
  }
  addAmount(index:number){
    this.cartProducts[index].quantity++
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }
  minsAmount(index:number){ //lenna 9otlou ki na9as item aawed ekhdemli l boucle mtee total w aawed aamel update lel data
    this.cartProducts[index].quantity--
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }
  detectChange(){
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }

  deleteProduct(index:number){
    this.cartProducts.splice(index, 1)
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }

  clearCart(){
    this.cartProducts=[]
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }
  getCartTotal(){
    this.total =0
    for(let x in this.cartProducts){
      this.total+= this.cartProducts[x].item.price * this.cartProducts[x].quantity; // hna 9otlou aamel for loop kol ma tetaada ala item ehseb l price mteeou fel quantité w zidha lel total
    }

  }
  addCart(){
    let products = this.cartProducts.map(item =>{
      return{productId: item.item.id, quantity:item.quantity}
    })
    let Model={
      userId:5 ,
      date: new Date(),
      products: products
    }
    this.service.createNewCart(Model).subscribe(res =>{
      this.success=true

    })
    console.log(Model)
  }
}
