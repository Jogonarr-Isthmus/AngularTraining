import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public hidePassword = true;
  public isLoggingIn = false;
  public isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  private redirectToHome() {
    console.log('Redirecting to Home...');
    this.router.navigate(['Home']);
  }

  private openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      panelClass: ['snack-bar-color'],
      duration: 2000,
    });
  }

  ngOnInit() {
    this.createForm();

    this.authService.getUserIsLoggedIn()
      .subscribe((userIsLoggedIn: boolean) => {
        if (userIsLoggedIn) {
          this.redirectToHome();
        }
      });
  }

  onSubmit() {
    this.isLoggingIn = true;

    const loginInfo = {
      userName: this.loginForm.value.userName,
      password: this.loginForm.value.password
    };
    this.authService.loginUser(loginInfo)
      .subscribe((loggedInUser: User) => {
        if (loggedInUser) {
          this.isLoggedIn = true;
          this.redirectToHome();
        } else {
          this.openSnackBar('Login failed...');
          console.warn('Login failed...');
        }

        this.isLoggingIn = false;
      });
  }

}
