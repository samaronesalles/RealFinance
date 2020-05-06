import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CurrencyMaskModule } from "ng2-currency-mask";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './categories/category/category.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { ModalComponent } from './shared/modal/modal.component';
import { EntriesComponent } from './entries/entries.component';
import { ExpenseFormComponent } from './entries/expense-form/expense-form.component';
import { RevenueFormComponent } from './entries/revenue-form/revenue-form.component';
import { ExtractsComponent } from './extracts/extracts.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    SignUpComponent,
    HeaderComponent,
    HomeComponent,
    CategoriesComponent,
    CategoryComponent,
    CategoryFormComponent,
    ModalComponent,
    EntriesComponent,
    ExpenseFormComponent,
    RevenueFormComponent,
    ExtractsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    CurrencyMaskModule,
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
