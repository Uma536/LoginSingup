import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit{
   @Input() dataSource: [];
   // tslint:disable-next-line:typedef
   isTableHasData = true;
   displayedColumns: string[] = ['index', 'firstName', 'lastName', 'username', 'email'];

  constructor() {
  
   }

  ngOnInit(): void {
  }

}
