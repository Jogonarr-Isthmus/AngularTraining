import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  responseUser: User[];

  Users: User[] = [
    {
      id: 1,
      name: 'Goku',
      lastName: 'Son',
      age: 80,
      birthDate: new Date('1965-11-23'),
      email: 'goku.son@gmail.com'
    },
    {
      id: 2,
      name: 'Gohan',
      lastName: 'Son',
      age: 25,
      birthDate: new Date('1996-11-23'),
      email: 'gohan.son@gmail.com'
    }
  ];

  public getUsers() {
    this.responseUser = this.Users;
    return this.responseUser;
  }
}
