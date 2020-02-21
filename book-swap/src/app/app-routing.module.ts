import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: 'Home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {
    path: 'Users',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { title: 'Users' }
  },
  {
    path: 'About',
    component: AboutComponent,
    data: { title: 'About' }
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
