
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { User } from '../../user';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isTableHasData = true;
  currentUser: User;
   list: Observable<any[]>
  // tslint:disable-next-line:semicolon
   users = [];
  // users: User[];
  isLoad = false;
  displayedColumns: string[] = ['index', 'firstName', 'lastName', 'username', 'email'];
  // dataSource = new MatTableDataSource(this.users);
  public dataSource = new MatTableDataSource<User>();
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
  )
  {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadAllUsers();
  }
  // tslint:disable-next-line:typedef
  private loadAllUsers() {
    this.isLoad = true;
    // tslint:disable-next-line:align
    this.userService.getAll()
      // tslint:disable-next-line:whitespace
      .subscribe(users => {this.isLoad = false; this.dataSource.data = users as User[]; });
    // tslint:disable-next-line:align
    setTimeout(() => {
      this.isLoad = false;
    }, 1000);
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

  // tslint:disable-next-line:typedef
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.filteredData.length > 0){
      this.isTableHasData = true;
    } else {
      this.isTableHasData = false;
    }
  }

}
