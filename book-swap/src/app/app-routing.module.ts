import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: 'Home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Users',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'About',
    component: AboutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/Home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
