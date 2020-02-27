import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl;
@Injectable()
export class AdminGuard implements CanActivate {
  private isAdmin;
  constructor(private authService: AuthService,
    private router: Router, private http: HttpClient) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      const isAuth = this.authService.getIsAuthenticated();

console.log('admin check');
      if (isAuth) {
        // this.router.navigate(['/']);
        const token = this.authService.getToken();
        console.log(token);
        return this.http.post<any>(BACKEND_URL + '/is-admin', {token: token}).pipe(
          map(answer => {
            if (answer.message === 'success') {
              return true;
            } else {
              return false;
            }
          }),
          catchError(err => {
            this.router.navigate(['/']);
            return of(false);
          })
        );
      }
  }
}
