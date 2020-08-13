import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AdminRegisterModule} from './adminregister/adminregister.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AdminloginModule} from './adminlogin/adminlogin.module';
import { ReactiveFormsModule } from '@angular/forms';
import {AdminhomeModule} from './adminhome/adminhome.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AdminloginModule,
    AdminhomeModule,
    ReactiveFormsModule,
    AdminRegisterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
