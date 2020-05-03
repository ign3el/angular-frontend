import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[]=[];
  currentCategoryId: number=1;
  currentCategoryName: string;
  searchMode:boolean=false;
  thePageNumber:number=1;
  thePageSize:number=5;
  theTotalElements:number=0;
  previousCategoryId: number=1;
  previousSearchString:string=null;
  

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService:CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has("keyword");
    if(this.searchMode) {
      this.handleSearchProducts();
    } else {
    this.handleListProducts();
    }

  }
  handleSearchProducts() {
    const searchString=this.route.snapshot.paramMap.get("keyword");
    if(this.previousSearchString !=searchString) {
      this.thePageNumber=1;
    }
    this.previousSearchString=searchString;
    this.productService.getSearchedProductPaginated(searchString,
                                                    this.thePageNumber-1,
                                                    this.thePageSize)
                                                    .subscribe(this.processResult())

  }

  handleListProducts() {

        // check if "id" parameter is available
        const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

        if (hasCategoryId) {
          // get the "id" param string. convert string to a number using the "+" symbol
          this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    
          // get the "name" param string
          this.currentCategoryName = this.route.snapshot.paramMap.get('name');
        }
        else {
          // not category id available ... default to category id 1
          this.currentCategoryId = 1;
          this.currentCategoryName = 'Books';
        }
        
        if(this.previousCategoryId != this.currentCategoryId) {
          this.thePageNumber=1;
        }

        this.previousCategoryId=this.currentCategoryId;
        // now get the products for the given category id
        this.productService.getProductListPaginated(this.currentCategoryId,
                                                    this.thePageNumber-1,
                                                    this.thePageSize)
                                                    .subscribe(this.processResult());

  }
  processResult() {
    
    return data => {
      this.products=data._embedded.products;
      this.thePageNumber=data.page.number+1;
      this.thePageSize=data.page.size;
      this.theTotalElements=data.page.totalElements;
    }
  }

  updatePageSize(size:number) {
    this.thePageSize=size;
    this.thePageNumber=1;
    this.listProducts();
  }

  addToCart(product:Product) {
    const theCartItem=new CartItem(product);
    this.cartService.addToCart(theCartItem);
  }

}