import { Injectable } from '@angular/core';
import { API } from '../app.api';
import {Category} from './category.model'

@Injectable({
    providedIn: 'root'
  })

  export class CategoryService{

    constructor() { }

    async createNewCategory(category:Category){
        const response = await API.post('/users',{
          name: category.name,
          description : category.description,
          cor : category.cor,
          tipo : category.tipo
        });

        return response.data;
    }
  }


