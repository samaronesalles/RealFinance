import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private loginservice: LoginService, private router: Router) { }

  errorMessage = undefined;

  ngOnInit(): void {

  }

  async autenticateUser(user: User) {
    try {
      const response = await this.loginservice.autenticateUser(user);
      this.router.navigate(['/categories']);
    } catch (err) {
      this.errorMessage = err.response.data.error;
    }
  }

}
