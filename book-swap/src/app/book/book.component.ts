import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Book } from '../models/book';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  private tableName = 'Book';
  public books: Observable<Book[]>;
  public selectedBook: Book;
  public editing: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.editing = false;
    this.getBooks();
  }

  private getBooks() {
    this.books = this.dataService.getAll(this.tableName);
  }

  private showForm(book: Book) {
    this.selectedBook = book;
    this.editing = true;
  }

  private hideForm(form: { reset: () => void; } = null) {
    if (form) {
      form.reset();
    }

    this.getBooks();
    this.selectedBook = new Book();
    this.editing = false;
  }

  public onCreate() {
    this.showForm(new Book());
  }

  public onEdit(book: Book) {
    this.showForm(Object.assign({}, book));
  }

  public onSave(form: any) {
    const bookToSave = form.value;

    this.dataService.save(this.tableName, bookToSave)
      .then((response: any) => {
        this.hideForm(form);
      });
  }

  public onDelete(form: any) {
    this.dataService.delete(this.tableName, form.value.key)
      .then((response: any) => {
        this.hideForm(form);
      });
  }

  public onDeleteByKey(key: string) {
    this.dataService.delete(this.tableName, key)
      .then((response: any) => {
        this.hideForm();
      });
  }

  public onDeleteAll() {
    this.dataService.deleteAll(this.tableName)
      .then((response: any) => {
        this.hideForm();
      });
  }

  public onCancel() {
    this.hideForm();
  }

}
