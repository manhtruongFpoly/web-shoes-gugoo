import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = "http://localhost:8084/api/v1/order";

  constructor(private http: HttpClient) { }

  getOrderByStatus(status: any): Observable<any> {
    return this.http.get(this.url + "/list-status/" + status);
  }

  getOrderByStatusandAccount(status: any,userId: any): Observable<any> {
    return this.http.get(this.url + "/list-status-account/" + status + `?userId=` + userId);
  }

  canceledOrder(id: number, reason: any): Observable<any> {
    return this.http.get(this.url + "/cancelled/" + id + '?reason=' + reason);
  }

  getCountOrderByStatus(status: any,userId: any): Observable<any> {
    return this.http.get(this.url + "/count-order/" + status + `/` + userId);
  }

  reOrderIntoCart(id: number,userId:any): Observable<any> {
    return this.http.get(this.url + "/re-order/" + id + '/' + userId);
  }
}
