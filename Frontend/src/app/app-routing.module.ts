import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {CategoriesComponent} from './categories/categories.component'
import { LoggedComponent } from './logged/logged.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { CategoryResolverGuard } from './categories/guards/category-resolver.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  {path: 'logged', component: LoggedComponent},
  {path: 'categories', component: CategoriesComponent},
  {path:'novo', component: CategoryFormComponent, resolve:{category: CategoryResolverGuard}},
  {path:'editar/:id', component: CategoryFormComponent, resolve:{category: CategoryResolverGuard}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
