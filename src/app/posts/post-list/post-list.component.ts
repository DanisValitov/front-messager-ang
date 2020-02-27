import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { PageEvent } from "@angular/material";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  posts: Post[] = [];
  isLoading = false;
  isAuth = false;
  private authSubscription: Subscription;
  private postsSub: Subscription;
  currentPage = 1;
  totalPosts = 0;
  postsPerPage = 2;
  userId: string;
  pageSizeOptions = [1,2,5,10];

  constructor(public postsService: PostsService,
    private authService: AuthService) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.postsService.getPosts();
    this.isLoading = true;
    this.isAuth = this.authService.getIsAuthenticated();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postData) => {
        console.log(postData);
        this.posts = postData;
        // this.totalPosts = postData.maxPosts;
        this.isLoading = false;
      });
    this.authSubscription = this.authService.getAuthStatusListener()
      .subscribe( (status: boolean) => {
        console.log('new status: ' + status);
        this.isAuth = status;
        this.userId = this.authService.getUserId();
    });
  }

  onDelete(id: string){
   this.postsService.deletePost(id)
    .subscribe(() => {
      this.postsService.getPosts();
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authSubscription.unsubscribe();
  }

  // onChangePage(pageData: PageEvent){
  //   this.isLoading = true;
  //   this.currentPage = pageData.pageIndex + 1;
  //   this.postsPerPage = pageData.pageSize;
  //   this.postsService.getPosts(this.postsPerPage, this.currentPage);
  // }
}
