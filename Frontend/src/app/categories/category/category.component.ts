import { Component, OnInit, Input } from '@angular/core';
import { Category } from './category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @Input() category: Category

  constructor() { }

  ngOnInit(): void {
  }

}
