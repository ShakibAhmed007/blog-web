import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BlogPost } from "../model/blog-post";
import { constObj } from "../../../../shared/url-constant";

@Injectable({ providedIn: "root" })
export class BlogPostService {
  constructor(private http: HttpClient) {}

  getBlogPosts() {
    return this.http.get<any>(constObj.BLOG_POST_GET);
  }

  saveBlogPost(post: BlogPost) {
    return this.http.post<any>(constObj.BLOG_POST_SAVE, post);
  }
}
