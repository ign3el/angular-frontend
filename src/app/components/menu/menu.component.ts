import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/servies/product.service';
import { ProductCategory } from 'src/app/product-category';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  productCategories:ProductCategory[];

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
     this.productService.getproductCategories().subscribe((data) => {
       
      // console.log(JSON.stringify(data));
      this.productCategories = data;
      // console.log("Product Categories: "+JSON.stringify(this.productCategories));
  });
}
}
