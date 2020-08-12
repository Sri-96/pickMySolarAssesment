import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent} from './register/register.component';
import { Routes, RouterModule } from '@angular/router';

const registerRoutes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    
  },
  
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(registerRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AdminRegisterRoutingModule { }
