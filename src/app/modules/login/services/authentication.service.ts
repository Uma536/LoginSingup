import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { User } from '../../user';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
}

public get currentUserValue(): User {
  return this.currentUserSubject.value;
}


// tslint:disable-next-line:typedef
login(username: string, password: string) {
    return this.http.post<any>(`/users/authenticate`, { username, password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }

            return user;
        }));
}
// tslint:disable-next-line:typedef
logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
}

update(id, params) {
  // tslint:disable-next-line:whitespace
  return this.http.put(`${environment.apiUrl}/users` + '/' +id, params)
      .pipe(map(x => {
          // update stored user if the logged in user updated their own record
          if (id === this.currentUserValue.id) {
              // update local storage
              const user = { ...this.currentUserValue, ...params };
              localStorage.setItem('user', JSON.stringify(user));

              // publish updated user to subscribers
              this.currentUserSubject.next(user);
          }
          return x;
      }));
}
// updateUser(user: User) {
//   return this.http.put(`${environment.apiUrl}/users` + '/' + user.id, user);
// }
}
