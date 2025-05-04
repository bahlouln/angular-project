export interface Cart {
    id: number;
    userId: number;
    items: CartItem[];
  }
  
  export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }