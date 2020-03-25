import { Component, OnInit } from '@angular/core';

import {Category} from '../category/category.model'
import { CategoryService } from '../category.service';


import { from } from 'rxjs';
@Component({
  selector: 'app-register-category',
  templateUrl: './register-category.component.html',
  styleUrls: ['./register-category.component.scss']
})
export class RegisterCategoryComponent implements OnInit {
  categoryTypes: any[]
  constructor( private service: CategoryService) { }

  messageReturn = undefined;

  ngOnInit(): void {
    this.categoryTypes = this.service.getOptionsRadio();
  }


   
  async createNewCategory(category:Category){
    try{
      console.log(category)
      const response = this.service.createNewCategory(category);
      this.messageReturn="Cadastro efetuado com sucesso!"

    }catch(err){
      this.messageReturn = err.response.data.error;
    }
   
}

}
