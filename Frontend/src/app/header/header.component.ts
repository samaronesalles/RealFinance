import { Component, OnInit, ViewChild } from '@angular/core';
import { LoggedService } from '../logged/logged.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(private loggedService: LoggedService, private router: Router) { }

  welcomeMessage: string;

  ngOnInit(): void {
    this.isLogged();
  }

  async isLogged() {
    try {
      const user = await this.loggedService.isLogged();
      this.welcomeMessage = 'Olá, ' + user.nome;
      return true;
    } catch (err) {
      return false;
    }
  }

}
