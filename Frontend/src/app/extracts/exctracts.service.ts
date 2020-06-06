import {Injectable} from '@angular/core'
import {API} from '../app.api'
import { async } from '@angular/core/testing';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })

  export class ExtractsService{

    constructor( ){}

    async listExtracts(){
        const response = await API.post('/lancamentos/');
        return response.data;
    }

    async listExtractsCategory(id){
      const response = await API.post('/lancamentos/',{categoria_id:id});
      return response.data;
     }


     async filters(filters){
      const response = await API.post('/lancamentos/', filters );
      return response.data;
    }
    
  }
     

  

  
