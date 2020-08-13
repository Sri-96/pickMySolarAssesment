import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent,DialogOverviewExampleDialog } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';
import {AdminhomeRoutingModule} from './adminhome-routing.module';
import { AngularMaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ProfileComponent, DashboardComponent, UsersComponent, HomeComponent,DialogOverviewExampleDialog],
  imports: [
    CommonModule,
    AdminhomeRoutingModule,
    AngularMaterialModule,
    FormsModule
  ],
  entryComponents: [DialogOverviewExampleDialog]
})
export class AdminhomeModule { }
