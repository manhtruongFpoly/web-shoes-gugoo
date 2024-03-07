import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenStorageService } from '../token-storage-service/token-storage.service';
import { User } from 'src/app/_model/User';

const AUTH_API = environment.apiUrl + "auth";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userInfo = new BehaviorSubject<User>(new User());
  isLogin: any = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    ) { }


    login(user: User) :Observable<any>{
      return this.http.post(AUTH_API + '/login',user);
    }

    logout(){
      this.tokenStorageService.clearUser();
      window.location.reload();
      // this.toast.success({summary:'Đăng xuất thành công', duration:3000});
    }

    getInfo() {
      return this.http.get(environment.apiUrl + "user" + "/get-user");
    }

    registerAccount(data): Observable<any>{
      return this.http.post(AUTH_API + "/signup", data);
    }

    forgotPass(user: User): Observable<any> {
      return this.http.post<User>(AUTH_API + "/forgot-password", user);
    }
  
    changePassword(user: User): Observable<any> {
      return this.http.post(AUTH_API + "/change-password", user);
    }

    getUserInfo() {
      return this.userInfo.asObservable();
    }

    setUserInfo(user: any) {
      return this.userInfo.next(user);
    }
}
