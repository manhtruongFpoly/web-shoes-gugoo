import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_service/token-storage-service/token-storage.service';
import { AuthenticationService } from './_service/auth-service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sell-shoes-fe';

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthenticationService) {

  }

  ngOnInit(): void {
    this.authService.getInfo().subscribe((res: any) => {
      this.authService.setUserInfo({
        id: res.id,
        username: res.username,
        phone: res.phone,
        fullname: res.fullname,
        address: res.address
      });
    })
  }
}
