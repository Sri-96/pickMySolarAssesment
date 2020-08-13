import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AdminloginRoutingModule } from './adminlogin-routing.module';
import { AngularMaterialModule } from '../material.module';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminloginRoutingModule,
    AngularMaterialModule
  ]
})
export class AdminloginModule { }
