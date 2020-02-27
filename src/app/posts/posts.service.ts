import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/posts/';

@Injectable({providedIn: 'root'})
export class PostsService {

  private posts: Post[] = [];
  // private postsUpdated = new Subject<{posts: Post[], maxPosts: number}>();
  private postsUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient,
    private router: Router) {

  }
   // CW203azCEKWh1m8B

  // getPosts() {
  //   this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
  //   .pipe(map((postData) => {
  //     return postData.posts.map( (post) => {
  //       return {
  //         title: post.title,
  //         content: post.content,
  //         id: post._id
  //       };
  //     });
  //   }))
  //     .subscribe((transformedPosts) => {
  //       this.posts = transformedPosts.posts;
  //       this.postsUpdated.next([...this.posts]);
  //     });
  // }

  getPosts() {

  this.http.get<{message: string, posts: Post[]}>(BACKEND_URL )
    .subscribe((incomingPosts) => {
      this.posts = incomingPosts.posts;
      // console.log(this.posts);
      this.postsUpdated.next([...this.posts]);
    });
}

  //   getPosts(postsPerPage: number, currentPage: number) {
  //     const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
  //   this.http.get<{message: string, posts: Post[], maxPosts: number}>(BACKEND_URL + queryParams)
  //     .subscribe((incomingPosts) => {
  //       this.posts = incomingPosts.posts;
  //       // console.log(this.posts);
  //       this.postsUpdated.next({posts: [...this.posts], maxPosts: incomingPosts.maxPosts});
  //     });
  // }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string){
    return this.http.get<Post>(BACKEND_URL + id);
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData : Post | FormData;
    if ( typeof(image) === 'object') {
      postData = new FormData();
      postData.append('_id' , id);
      postData.append('title' , title);
      postData.append('content' , content);
      postData.append('image' , image, title);
    } else {
       postData = {
        _id : id,
        title : title,
        content : content,
        imagePath : image,
        creator: null
      };
    }


    this.http.put(BACKEND_URL + id, postData)
      .subscribe( (resp) => {
          // const updatedPosts = [...this.posts];
          // const oldPostIndex = updatedPosts.findIndex( p => p._id === id);
          // const post : Post = {
          //   _id : id,
          //   title : title,
          //   content : content,
          //   imagePath : ""
          // };
          // updatedPosts[oldPostIndex] = post;
          // this.posts = updatedPosts;
          // this.postsUpdated.next([...this.posts]);
          this.router.navigate(['/']);
      });
  }

  addPost(title: string, content: string, image: File) {
    // const post: Post = {_id: null, title: title, content: content};
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);


    this.http.post<{msg: string, post: Post}>(BACKEND_URL, postData)
      .subscribe((responseData) => {
//         const post: Post = responseData.post;
// //        console.log(responseData.msg);
//  //       post._id = responseData.postId;
//         this.posts.push(post);
//         this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);

      });

  }

  deletePost(id: string) {
    return this.http.delete(BACKEND_URL + id);
      // .subscribe(() => {
      //   console.log('deleted');
      //   // this.getPosts();
      //   this.posts = this.posts.filter(post => post._id !== id);
      //   this.postsUpdated.next([...this.posts]);
      // });
  }
}
