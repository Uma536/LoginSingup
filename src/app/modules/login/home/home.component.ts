
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
import { MatSidenav } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

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
  //users = [];
  users: User[];
  isLoadingResults = true;

  displayedColumns: string[] = ['index', 'firstName', 'lastName', 'username', 'email'];
  @ViewChild('sidenav') sidenav: MatSidenav;

  isExpanded = true;
 
  // dataSource = new MatTableDataSource(this.users);
  // tslint:disable-next-line:new-parens
  public dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
    
    console.log("datasource in home",this.dataSource)
  }

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadAllUsers();
  
  }

  // tslint:disable-next-line:typedef
  private loadAllUsers() {

    this.isLoadingResults = true;
    // tslint:disable-next-line:align
    this.userService.getAll()
      // tslint:disable-next-line:whitespace
      .subscribe(users => {
        this.isLoadingResults = false;
        this.dataSource = new MatTableDataSource(users);
      });

    // tslint:disable-next-line:align
    setTimeout(() => {
      this.isLoadingResults = false;

    }, 3000);
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
    if (this.dataSource.filteredData.length > 0) {
      this.isTableHasData = true;
    } else {
      this.isTableHasData = false;
    }
  }

}
