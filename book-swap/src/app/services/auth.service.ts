import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { User } from '../models/user';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private dataService: DataService, private encryptionService: EncryptionService) { }

  loginUser(loginInfo: any): Observable<any> {
    return this.dataService.getAll('User')
      .pipe(
        map(users => {
          const matchedUsers = users.filter(user =>
            (user.userName === loginInfo.userName || user.email === loginInfo.userName)
            && this.encryptionService.decrypt(user.password) === loginInfo.password
          );

          const matchedUser = matchedUsers.length > 0
            ? matchedUsers[0]
            : null;

          if (matchedUser) {
            localStorage.setItem('loggedInUserKey', JSON.stringify(matchedUser.key));
          }

          // console.log('loginUser().matchedUser =', matchedUser);
          // matchedUser.logInDate = new Date();
          // if (matchedUser.key) {
          //   console.log('saving loginUser().matchedUser');
          //   this.dataService.save('User', matchedUser);
          // }

          return matchedUser;
        }),
      );
  }

  logoutUser(): void {
    localStorage.removeItem('loggedInUserKey');
  }

  // logoutUser(): Observable<any> {
  //   const loggedInUserKey = JSON.parse(localStorage.getItem('loggedInUserKey'));
  //   localStorage.removeItem('loggedInUserKey');

  //   return this.dataService.get('User', loggedInUserKey)
  //     .pipe(map((loggedInUser: User) => {
  //       if (loggedInUser.key) {
  //         loggedInUser.logInDate = null;
  //         this.dataService.save('User', loggedInUser);
  //       }
  //     }));
  // }

  getUserIsLoggedIn(): Observable<any> {
    const loggedInUserKey = JSON.parse(localStorage.getItem('loggedInUserKey'));

    // Can't get this to work...
    // just validating if the user exists...
    return this.dataService.get('User', loggedInUserKey)
      .pipe(map((user: User) => user !== null));

    // return this.dataService.get('User', loggedInUserKey)
    //   .pipe(map((user: User) => {
    //     if (user && user.logInDate) {
    //       const currentDate = new Date();
    //       console.log('getUserIsLoggedIn().currentDate =', currentDate);

    //       const loginDate = new Date(user.logInDate);
    //       console.log('getUserIsLoggedIn().loginDate =', loginDate);

    //       const differenceInMilliseconds = currentDate.getTime() - loginDate.getTime();
    //       const differenceInMinutes = Math.round(((differenceInMilliseconds % 86400000) % 3600000) / 60000);

    //       console.log('getUserIsLoggedIn().differenceInMinutes =', differenceInMinutes);

    //       return differenceInMinutes < 20;
    //     } else {
    //       console.log('getUserIsLoggedIn() =', false);
    //       return false;
    //     }
    //   }));
  }
}
