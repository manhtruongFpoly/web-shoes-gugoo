import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_model/User';
import { AuthenticationService } from 'src/app/_service/auth-service/authentication.service';
import { TokenStorageService } from 'src/app/_service/token-storage-service/token-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor(
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService,
    private auth: AuthenticationService
  ) { }

  username;
  userInfo;

  ngOnInit() {
    this.username = this.tokenStorage.getUser();
    this.auth.getUserInfo().subscribe(user => {
      this.userInfo = user;
      this.username = user.username;
    });
  }

  logout(){
    this.tokenStorage.clearUser();
    window.location.reload();
    sessionStorage.removeItem('role');
    sessionStorage.removeItem(environment.authTokenKey);
    this.toastr.success('Đăng xuất thành công');
  }

}
