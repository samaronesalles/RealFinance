import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../category.service'
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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



  constructor(private fb: FormBuilder, private service: CategoryService, private location: Location, private route: ActivatedRoute) { }

  
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



  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {

      let msgSucess = 'Curso criado com sucesso'
      let msgError = 'Erro ao cadastrar nova categoria, favor realizar novamente!'
      
      if(this.form.value.id){
        msgSucess='Sua categoria foi alterada com sucesso!'
        msgError=' Erro ao atualizar curso, tente novamente.';
      }
      
         this.service.save(this.form.value).then( 
         sucess => {this.messageReturn = msgSucess}, 
         error => { this.messageReturn = error})
    }
  }

  onCancel() {
    console.log("passei por aqui")
    this.submitted = false;
    this.form.reset();
  }


  hasError(field: string) {
    return this.form.get(field).errors;
  }

}
