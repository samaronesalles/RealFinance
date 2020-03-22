import { Injectable } from '@angular/core';
import { User } from './user.model';
import { API } from '../app.api';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  async createNew(user: User) {
    const response = await API.post('/users', {
      email: user.email,
      senha: user.password,
      nome: user.name
    });
    return response.data;
  }

  async autenticateUser(user: User) {
      const response = await API.post('/userLogin', {
        email: user.email,
        senha: user.password
      });
      return response.data;
  }

}
