import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import { Review } from '../../models/review';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  @Input() reviews: Observable<Review[]>;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Review>();

  public isEditing = false;
  public isDeleting = false;

  public dataSource: MatTableDataSource<Review>;
  public displayedColumns: string[] = ['bookName', 'starRating', 'title', 'review', 'userFullName', 'actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.reviews.subscribe(
      value => {
        this.dataSource = new MatTableDataSource(value);
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(review: Review) {
    this.isEditing = true;
    this.edit.emit(review);
  }

  onDelete(key: string) {
    this.isDeleting = true;
    this.delete.emit(key);
  }

}
