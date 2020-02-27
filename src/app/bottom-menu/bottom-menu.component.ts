import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.css']
})
export class BottomMenuComponent implements OnInit {
  profilePath = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMiAS5sPmupNnycX8dpjsvhqLg6PrWbwuAQHr80NbXJq2eoRat';
  messagesPath = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSGy371l3gFmLBfrWtDz9cjuqGVsXucejGpdwVXUhKPYoWW4rSG';
  friendsPath = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSUTh5Mg7pqpGrzsPnhN6IryKGqYRPmQ0nR4XIqt_51m-vY5IEQ';
  postsPath = 'https://cdn3.iconfinder.com/data/icons/social-media-2172/128/posts-512.png';


  constructor(private authService: AuthService) { }
  admin = 'ADMIN';
  ngOnInit() {
  }

  getCurRole(): string {
    return this.authService.getRole();
  }

}
