import { Injectable, Input } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { User } from '../user';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserserviceResolver implements Resolve<User> {
 // id = this.route.snapshot.params.id;
  // @Input() emitId = ''
  constructor(private authenticationService: AuthenticationService, private userService: UserService, private route: ActivatedRoute,) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    // console.log("userdataid",route);
    const id = route.paramMap.get('id')

   console.log('userid',route.paramMap.get('id'));
   
    return this.userService.getUserById(id);
   }
}
