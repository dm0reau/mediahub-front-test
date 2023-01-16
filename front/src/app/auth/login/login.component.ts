import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGateway } from '../../../domain/ports/auth.gateway';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  hasInvalidCredentials = false;
  submitActionDisabled = false;

  constructor(
    @Inject('AuthGateway')
    private readonly authGateway: AuthGateway,
    private readonly router: Router
  ) {}

  async submit() {
    this.submitActionDisabled = true;

    if (
      await lastValueFrom(
        this.authGateway.validate(this.username, this.password),
        { defaultValue: false }
      )
    ) {
      await this.router.navigate(['/movies']);
      return;
    }

    this.submitActionDisabled = false;
    this.hasInvalidCredentials = true;
  }
}
