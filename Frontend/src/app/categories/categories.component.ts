import { Component, OnInit } from '@angular/core';
import { Category } from './category/category.model';
import {CategoryService} from './category.service'
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private loggedService: LoginService, private router: Router, private categoryService: CategoryService) { }

  categories: Category[]

  ngOnInit() {
    this.isLogged();
    this.categoryService.listCategories().then(categories=> this.categories = categories)
  }

  async isLogged() {
    try {
      await this.loggedService.isLogged();
    } catch (err) {
      this.router.navigate(['/sign-in']);
    }
  }

}
