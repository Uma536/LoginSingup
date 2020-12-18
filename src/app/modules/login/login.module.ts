
import { UserserviceResolver } from './userservice.resolver';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SingupComponent } from './singup/singup.component';
import { AuthenticationService } from './services/authentication.service';
import { HomeComponent } from './home/home.component';
import { UserService } from './services/user.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { fakeBackendProvider } from './backend.interceptor';
import { LoginGuard } from './login.guard';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UserlistComponent } from './userlist/userlist.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MaterialDependenciesModule } from 'src/app/material-dependencies/material-dependencies.module';



const routes: Routes = [

  { path: 'home', component: HomeComponent, canActivate: [LoginGuard]},
    {
       path: 'editprofile/:id',
      component: EditProfileComponent,
   resolve: {
   userDetails: UserserviceResolver
 }
    },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SingupComponent},
  // { path: 'editprofile/:id', component: EditProfileComponent},
   // otherwise redirect to home
   { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent },  // Wildcard route for a 404 page

];
	
@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [LoginComponent, SingupComponent, HomeComponent, DialogboxComponent, EditProfileComponent, PagenotfoundComponent, UserlistComponent, SidenavComponent],
  imports: [
    CommonModule,
    MaterialDependenciesModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthenticationService, UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: 'userDetails',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => routes
    },
    // provider used to create fake backend
    fakeBackendProvider],
  exports: [RouterModule]
})
export class LoginModule { }
