import { Injectable } from '@angular/core';
import { API } from '../app.api';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor() { }

  async createEntry(expense) {
    const response = await API.post('/novoLcto', expense);
    return response.data;
  }

  async updateEntry(expense, id) {
    const response = await API.put('/lancamento/' + id, expense);
    return response.data;
  }

}
