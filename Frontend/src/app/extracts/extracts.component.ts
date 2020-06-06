import { Component, OnInit, Input} from '@angular/core';
import {Extract} from './extract.model'
import {ExtractsService} from './exctracts.service'
import { ActivatedRoute } from '@angular/router';
import {CategoryService} from '../categories/category.service';


@Component({
  selector: 'app-extracts',
  templateUrl: './extracts.component.html',
  styleUrls: ['./extracts.component.scss']
})
export class ExtractsComponent implements OnInit {
  
  idCategory = null;
  categories = []
  extracts: Extract[] //List extracts
  messageError = undefined;
  constructor(private extractsService: ExtractsService,private categoryService: CategoryService,  private route:ActivatedRoute) { }



  ngOnInit(){
    
    this.route.params.subscribe((objeto:any) => {
      this.idCategory = objeto.id;
    })
    this.loadExtracts(this.idCategory);
    this.loadCategoriesFilter();
  }

async loadExtractsAll(){
  try{
   const response = await this.extractsService.listExtracts().then(extracts => this.extracts = extracts);
  }catch(err){ 
    this.messageError = err.response.data.error;
  }
}

async loadExtractsCategory(id : number){
  try{
    const response = await this.extractsService.listExtractsCategory(id).then(extracts => this.extracts = extracts);
   }catch(err){ 
     this.messageError = err.response.data.error;
   }
}


async loadExtracts(id){
  
  if(id==null){
    this.loadExtractsAll()
  }else{
    this.loadExtractsCategory(id)
  }
}


async loadCategoriesFilter(){
  this.categoryService.listCategories().then(categories=> this.categories = categories)
}


async onFilter(form){
  try{
    if(form.vencimento_de){
      var dataInicio = form.vencimento_de.split('-');
      form.vencimento_de = `${dataInicio[2]}/${dataInicio[1]}/${dataInicio[0]}`;
    }

    if( form.vencimento_ate){
      var dataFim = form.vencimento_ate.split('-');
      form.vencimento_ate = `${dataFim[2]}/${dataFim[1]}/${dataFim[0]}`;
    }
    

    const filters = {
      categoria_id: form.categoria_id,
      vencimento_de:form.vencimento_de,
      vencimento_ate: form.vencimento_ate
    }
  const response = await this.extractsService.filters(filters).then(extracts => this.extracts = extracts)

  }catch(err){ 
    this.messageError = err.response.data.error;
  }
}




}
