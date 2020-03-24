import { Component, OnInit } from '@angular/core';

import {Category} from '../category.model'
import { CategoryService } from '../category.service';


@Component({
  selector: 'app-register-category',
  templateUrl: './register-category.component.html',
  styleUrls: ['./register-category.component.scss']
})
export class RegisterCategoryComponent implements OnInit {

service:  CategoryService
  // categoryOptions: RadioOption[] = [
  //   {label: 'Receita', value:'receita'},
  //   {label: 'Despesa', value:'despesa'},
  // ]
  constructor() { }


  errorMessage = undefined;


  ngOnInit(): void {
  }

  async createNewCategory(category:Category){
    try{
      const response = await  this.service.createNewCategory(category);
    }catch(err){
      this.errorMessage = err.response.data.error;
    }
   
}

}
