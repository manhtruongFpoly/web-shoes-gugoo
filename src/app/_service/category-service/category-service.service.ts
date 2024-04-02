import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {


  url = "http://localhost:8084/api/v1/category";

  constructor(private http: HttpClient) { }

  getListCategory(){
    return this.http.get(this.url + "/list-status");
  }

}
