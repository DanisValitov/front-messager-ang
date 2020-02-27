import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";


import { environment } from '../../environments/environment';
import { AuthService } from "../auth/auth.service";

const BACKEND_URL = environment.apiUrl;
@Injectable({providedIn: 'root'})
export class  AdminService {

  constructor(private http: HttpClient,
    private router: Router, private authServie: AuthService) {}

  deleteUser(uuid: string) {
    return this.http.post<any>(BACKEND_URL + "/delete-user", {token: this.authServie.getToken(), uuid: uuid});
  }

  doCheck(email: string) {
    return this.http.post<any>(BACKEND_URL + "/check-user", {token: this.authServie.getToken(), email: email});
  }

  doUpdate(uuid: string, email: string) {
    this.router.navigate([])
    return this.http.post<any>(BACKEND_URL + "/update-user", {token: this.authServie.getToken(), email: email, uuid: uuid});

  }
}
