import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Review } from '../../models/review';
import { DataService } from 'src/app/services/data.service';
import { SelectItem } from 'src/app/models/select-item';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {

  @Input() selectedReview: Review;

  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  public reviewForm: FormGroup;
  public hidePassword = true;
  public bookOptions: SelectItem[] = [];

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  private createForm() {
    this.reviewForm = this.formBuilder.group({
      key: new FormControl(''),
      bookName: new FormControl(''),
      starRating: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      review: new FormControl(''),
      userFullName: new FormControl('')
    });

    if (this.selectedReview && this.selectedReview.key) {
      this.reviewForm.patchValue(this.selectedReview);
    }
  }

  ngOnInit() {
    this.dataService.getAll('Book')
      .subscribe(
        books => { this.bookOptions = books.map(book => new SelectItem(book.name, book.name)); }
      );

    this.createForm();
  }

  onSubmit() {
    if (!this.reviewForm.value.userFullName) {
      const loggedInUserFullName = JSON.parse(localStorage.getItem('loggedInUserFullName'));
      this.reviewForm.patchValue({ userFullName: loggedInUserFullName });
    }

    this.save.emit(this.reviewForm);
  }

  onDelete() {
    this.delete.emit(this.reviewForm);
  }

  onCancel() {
    this.cancel.emit();
    this.reviewForm.reset();
  }

  onRatingSet(event) {
    this.reviewForm.patchValue({ starRating: event });
  }

}
