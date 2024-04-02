import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  url = "http://localhost:8080/api/v1/orderDetail";

  constructor(private http: HttpClient) { }

  getOrderDetailById(id: number, page: number, pageSize: number): Observable<any> {
    return this.http.get(this.url + "/order/" + id + "?page=" + page + "&page-number=" + pageSize);
  }
}
