import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { DataService } from '../services/data.service';
import { EncryptionService } from '../services/encryption.service';

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

  constructor(private dataService: DataService, private encryptionService: EncryptionService) { }

  ngOnInit() {
    this.editing = false;
    this.getUsers();
  }

  private getUsers() {
    this.users = this.dataService.getAll(this.tableName);
  }

  private showForm(user: User) {
    this.selectedUser = user;
    if (this.selectedUser.password) {
      this.selectedUser.password = this.encryptionService.decrypt(this.selectedUser.password);
    }

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
    const userToSave = form.value;

    if (userToSave.password) {
      userToSave.password = this.encryptionService.encrypt(userToSave.password);
    }

    this.dataService.save(this.tableName, userToSave)
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
