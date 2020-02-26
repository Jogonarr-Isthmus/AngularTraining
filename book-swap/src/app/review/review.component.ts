import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Review } from '../models/review';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  private tableName = 'Review';
  public reviews: Observable<Review[]>;
  public selectedReview: Review;
  public editing: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.editing = false;
    this.getReviews();
  }

  private getReviews() {
    this.reviews = this.dataService.getAll(this.tableName);
  }

  private showForm(review: Review) {
    this.selectedReview = review;
    this.editing = true;
  }

  private hideForm(form: { reset: () => void; } = null) {
    if (form) {
      form.reset();
    }

    this.getReviews();
    this.selectedReview = new Review();
    this.editing = false;
  }

  public onCreate() {
    this.showForm(new Review());
  }

  public onEdit(review: Review) {
    this.showForm(Object.assign({}, review));
  }

  public onSave(form: any) {
    const reviewToSave: Review = form.value;

    this.dataService.save(this.tableName, reviewToSave)
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
