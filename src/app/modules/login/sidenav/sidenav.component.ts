import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { AuthenticationService } from '../services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../../user';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  @Output() emitId  = new EventEmitter();
  isExpanded = true;
  currentUser: User;
  matRippleDisabled: false;

  constructor(private authenticationService: AuthenticationService,  private router: Router,
    // tslint:disable-next-line:align
    public dialog: MatDialog,
    ) { 
      this.currentUser = this.authenticationService.currentUserValue;
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit(): void {
  }
  confirmationDialogbox(): void {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '350px',
      height: '150px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logout();
      }
    });
  }
  // tslint:disable-next-line:typedef
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  userDetails(id){
   this.emitId.emit(id)
  }
}
