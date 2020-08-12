import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';
import {AdminhomeRoutingModule} from './adminhome-routing.module';


@NgModule({
  declarations: [ProfileComponent, DashboardComponent, UsersComponent, HomeComponent],
  imports: [
    CommonModule,
    AdminhomeRoutingModule
  ]
})
export class AdminhomeModule { }
