import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
profilePath = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMiAS5sPmupNnycX8dpjsvhqLg6PrWbwuAQHr80NbXJq2eoRat';
messagesPath = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSGy371l3gFmLBfrWtDz9cjuqGVsXucejGpdwVXUhKPYoWW4rSG';
friendsPath = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSUTh5Mg7pqpGrzsPnhN6IryKGqYRPmQ0nR4XIqt_51m-vY5IEQ';
postsPath = 'https://cdn3.iconfinder.com/data/icons/social-media-2172/128/posts-512.png';
newPostPath = 'https://img.icons8.com/plasticine/2x/new.png';
private curProfileId;

admin = 'ADMIN';

constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // this.curProfileId = this.authService.getCurrentProfile()._id;
    // this.authSub = this.authService.getProfilesListener().subscribe(profile => {
    //   this.curProfileId = profile._id;
    // });
  }

  getCurRole(): string {
    return this.authService.getRole();
  }

  getCurProfileId() {
    return this.curProfileId;
  }

  openMyProfile() {
    // this.router.navigate(['/profile', this.curProfileId]);
  }

}
