import { Component, OnInit } from '@angular/core';
import {Extract} from './extract.model'
import {ExtractsService} from './exctracts.service'
@Component({
  selector: 'app-extracts',
  templateUrl: './extracts.component.html',
  styleUrls: ['./extracts.component.scss']
})
export class ExtractsComponent implements OnInit {
 
  extracts: Extract[] //List extracts
  messageError = undefined;
  constructor(private extractsService: ExtractsService) { }



  ngOnInit(){
    this.loadExtracts()
  }

async loadExtracts(){
  try{
   const response = await this.extractsService.listExtracts().then(extracts => this.extracts = extracts);
  }catch(err){ 
    this.messageError = err.response.data.error;
  }
}


onFilter(filter){
  console.log(filter.value);
}


}
