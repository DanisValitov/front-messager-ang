import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { JavaAuthData } from "./java-auth-data.model";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { environment } from '../../environments/environment';


const BACKEND_URL = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class  AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private profileListener = new Subject<string>();
  // private currentProfile: Profile;
  private isAuthenticated = false;
  private tokenTimer: any;
  private userId: string;
  private userName: string;
  private role: string;
  constructor(private http: HttpClient,
    private router: Router) {}

    getIsAuthenticated() {
      return this.isAuthenticated;

    }

    getToken(){
      return this.token;
    }

    getUserName() {
      return this.userName;
    }

    getRole(): string {
      return this.role;
    }

    // getCurrentProfile() {
    //   return this.currentProfile;
    // }

    getUserId() {
      return this.userId;
    }

    getAuthStatusListener() {
      return this.authStatusListener.asObservable();
    }

    getProfilesListener() {
      return this.profileListener.asObservable();
    }

  private saveAuthData(token: string, expirationDate: Date, userId: string, name: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('name', name);
    localStorage.setItem('role', role);
  }

  // private saveCurrentProfile(profile: Profile) {
  //   localStorage.setItem('_id', profile._id);
  //   localStorage.setItem('fullName', profile.fullName);
  //   localStorage.setItem('about', profile.about);
  //   if (profile.dob) {
  //     localStorage.setItem('dob', profile.dob.toISOString());
  //   }
  //   localStorage.setItem('imagePath', profile.imagePath);
  //   localStorage.setItem('owner', profile.owner);
  // }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    // localStorage.removeItem('_id');
    // localStorage.removeItem('fullName');
    // localStorage.removeItem('about');
    // localStorage.removeItem('dob');
    // localStorage.removeItem('imagePath');
    // localStorage.removeItem('owner');
  }


  createUser(email: string, password: string, name: string) {
    // const authData: AuthData = {email: email, password: password, name: name};

    const authData: JavaAuthData = {username: email, password: password};
    // console.log(authData);
    this.http.post(BACKEND_URL + '/signup', authData)
      .subscribe(response => {
        console.log("RESP :" + response);
        // alert('Success!!');
        this.router.navigate(['/']);
      },
      error => {
        // console.log(error);
        this.authStatusListener.next(false);
      }
      );
  }

  login(email: string, password: string) {
    const authData: JavaAuthData = {username: email, password: password};
    this.http
      .post<{jwt: string, expiresIn: number, userId: string, name: string,
        roles: string[]}>(BACKEND_URL + '/authenticate', authData)
      .subscribe(resp => {
        console.log(resp);
        console.log(resp.jwt);
        this.token = resp.jwt;
        if (this.token) {
          const expiresInDuration = resp.expiresIn;
          this.userId = resp.userId;
          this.userName = resp.name;
          this.setAuthTimer(expiresInDuration);
          this.userId = resp.userId;
          this.authStatusListener.next(true);
          this.isAuthenticated = true;
          const now = new Date();
          const expDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.role = resp.roles[0];
          this.saveAuthData(this.token, expDate, this.userId, this.userName, this.role);


          // this.getProfile(this.userId);


          this.router.navigate(['/']);

          // this.profileService.getProfile(this.userId);

        }

      },
      error => {
        this.authStatusListener.next(false);
      }
      );

  }

//   getProfile(id: string) {
//     this.http.post<{msg: string, profile: Profile}>(BACKEND_URL_PROFILE + '/get', {id: id})
//       .subscribe((resp) => {
// console.log('RESP: ' + resp.profile.fullName);
//         this.profileListener.next(resp.profile);
//         this.currentProfile = resp.profile;
// console.log("current profile: " + resp.profile);
//           this.router.navigate(['/']);

//            this.saveCurrentProfile(resp.profile);


//       },
//       error => {
//         // this.authStatusListener.next(false);
//       }
//       );
//   }



  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expiration.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.isAuthenticated = true;
      this.userName = authInformation.userName;
      this.role = authInformation.role;
console.log(this.userName);
      this.setAuthTimer(expiresIn / 1000);
    //   this.currentProfile = {
    //     _id: authInformation._id,
    //     owner: this.userId,
    //     about: authInformation.about,
    //     dob: authInformation.dob,
    //     fullName: authInformation.fullName,
    //     imagePath: authInformation.imagePath};
    // }
    this.profileListener.next(this.userName);
    this.authStatusListener.next(true);
    }
  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('name');
    const role = localStorage.getItem('role');
    if (!token || !expiration) {
      return null;
    }
      return {
        token: token,
        expiration: new Date(expiration),
        userId: userId,
        userName: userName,
        role: role
    };
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userName = null;
    this.userId = null;
    this.role = null;

    this.clearAuthData();
    this.router.navigate(['/auth/login']);
    clearTimeout(this.tokenTimer);
  }
}
