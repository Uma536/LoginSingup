import { environment } from './../../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
}
// tslint:disable-next-line:typedef
register(user: User) {
  return this.http.post(`${environment.apiUrl}/users/register`, user);
}


getUserById(id: string) {
  return this.http.get<User>(`${environment.apiUrl}/users` + '/' +id);
}


}
