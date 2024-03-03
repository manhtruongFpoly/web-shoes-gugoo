import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  url = "http://localhost:8084/api/v1/order";

  constructor(private http: HttpClient) { }

  checkOut(checkout: any): Observable<any> {
    return this.http.post(this.url + "/check-out", checkout);
  }
}
