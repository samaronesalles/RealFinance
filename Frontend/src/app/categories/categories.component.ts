import { Component, OnInit } from '@angular/core';
import { Category } from './category/category.model';
import {CategoryService} from './category.service'
import { LoginService } from '../login.service';
import { Totalizer } from '../categories/totalizer.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private loggedService: LoginService, private router: Router, private categoryService: CategoryService) { }

  categories: Category[]
  
   monthNow:String

   totalizer: Totalizer;

  ngOnInit() {
    this.isLogged();
    this.getMonthNow();
    this.loadTotalizerCategories();
    this.categoryService.listCategories().then(categories=> this.categories = categories)
  }


  async getMonthNow(){
    const monthNames = ["Janeiro", "Fevereiro", "Março", "April", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
    var now = new Date;
    this.monthNow = monthNames[now.getMonth()]
  }

  async isLogged() {
    try {
      await this.loggedService.isLogged();
    } catch (err) {
      this.router.navigate(['/sign-in']);
    }
  }


  async loadTotalizerCategories(){
    try{
      let now = new Date;
     const totalCategories = await this.categoryService.totalizerAllCategories(now.getMonth()+1);
     this.totalizer = totalCategories;
    }catch{

    }
  }

}
