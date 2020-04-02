import { Component, OnInit } from '@angular/core';
import { LoggedService } from './logged/logged.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private loggedService: LoggedService, private router: Router) { }

  userLogged: string = undefined;

  ngOnInit(): void {
    this.isLogged();
  }

  async isLogged() {
    try {
      const user = await this.loggedService.isLogged();
      this.userLogged = user;
    } catch (err) {
      this.userLogged = undefined;
    }
  }

}

