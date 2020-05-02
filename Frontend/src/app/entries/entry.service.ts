import { Injectable } from '@angular/core';
import { API } from '../app.api';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor() { }

  async createEntryExpense(expense) {
    const response = await API.post('/novoLcto', {
      descricao: expense.descricao,
      valor: expense.valor,
      data_vencimento: expense.data_vencimento,
      lancamento_fixo: expense.lancamento_fixo,
      categoria_id: expense.categoria_id
    });
    return response.data;
  }

  async createEntryRevenue(expense) {
    const response = await API.post('/novoLcto', {
      descricao: expense.descricao,
      valor: expense.valor,
      data_pagamento: expense.data_pagamento,
      lancamento_fixo: expense.lancamento_fixo,
      categoria_id: expense.categoria_id
    });
    return response.data;
  }

}
