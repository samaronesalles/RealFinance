import { Component, OnInit, Input, } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  @Input() user;

  ngOnInit(): void {
    console.log("user tal:" + this.user);
  }

}
