import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/categories/category.service';
import { EntryService } from '../entry.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss']
})
export class ExpenseFormComponent implements OnInit {

  expenseCategories = []
  errorMessage = undefined;

  constructor(private categoryService: CategoryService, private entryService: EntryService, private router: Router) { }

  ngOnInit(): void {
    this.getExpenseCategories();
  }

  async getExpenseCategories() {
    const response = await this.categoryService.listCategories();

    response.forEach(cat => {
      if (cat.receita_ou_despesa == 0) {
        this.expenseCategories.push(cat)
      }
    });
  }

  async createEntry(entry) {
    console.log(entry)
    if (!entry.ja_pago) {
      entry.ja_pago = false;
    }
    if (!entry.lancamento_fixo) {
      entry.lancamento_fixo = false;
    }
    try {
      await this.entryService.createEntryExpense(entry);
      this.router.navigate(['/']);
    } catch (err) {
      this.errorMessage = err.response.data.error;
    }
  }

}
