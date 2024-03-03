import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url = "http://localhost:8084/api/v1/payment";

  constructor(private http: HttpClient) { }

  getPayment(): Observable<any> {
    return this.http.get(this.url + "/list");
  }

  getOne(id:number):Observable<any>{
    return this.http.get(this.url +  '/' + id);
  }

}
