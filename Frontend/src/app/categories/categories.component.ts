import { Component, OnInit } from '@angular/core';
import { Category } from './category/category.model';
import { API } from '../app.api';
import {CategoryService} from './category.service'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  categories: Category[]

  ngOnInit() {
    this.categoryService.listCategories().then(categories=> this.categories = categories)
  }

}
