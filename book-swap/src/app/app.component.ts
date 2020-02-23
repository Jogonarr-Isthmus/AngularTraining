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
      .subscribe((response: boolean) => this.userIsLoggedIn = response);
  }

  logOut() {
    this.authService.logoutUser();
    console.log('Redirecting to Login...');
    this.router.navigate(['Login']);
  }

}
