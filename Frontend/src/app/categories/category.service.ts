import { Injectable } from '@angular/core';
import { API } from '../app.api';
import {Category} from './category/category.model'
import { of } from 'rxjs';


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

    async deteleCategory(id: number){
      const response = await API.delete('/cats/'+id);
      return response.data;
    }


    async loadByID(id:number){
      const response = await API.get('/cats/'+id);
      return response.data;
    }

    async udpate(category: Category){
      const response = await API.put('/cats/'+ category.id,{
        nome: category.nome,
        descricao: category.descricao,
        cor: category.cor,
        tipo:category.tipo
      });

      return response.data;
    }

    save(category){
      if(category.id){
        return this.udpate(category);
      }
      return this.createNewCategory(category);
      
    }

  }


