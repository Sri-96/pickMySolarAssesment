import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import {AdminRegisterRoutingModule} from './adminregister-routing.module';
import { AngularMaterialModule } from '../material.module';



@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRegisterRoutingModule,
    AngularMaterialModule
  ]
})
export class AdminRegisterModule { }
