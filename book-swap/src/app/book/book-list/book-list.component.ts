import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import { Book } from '../../models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  @Input() books: Observable<Book[]>;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Book>();

  public isEditing = false;
  public isDeleting = false;

  public dataSource: MatTableDataSource<Book>;
  public displayedColumns: string[] = ['name', 'author', 'genre', 'format', 'condition', 'price', 'location', 'actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.books.subscribe(
      value => {
        this.dataSource = new MatTableDataSource(value);
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(book: Book) {
    this.isEditing = true;
    this.edit.emit(book);
  }

  onDelete(key: string) {
    this.isDeleting = true;
    this.delete.emit(key);
  }

}
