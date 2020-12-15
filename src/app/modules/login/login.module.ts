import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
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
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UserlistComponent } from './userlist/userlist.component';



const routes: Routes = [

  { path: 'home', component: HomeComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SingupComponent},
  { path: 'editprofile/:id', component: EditProfileComponent},
   // otherwise redirect to home
   { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent },  // Wildcard route for a 404 page

];
@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [LoginComponent, SingupComponent, HomeComponent, DialogboxComponent, EditProfileComponent, PagenotfoundComponent, UserlistComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule,
    MatDialogModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthenticationService, UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider],
  exports: [RouterModule]
})
export class LoginModule { }
