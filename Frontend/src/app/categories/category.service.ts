import { Injectable } from '@angular/core';
import { API } from '../app.api';
import {Category} from './category/category.model'


@Injectable({
    providedIn: 'root'
  })

  export class CategoryService{

    constructor() { }

    async createNewCategory(category:Category){
  
        const response = await API.post('/cats',{
          nome: category.nome,
          descricao : category.descricao,
          cor : category.cor,
          tipo: category.tipo
        });

        return response.data;
    }


    getOptionsRadio(){
      return [
        {valor:'receita', desc:'Receita'},
        {valor:'despesa', desc:'Despesa'}
      ]
    }


    async  listCategories(){
      const response = await API.get('/cats');
  
      return response.data;
    }


  }


