import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/categories/category.service';
import { EntryService } from '../entry.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-revenue-form',
  templateUrl: './revenue-form.component.html',
  styleUrls: ['./revenue-form.component.scss']
})
export class RevenueFormComponent implements OnInit {

  revenueCategories = []
  errorMessage = undefined;

  constructor(private categoryService: CategoryService, private entryService: EntryService, private router: Router) { }

  ngOnInit(): void {
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
    try {
      await this.entryService.createEntryRevenue(entry);
      this.router.navigate(['/']);
    } catch (err) {
      this.errorMessage = err.response.data.error;
    }
  }

}
