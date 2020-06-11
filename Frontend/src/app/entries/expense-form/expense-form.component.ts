import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/categories/category.service';
import { EntryService } from '../entry.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ExtractsService } from 'src/app/extracts/exctracts.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss']
})

export class ExpenseFormComponent implements OnInit {
  
  expenseCategories = []
  errorMessage = undefined;
  entryForm: FormGroup;
  idExpense = undefined;
  isEdit = false;
  category;
  messageEditinGost;
  currentExtract;

  constructor(private categoryService: CategoryService, private entryService: EntryService, private router: Router,
    private activatedRoute: ActivatedRoute, private loginService: LoginService, private fb: FormBuilder, private extractsService: ExtractsService) { }

  ngOnInit(): void {
    this.isLogged();
    this.getExpenseCategories();
    this.activatedRoute.params.subscribe((objeto: any) => {
      this.idExpense = objeto.id;

    })
    this.formBuild();
  }

  formBuild() {
    if (this.idExpense) {
      this.isEdit = true;
      this.currentExtract = this.extractsService.currentExtract;
      this.extractsService.currentExtract = undefined;
      this.category = this.currentExtract.categoria;
      this.entryForm = this.fb.group({
        descricao: this.currentExtract.descricao,
        valor: this.currentExtract.valor,
        categoria_id: this.currentExtract.categoria.categoria_id,
        ja_pago: this.currentExtract.ja_pago,
        data_vencimento: this.currentExtract.vencimento,
      });
      if (this.idExpense == '-1') {
        this.entryForm.controls['descricao'].disable();
        this.entryForm.controls['valor'].disable();
        this.entryForm.controls['categoria_id'].disable();
        this.entryForm.controls['data_vencimento'].disable();
        this.messageEditinGost = "Você está editando um lançamento fixo! Por isso, só poderá alterar o estado de pagamento."
      }
    }
    else {
      this.entryForm = this.fb.group({
        descricao: null,
        valor: null,
        categoria_id: null,
        ja_pago: null,
        data_vencimento: null,
        lancamento_fixo: null,
      });
    }

  }

  async getExpenseCategories() {
    const response = await this.categoryService.listCategories();

    response.forEach(cat => {
      if (cat.receita_ou_despesa == 0) {
        this.expenseCategories.push(cat)
      }
    });
  }

  async onSubmit(entry) {
    if (this.idExpense == '-1') {
      return this.checkisGost(entry);
    }
    if (!entry.ja_pago) {
      entry.ja_pago = false;
    }
    if (!entry.lancamento_fixo) {
      entry.lancamento_fixo = false;
    }
    // Transforma a data para o formato que o backend espera receber
    var date = entry.data_vencimento.split('-');
    entry.data_vencimento = `${date[2]}/${date[1]}/${date[0]}`;
    if (!this.isEdit) {
      this.createEntry(entry);
    } else {
      this.updateEntry(entry);
    }
  }

  checkisGost(entry) {
    // if (!entry.ja_pago) {
    //   entry.ja_pago = false;
    // }
    // let ja_pago = entry.ja_pago
    // entry = {
    //   descricao: this.currentExtract.descricao,
    //   valor: this.currentExtract.valor,
    //   categoria_id: this.currentExtract.categoria.categoria_id,
    //   data_vencimento: this.currentExtract.vencimento,
    //   ja_pago: ja_pago,
    //   lancamento_origem: this.currentExtract.lancamento_origem
    // }
    // this.updateEntry(entry)
  }


  async createEntry(entry) {
    try {
      await this.entryService.createEntry(entry);
      this.router.navigate(['/extracts']);
    } catch (err) {
      this.errorMessage = err.response.data.error;
    }
  }

  async updateEntry(entry) {
    try {
      await this.entryService.updateEntry(entry, this.idExpense);
      this.router.navigate(['/extracts']);
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
