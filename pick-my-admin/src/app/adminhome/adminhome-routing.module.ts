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
    component: DashboardComponent,
    children: [{
        path: '',
        canActivate: [AuthGuard],
        redirectTo: 'home', pathMatch: 'full'
      },
      {
          path:'home',
          canActivate: [AuthGuard],
          component:HomeComponent
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        component:UsersComponent ,
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
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
