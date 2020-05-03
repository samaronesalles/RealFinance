import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component'
import { LoggedComponent } from './logged/logged.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { CategoryResolverGuard } from './categories/guards/category-resolver.guard';
import { ExpenseFormComponent } from './entries/expense-form/expense-form.component';
import { RevenueFormComponent } from './entries/revenue-form/revenue-form.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'logged', component: LoggedComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'novo', component: CategoryFormComponent, resolve: { category: CategoryResolverGuard } },
  { path: 'editar/:id', component: CategoryFormComponent, resolve: { category: CategoryResolverGuard } },
  { path: 'entry-expense', component: ExpenseFormComponent },
  { path: 'entry-revenue', component: RevenueFormComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
