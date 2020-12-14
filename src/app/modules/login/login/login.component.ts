import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private snackBar: MatSnackBar,
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/home']);
      }
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: [null, Validators.required],
          password: [null, Validators.required]
      });

      // get return url from route parameters or default to '/'
      // tslint:disable-next-line:no-string-literal
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      console.log('returnurl', this.returnUrl);
  }

  // convenience getter for easy access to form fields
  // tslint:disable-next-line:typedef
  get formValue() {
    return this.loginForm.controls;
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.login(this.formValue.username.value, this.formValue.password.value)
          .subscribe(
              data => {
                this.snackBar.open('Login Successfull', '', {
                  duration: 1000,
                });
                this.router.navigate([this.returnUrl]);
              },
              error => {
                this.snackBar.open('Username or Password incorrect', '', {
                  duration: 1000,
                });
              });
  }
}
