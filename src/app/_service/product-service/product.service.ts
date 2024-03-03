import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductSearch } from 'src/app/_model/product-search.modal';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = "http://localhost:8084/api/v1/product";

  constructor(private http: HttpClient) { }

  getAllProduct(productSearch: ProductSearch): Observable<any> {
    return this.http.post(this.url + "/search", productSearch);
  }

  getByProductId(id: number): Observable<any> {
    return this.http.get(this.url + "/product-id/" + id);
  }

  getAllProductList(page: number, pageNumber: number): Observable<any> {
    return this.http.get(this.url + "/list" + '?page=' + page + '&page-size=' + pageNumber);
  }

  findAllProductList(name: string, page: number, pageNumber: number): Observable<any> {
    return this.http.get(this.url + "/search" + '?name=' + name + '&page=' + page + '&page-size=' + pageNumber);
  }

  getProductByCategory(id: number, page: number, pageNumber: number): Observable<any> {
    return this.http.get(this.url + "/category/" + id + '?page=' + page + '&page-size=' + pageNumber);
  }

  getProductByCategorys(id: number, params: any): Observable<any> {
    return this.http.get(this.url + "/category/" + id, { params });
  }

  getProductById(id: number, page: number, pageNumber: number): Observable<any> {
    return this.http.get(this.url + "/" + id + '?page=' + page + '&page-size=' + pageNumber);
  }

  getOneProduct(id: number): Observable<any> {
    return this.http.get(this.url + "/get-one/" + id);
  }
}
