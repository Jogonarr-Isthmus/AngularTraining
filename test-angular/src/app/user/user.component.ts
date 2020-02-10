import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers() {
    this.users = this.userService.getUsers();
    console.log('users =', this.users);
  }

  public deleteUser(user: User) {
    console.log('Delete User =', user);
  }

  public editUser(user: User) {
    console.log('Edit User =', user);
  }

}
