import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { ProductCategory } from '../product-category';

// let authorizationData = 'Basic ' + btoa('ahte' + ':' + 'saba');

// const headerOptions = {
//     headers: new HttpHeaders({
//         'Content-Type':  'application/json',
//         'Authorization': authorizationData
//     })
// };

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private baseURL = 'https://sampleluv2code.ew.r.appspot.com/api/products';
  private productsCategoryURL="https://sampleluv2code.ew.r.appspot.com/api/product-category/";
  private byCategoryId="https://sampleluv2code.ew.r.appspot.com/api/products/search/findByCategoryId?id=";
  private actualURL:string;

  constructor(private httpClient: HttpClient) {}

  getProductListPaginated(currentProductId:number,
                          thePage:number,
                          thePageSize:number): Observable<GetProductResponse> {
    this.actualURL =this.byCategoryId+currentProductId+"&page="+thePage+"&size="+thePageSize;
    return this.httpClient.get<GetProductResponse>(this.actualURL);
  }

  getproductCategories():Observable<ProductCategory[]> {
    return this.httpClient
                .get<GetCategoryResponse>(this.productsCategoryURL)
                .pipe(map((response) => response._embedded.productCategory)
                );
  }

  getSearchedProductPaginated(searchString: string,thePage:number,thePageSize:number): Observable<GetProductResponse> {
    this.actualURL=this.baseURL+"/search/findByNameContaining?name="+searchString+"&page="+thePage+"&size="+thePageSize;
    return this.httpClient.get<GetProductResponse>(this.actualURL);
  }

  getProctById(id: number):Observable<Product> {
    this.actualURL=this.baseURL+"/"+id;
    return this.httpClient.get<Product>(this.actualURL);

  }
}



interface GetProductResponse {
  _embedded: {
    products: Product[];

  },
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}

interface GetCategoryResponse {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
