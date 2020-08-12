import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';

const LoginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    
  },
  
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AdminloginRoutingModule { }
