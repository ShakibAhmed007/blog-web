import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
  } from '@angular/common/http';
  import { Observable } from 'rxjs';
   
  export class CustomHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if(!req.url.endsWith('authenticate')){
        let token = localStorage.getItem('userToken');
        console.log('token ====', token);
        const clonedRequest = req.clone({ setHeaders: { Authorization: 'Bearer 123' } });
        // const clonedRequest = req.clone({ headers: req.headers.append('Authorization', ('Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYXZhaW51c2UiLCJleHAiOjE2MTEzNjAwNDEsImlhdCI6MTYxMTM0MjA0MX0.OrhTu-iW175Jv8LK14s-fuO9KLk46tejf0Wzq5trkKjXQe9WCNMI0NFYiiSs5QJQDcMVqhG6hZP2ZgG1xVcVOA')) });
        console.log('req ---', clonedRequest);
        return next.handle(clonedRequest);
      }else{
        return next.handle(req);
      }
    }
  }