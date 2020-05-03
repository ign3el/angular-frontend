import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/servies/product.service';
import {  ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private productService : ProductService, 
              private route:ActivatedRoute) { }
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
}
