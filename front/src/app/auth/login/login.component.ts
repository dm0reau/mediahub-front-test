import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  hasInvalidCredentials = false;
  submitActionDisabled = false;

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {}

  async submit() {
    this.submitActionDisabled = true;

    if (await this.loginService.validate(this.username, this.password)) {
      await this.router.navigate(['/movies']);
      return;
    }

    this.submitActionDisabled = false;
    this.hasInvalidCredentials = true;
  }
}
