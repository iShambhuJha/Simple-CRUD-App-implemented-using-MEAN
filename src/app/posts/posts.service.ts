import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: any = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router){}
  getPosts() {
   this.http.get<{message:string, posts:any}>('http://localhost:3000/api/posts')
   .subscribe(postData=>{
    this.posts = postData.posts;
    this.postsUpdated.next([...this.posts]);
   });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {_id:null,title: title, content: content};
    this.http.post<{message: string, postid:string}>('http://localhost:3000/api/posts',post)
    .subscribe((resp)=>{
      const id = resp.postid;
      post._id =id;
      console.log(resp.message)
    });
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
    this.router.navigate(["/"]);
  }
  updatePost(id:string,title:string,content:string){
    const post: Post ={_id:id, title:title,content:content};
    this.http.put('http://localhost:3000/api/posts/'+id,post)
    .subscribe(res=>{
      console.log(res);
    })
    this.router.navigate(["/"]);
  }
  deletePost(id:string){
    this.http.delete('http://localhost:3000/api/posts/'+id).subscribe(ele=>{
     const updatedPost = this.posts.filter(post=>post._id !== id);
     this.posts = updatedPost;
     this.postsUpdated.next([...this.posts]);
    })
  }
  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string }>(
      "http://localhost:3000/api/posts/" + id
    );
  }
}
