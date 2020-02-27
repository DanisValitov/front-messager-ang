import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    if (authToken) {
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken)
          .set('Content-Type', 'application/json')
      });
      console.log(authRequest);
      return next.handle(authRequest);
    } else {
      const authRequest = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
      });
      // console.log(authRequest);
      return next.handle(authRequest);
    }
  }
}
