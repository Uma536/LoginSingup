import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add authorization header with jwt token if available
      // tslint:disable-next-line:prefer-const
      let currentUser = this.authenticationService.currentUserValue;
      console.log('usertoken', currentUser);
      if (currentUser && currentUser.token) {
          request = request.clone({
              setHeaders:  {
                  Authorization: `Bearer ${currentUser.token}`
              }
          });
          console.log('usertoken', request);

      }

      return next.handle(request);
  }
}
