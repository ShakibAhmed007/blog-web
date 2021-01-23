import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Comment } from "../model/comment";
import { constObj } from "../../../../shared/url-constant";

@Injectable({ providedIn: "root" })
export class CommentService {
  constructor(private http: HttpClient) {}

  saveComment(comment: Comment) {
    return this.http.post<any>(constObj.COMMENT_SAVE, comment);
  }

  getComment(postId: string) {
    return this.http.get<any>(constObj.COMMENT_GET + postId);
  }
}
