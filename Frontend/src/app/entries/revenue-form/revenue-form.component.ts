import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/categories/category.service';
import { EntryService } from '../entry.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-revenue-form',
  templateUrl: './revenue-form.component.html',
  styleUrls: ['./revenue-form.component.scss']
})
export class RevenueFormComponent implements OnInit {

  revenueCategories = []
  errorMessage = undefined;

  constructor(private categoryService: CategoryService, private entryService: EntryService, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.isLogged();
    this.getrevenueCategories();
  }

  async getrevenueCategories() {
    const response = await this.categoryService.listCategories();

    response.forEach(cat => {
      if (cat.receita_ou_despesa == 1) {
        this.revenueCategories.push(cat)
      }
    });
  }

  async createEntry(entry) {
    if (!entry.lancamento_fixo) {
      entry.lancamento_fixo = false;
    }
    // Transforma a data para o formato que o backend espera receber
    var date = entry.data_vencimento.split('-');
    entry.data_vencimento = `${date[1]}/${date[2]}/${date[0]}`;
    try {
      await this.entryService.createEntry(entry);
      this.router.navigate(['/nova_pagina']);
    } catch (err) {
      this.errorMessage = err.response.data.error;
    }
  }

  async isLogged() {
    try {
      await this.loginService.isLogged();
    } catch (err) {
      this.router.navigate(['/sign-in']);
    }
  }

}
