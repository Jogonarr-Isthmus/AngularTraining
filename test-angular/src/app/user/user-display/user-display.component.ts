import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {

  @Input() user: User;
  @Output() deleteUser = new EventEmitter<User>();
  @Output() editUser = new EventEmitter<User>();
  public isDeleting = false;

  constructor() { }

  ngOnInit() {
  }

  edit() {
    this.editUser.emit(this.user);
  }

  delete() {
    this.isDeleting = true;
    this.deleteUser.emit(this.user);
  }

}
