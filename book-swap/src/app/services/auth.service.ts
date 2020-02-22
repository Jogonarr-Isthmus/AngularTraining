import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private dataService: DataService) { }

  loginUser(loginInfo: any): Observable<any> {
    return this.dataService.getAll('User')
      .pipe(map(users => {
        const matchedUsers = users.filter(user =>
          (user.userName === loginInfo.userName || user.email === loginInfo.userName) && user.password === loginInfo.password
        );

        const matchedUser = matchedUsers.length > 0
          ? matchedUsers[0]
          : null;

        matchedUser.logInDate = new Date();
        this.dataService.save('User', matchedUser);

        return matchedUser;
      }
      ));
  }

  logoutUser(): Observable<any> {
    const loggedInUserKey = JSON.parse(localStorage.getItem('loggedInUserKey'));
    localStorage.removeItem('loggedInUserKey');

    return this.dataService.get('User', loggedInUserKey)
      .pipe(map((loggedInUser: User) => {
        loggedInUser.logInDate = null;
        this.dataService.save('User', loggedInUser);
      }));
  }

  getUserIsLoggedIn(): Observable<any> {
    const loggedInUserKey = JSON.parse(localStorage.getItem('loggedInUserKey'));
    console.log('loggedInUserKey =', loggedInUserKey);

    return this.dataService.get('User', loggedInUserKey)
      .pipe(map((user: User) => {
        if (user && user.logInDate) {
          const currentDate = new Date();
          const loginDate = new Date(user.logInDate);
          const differenceInMilliseconds = currentDate.getTime() - loginDate.getTime();
          const differenceInMinutes = Math.round(((differenceInMilliseconds % 86400000) % 3600000) / 60000);

          return differenceInMinutes < 20;
        } else {
          return false;
        }
      }));
  }
}
