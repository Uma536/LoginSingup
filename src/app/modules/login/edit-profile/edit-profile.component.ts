import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  id: string;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    // tslint:disable-next-line:align
    private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private snackBar: MatSnackBar, ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
  // tslint:disable-next-line:align
  this.editForm = this.formBuilder.group({
    username: ['', Validators.required],
    firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    lastName: [''],
    email: [''],
   bio: [''],

  });
    this.userService.getUserById(this.id)
  .subscribe(x => {
    this.formValue.firstName.setValue(x.firstName);
    this.formValue.lastName.setValue(x.lastName);
    this.formValue.username.setValue(x.username);
    this.formValue.email.setValue(x.email);
    this.formValue.bio.setValue(x.bio);

});
  }

  // tslint:disable-next-line:typedef
  get formValue() { return this.editForm.controls; }
  // tslint:disable-next-line: typedef
  onSubmit() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
  }
    this.updateUser();
  }

  // tslint:disable-next-line:typedef
  private updateUser() {
    this.authenticationService.update(this.id, this.editForm.value)
        .subscribe(
            data => {
              this.snackBar.open('User details Updated Sucessful', '', {
                duration: 1000,
              });
            },
            error => {
              this.snackBar.open('Fields are missing', '', {
                duration: 1000,
              });
            });
}

}




