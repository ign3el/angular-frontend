import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import {  ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private productService : ProductService, 
              private route:ActivatedRoute,
              private cartService:CartService) { }
  private id:number;
  private hasId:boolean;
  product:Product=new Product();
  isNullProduct:boolean;

  ngOnInit(): void {
    console.log(this.product);
    this.getProductDetails();
  }
  getProductDetails() {
    
    this.hasId=this.route.snapshot.paramMap.has("pid");
    if(this.hasId) {
      this.id= +this.route.snapshot.paramMap.get("pid");
      this.productService.getProctById(this.id).subscribe(
        data=>{
          if(data==null) {
            this.isNullProduct=true;
            console.log(this.isNullProduct);
          } else {
            this.isNullProduct=false;
            console.log(this.isNullProduct);
            this.product=data;
          }
        }
      );
    }
   }

   addToCart(theProduct:Product) {
     const theCartItem=new CartItem(theProduct);
     this.cartService.addToCart(theCartItem);
   }

}
