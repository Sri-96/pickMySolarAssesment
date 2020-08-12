import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import {AdminRegisterRoutingModule} from './adminregister-routing.module'


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRegisterRoutingModule
  ]
})
export class AdminRegisterModule { }
