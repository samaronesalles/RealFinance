import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private loginservice: LoginService, private router: Router) { }

  errorMessage = undefined;

  ngOnInit(): void {
  }

  async createNew(user) {

    if (user.passwordConfirm !== user.password) {
      this.errorMessage = 'As senhas não coincidem';
      return;
    }
    try {
      const response = await this.loginservice.createNew(user);
      this.router.navigate(['/']);
    } catch (err) {
      this.errorMessage = err.response.data.error;
    }
  }

}
