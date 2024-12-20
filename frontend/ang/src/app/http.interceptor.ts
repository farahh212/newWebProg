import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request and attach the credentials (cookies)
    const clonedRequest = req.clone({
      withCredentials: true, // Include cookies
    });

    return next.handle(clonedRequest);
  }
}
