import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import {UsersComponent} from './components/users/users.component'
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component'
import { AuthGuard } from '../guards/auth.guard';
const adminRoutes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [{
        path: '',
        redirectTo: 'home', pathMatch: 'full'
      },
      {
          path:'home',
          component:HomeComponent
      },
      {
        path: 'users',
        component:UsersComponent ,
      },
      {
        path: 'profile',
        component: ProfileComponent
      },]
  },
  
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AdminhomeRoutingModule { }
