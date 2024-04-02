import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = "http://localhost:8080/api/v1/order";

  constructor(private http: HttpClient) { }

  getOrderByStatus(status: any): Observable<any> {
    return this.http.get(this.url + "/list-status/" + status);
  }

  getOrderByStatusandAccount(status: any): Observable<any> {
    return this.http.get(this.url + "/list-status-account/" + status);
  }

  canceledOrder(id: number, reason: any): Observable<any> {
    return this.http.get(this.url + "/cancelled/" + id + '?reason=' + reason);
  }

  getCountOrderByStatus(status: any): Observable<any> {
    return this.http.get(this.url + "/count-order/" + status);
  }

  reOrderIntoCart(id: number): Observable<any> {
    return this.http.get(this.url + "/re-order/" + id);
  }
}
