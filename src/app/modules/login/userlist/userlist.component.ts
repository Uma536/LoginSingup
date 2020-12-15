import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
   @Input() dataSource: [];
   isTableHasData = true;
   displayedColumns: string[] = ['index', 'firstName', 'lastName', 'username', 'email'];

  constructor() { }

  ngOnInit(): void {
  }

}
