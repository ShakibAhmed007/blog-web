import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "./user";
import { constObj } from "../shared/url-constant";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username, password) {
    return this.http
      .post<any>(constObj.LOGIN_URL, { email: username, password: password })
      .pipe(
        map((user) => {
          let u = new User();
          u.id = user.data.id;
          u.username = user.data.name;
          u.email = user.data.email;
          localStorage.setItem("currentUser", JSON.stringify(u));
          this.currentUserSubject.next(u);
          return user;
        })
      );
  }

  logout() {
    console.log("logout is called ----");
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    window.location.reload();
  }
}
