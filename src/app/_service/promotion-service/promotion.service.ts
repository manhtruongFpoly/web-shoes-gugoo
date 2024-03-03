import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  url = "http://localhost:8084/api/v1/promotion";

  constructor(private http: HttpClient) { }

  checkPromotion(code: any): Observable<any> {
    return this.http.get(this.url + "/check" + '?code=' + code);
  }
}
