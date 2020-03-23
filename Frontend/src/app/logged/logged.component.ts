import { Component, OnInit } from '@angular/core';
import { LoggedService } from './logged.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
export class LoggedComponent implements OnInit {

  constructor(private loggedService: LoggedService, private router: Router) { }

  user;

  ngOnInit(): void {
    this.isLogged();
  }

  async isLogged() {
    try {
      const user = await this.loggedService.isLogged();
      this.user = user;
    } catch (err) {
      this.router.navigate(['/']);
    }
  }
}
