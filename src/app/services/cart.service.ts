import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems :CartItem[]=[];
  totalPrice:Subject<number> = new Subject<number>();
  totalQuantity:Subject<number> = new Subject<number>();
  constructor() { }

  addToCart(cartItem : CartItem) {

    //check if we already have item in cart
    let alreadyInCart:boolean = false;
    let existingcartItem:CartItem=undefined;
    if(this.cartItems.length>=0) {

      //find item in cart based on id
      for(let tempCartItem of this.cartItems) {
        if(tempCartItem.id=cartItem.id) {
          existingcartItem = tempCartItem;
          break;
        }
      }

      //check if we found it
      alreadyInCart= (existingcartItem !=undefined);
    }
    if(alreadyInCart) {
      existingcartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);  
    }
      //compute total quantity and price
      this.computeCartTotals();
  }
  computeCartTotals() {
    let totalPriceValue:number = 0;
    let totalQuantityValue:number = 0;

    for(let cartItem of this.cartItems) {
      totalPriceValue +=cartItem.quantity*cartItem.unitPrice;
      totalQuantityValue +=cartItem.quantity;
    }

    //publish the totalprice and quantity for all subscribers

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

  }
}
