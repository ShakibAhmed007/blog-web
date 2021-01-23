import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { constObj } from "../../../../shared/url-constant";

@Injectable({ providedIn: "root" })
export class VoteService {
  constructor(private http: HttpClient) {}

  saveVote(vote: any) {
    return this.http.post<any>(constObj.VOTE_SAVE, vote);
  }
}
