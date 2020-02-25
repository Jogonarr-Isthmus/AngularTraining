import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Book } from '../../models/book';
import { SelectItem } from 'src/app/models/select-item';
import { SelectItemGroup } from 'src/app/models/select-item-group';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  @Input() selectedBook: Book;

  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  public bookForm: FormGroup;
  public hidePassword = true;
  public genreOptions: SelectItem[] = [
    new SelectItem('Fantasy', 'Fantasy'),
    new SelectItem('Adventure', 'Adventure'),
    new SelectItem('Romance', 'Romance'),
    new SelectItem('Contemporary', 'Contemporary'),
    new SelectItem('Dystopian', 'Dystopian'),
    new SelectItem('Mystery', 'Mystery'),
    new SelectItem('Horror', 'Horror'),
    new SelectItem('Thriller', 'Thriller'),
    new SelectItem('Paranormal', 'Paranormal'),
    new SelectItem('HistoricalFiction', 'Historical Fiction'),
    new SelectItem('ScienceFiction', 'Science Fiction'),
    new SelectItem('Memoir', 'Memoir'),
    new SelectItem('Cooking', 'Cooking'),
    new SelectItem('Art', 'Art'),
    new SelectItem('SelfHelp / Personal', 'Self-help / Personal'),
    new SelectItem('Development', 'Development'),
    new SelectItem('Motivational', 'Motivational'),
    new SelectItem('Health', 'Health'),
    new SelectItem('History', 'History'),
    new SelectItem('Travel', 'Travel'),
    new SelectItem('HowTo', 'Guide / How-to'),
    new SelectItem('FamiliesAndRelationships', 'Families & Relationships'),
    new SelectItem('Humor', 'Humor'),
    new SelectItem('Childrens', 'Children’s')
  ];
  public formatOptions: SelectItem[] = [
    new SelectItem('Hardcover', 'Hardcover'),
    new SelectItem('Paperback', 'Paperback'),
    new SelectItem('SpiralBinding', 'Spiral Binding')
  ];
  public usedConditionOptions: SelectItemGroup[] = [
    new SelectItemGroup('Used', [
      new SelectItem('LikeNew', 'Like New'),
      new SelectItem('VeryGood', 'Very Good'),
      new SelectItem('Good', 'Good'),
      new SelectItem('Acceptable', 'Acceptable')
    ])
  ];

  constructor(private formBuilder: FormBuilder) { }

  private createForm() {
    this.bookForm = this.formBuilder.group({
      key: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      genre: new FormControl('', [Validators.required]),
      format: new FormControl('', [Validators.required]),
      condition: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
    });

    if (this.selectedBook && this.selectedBook.key) {
      this.bookForm.patchValue(this.selectedBook);
    }
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this.save.emit(this.bookForm);
  }

  onDelete() {
    this.delete.emit(this.bookForm);
  }

  onCancel() {
    this.cancel.emit();
    this.bookForm.reset();
  }

}
