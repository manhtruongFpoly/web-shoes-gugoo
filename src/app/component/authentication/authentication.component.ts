import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService
  ) { }

  username;

  ngOnInit() {
    this.username = this.tokenStorage.getUser();
  }


  logout(){
    this.tokenStorage.clearUser();
    window.location.reload();
    sessionStorage.removeItem('role');
    sessionStorage.removeItem(environment.authTokenKey);
    this.toastr.success('Đăng xuất thành công');
  }

}
