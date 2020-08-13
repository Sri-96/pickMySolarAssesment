import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminloginModule } from './adminlogin/adminlogin.module';
import { AdminhomeModule } from './adminhome/adminhome.module';
import { AdminRegisterModule } from './adminregister/adminregister.module'
import { PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./adminlogin/adminlogin.module').then(m => m.AdminloginModule)
  },
  {
    path: 'login/register',
    loadChildren: () => import('./adminregister/adminregister.module').then(m => m.AdminRegisterModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./adminhome/adminhome.module').then(m => m.AdminhomeModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
