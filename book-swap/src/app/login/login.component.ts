import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  public isLogginIn = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.createForm();

    this.authService.getUserIsLoggedIn()
      .subscribe(userIsLoggedIn => {
        if (userIsLoggedIn) {
          this.router.navigate(['Home']);
        }
      });
  }

  onSubmit() {
    this.isLogginIn = true;
    const loginInfo = {
      userName: this.loginForm.value.userName,
      password: this.loginForm.value.password
    };
    this.authService.loginUser(loginInfo)
      .subscribe((loggedInUser: User) => {
        console.log('loggedInUser =', loggedInUser);
        if (loggedInUser) {
          localStorage.setItem('loggedInUserKey', JSON.stringify(loggedInUser.key));
          console.log('redirecting to Home...');
          this.router.navigate(['Home']);
        } else {
          // login failed
        }

        this.isLogginIn = false;
      });
  }

}
