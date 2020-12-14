import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      lastName: [null, [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      email: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  // tslint:disable-next-line:typedef
  get formValue() { return this.registerForm.controls; }

  // tslint:disable-next-line: typedef
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.userService.register(this.registerForm.value)
      .subscribe(
        data => {
          this.snackBar.open('Registration Succesfull', '', {
            duration: 1000,
          });
          this.router.navigate(['/login']);
        },
        error => {
          this.loading = false;
          this.snackBar.open('Username is already exists', '', {
            duration: 1000,
          });
        });
    console.log('userservice', this.userService);
  }
  // tslint:disable-next-line:typedef
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
