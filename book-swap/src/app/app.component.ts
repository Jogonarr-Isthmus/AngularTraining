import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'book-swap';
  userIsLoggedIn = false;
  loggedInUserFullName: string;

  constructor(private authService: AuthService, private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe((event: NavigationEnd) => {
        this.checkUserIsLoggedIn();
      });
  }

  ngOnInit() {
    this.checkUserIsLoggedIn();
  }

  checkUserIsLoggedIn() {
    this.authService.getUserIsLoggedIn()
      .subscribe((response: boolean) => {
        this.userIsLoggedIn = response;

        if (this.userIsLoggedIn) {
          this.loggedInUserFullName = JSON.parse(localStorage.getItem('loggedInUserFullName'));
        }
      });
  }

  logOut() {
    this.authService.logoutUser();
    this.loggedInUserFullName = null;
    console.log('Redirecting to Login...');
    this.router.navigate(['Login']);
  }

}
