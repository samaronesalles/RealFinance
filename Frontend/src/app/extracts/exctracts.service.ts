import {Injectable} from '@angular/core'
import {API} from '../app.api'

@Injectable({
    providedIn: 'root'
  })

  export class ExtractsService{

    constructor( ){}

    async listExtracts(){
        const response = await API.get('/lancamentos');
        return response.data;
    }
  }