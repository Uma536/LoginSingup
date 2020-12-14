import { Component } from '@angular/core';
import { User } from './modules/user';
import { AuthenticationService } from './modules/login/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title(title: any) {
    throw new Error("Method not implemented.");
  }


  constructor( ){}
}