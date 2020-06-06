import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../category.service'
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../category/category.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';




@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {



  constructor(private fb: FormBuilder, private service: CategoryService, private location: Location, private route: ActivatedRoute,  private router: Router) { }

  
  form: FormGroup;
  submitted = false;
  messageReturn = undefined;
  categoryTypes: any[]

  ngOnInit() {
    
    this.categoryTypes = this.service.getOptionsRadio();
         
    const category = this.route.snapshot.data['category'];
   
    this.form = this.fb.group({
      id: category.id,
      nome: [category.nome, [Validators.required]],
      descricao: [category.descricao],
      cor: [category.cor,[Validators.required]],
      tipo: [category.receita_ou_despesa,[Validators.required]],

    });
  }



 async onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      try {
        const response = await this.service.save(this.form.value);
        this.router.navigate(['/categories']);
      } catch (err) {
        this.messageReturn = err.response.data.error;
      }
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }


  hasError(field: string) {
    return this.form.get(field).errors;
  }

}
