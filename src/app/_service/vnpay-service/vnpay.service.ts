import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VnpayService {

  url = "http://localhost:8084/api/vnPay";

  constructor(private http: HttpClient) { }

  getPayment(amount): Observable<any> {
    return this.http.get(this.url + `/payment?amount=${amount}`);
  }

}
