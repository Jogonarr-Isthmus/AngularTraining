import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private tableName = 'User';
  public users: Observable<User[]>;
  public selectedUser: User;
  public editing: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.editing = false;
    this.getUsers();
  }

  private getUsers() {
    this.users = this.dataService.getAll(this.tableName);
  }

  private showForm(user: User) {
    this.selectedUser = user;
    this.editing = true;
  }

  private hideForm(form: { reset: () => void; } = null) {
    if (form) {
      form.reset();
    }

    this.getUsers();
    this.selectedUser = new User();
    this.editing = false;
  }

  public onCreate() {
    this.showForm(new User());
  }

  public onEdit(user: User) {
    this.showForm(Object.assign({}, user));
  }

  public onSave(form: any) {
    this.dataService.save(this.tableName, form.value)
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
