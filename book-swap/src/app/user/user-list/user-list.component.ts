import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import { User } from '../../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  // @Input() users: Observable<User[]>;
  @Input() users: Observable<User[]>;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<User>();

  public isEditing = false;
  public isDeleting = false;

  public dataSource: MatTableDataSource<User>;
  public displayedColumns: string[] = ['userName', 'name', 'lastName', 'email', 'actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.users.subscribe(
      value => {
        this.dataSource = new MatTableDataSource(value);
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(user: User) {
    this.isEditing = true;
    this.edit.emit(user);
  }

  onDelete(key: string) {
    this.isDeleting = true;
    this.delete.emit(key);
  }

}
