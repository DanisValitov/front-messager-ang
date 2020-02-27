import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls : ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  loginPath = 'https://img.icons8.com/clouds/2x/login-rounded-right.png';
  logoutPath = 'https://cdn.iconscout.com/icon/premium/png-256-thumb/logout-1772414-1508310.png';
  dovaPath = 'https://i.pinimg.com/originals/18/96/1d/18961d1363647ce759a7e559821927b1.png';
  isAuth = false;
  profileName = 'Stranger';
  private subscription: Subscription;
  private profileSubscription: Subscription;

  constructor(private authService: AuthService,
    private router: Router) {

  }

  ngOnInit() {
    this.isAuth = this.authService.getIsAuthenticated();
    if (localStorage.getItem('name')) {

      this.profileName = localStorage.getItem('name');
      console.log(this.profileName);
    }
    this.subscription = this.authService.getAuthStatusListener().subscribe((status: boolean) => {
      this.isAuth = status;
        this.profileName = this.authService.getUserName();

    });
    // if (this.isAuth) {
    //   this.profileName = this.authService.getUserName();
    // } else {
    //   this.profileName = 'Stranger';
    // }


    this.profileSubscription = this.authService.getProfilesListener().subscribe( profile => {
      if (profile) {
        this.profileName = profile;
      } else {
        this.profileName = 'Stranger';
      }

    });
  }



  onLogout() {
    // this.isAuth = false;
    this.authService.logout();
    // this.router.navigate(['/login']);
  }

  // setAuthStatus(status: boolean) {
  //   this.authStatus = status;
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.profileSubscription.unsubscribe();
  }
}
