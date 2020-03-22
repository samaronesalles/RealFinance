import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { HttpModule } from '@angular/http';
import {FormsModule} from '@angular/forms';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
