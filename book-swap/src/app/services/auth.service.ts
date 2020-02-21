import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private dataService: DataService) { }

  getUserIsLoggedIn(): Observable<any> {
    const loggedInUserKey = localStorage.getItem('loggedInUserKey');

    return this.dataService.get('User', loggedInUserKey)
      .pipe(map(user => {
        const currentDate = new Date();
        const differenceInMilliseconds = currentDate.getTime() - user.logInDate.getTime();
        const differenceInMinutes = Math.round(((differenceInMilliseconds % 86400000) % 3600000) / 60000);

        return differenceInMinutes < 20;
      }));
  }
}
