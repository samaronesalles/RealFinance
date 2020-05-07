import { Component, OnInit, Input } from '@angular/core';
import { Category } from './category.model';
import {CategoryService} from '../category.service'
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @Input() categories: Category[]
  messageReturn = undefined;

  constructor(private service: CategoryService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
  }


  async delete(id: number){
    try{
      const response = await this.service.deteleCategory(id);
    }catch(err){
      this.messageReturn = err.response.data.error;
    }
  }


  load() {
    location.reload()
  }

  onEdit(id){
    this.router.navigate(['editar',id]);
  }

}
