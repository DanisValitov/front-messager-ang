import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  isAuth = false;
  isAuthSub: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
    this.isAuth = this.authService.getIsAuthenticated();
    this.isAuthSub = this.authService.getAuthStatusListener().subscribe(res => {
      this.isAuth = res;
      console.log(this.isAuth);
    });
  }
  ngOnDestroy() {
    this.isAuthSub.unsubscribe();
  }


}
