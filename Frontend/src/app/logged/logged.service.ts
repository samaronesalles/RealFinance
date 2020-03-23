import { Injectable } from '@angular/core';
import { API } from '../app.api';

@Injectable({
  providedIn: 'root'
})
export class LoggedService {

  constructor() { }

  async isLogged() {
    const response = await API.get('/auth');
    return response.data;
  }

}
