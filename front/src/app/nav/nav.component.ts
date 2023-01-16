import { Component, Inject } from '@angular/core';
import { AuthGateway } from '../../domain/ports/auth.gateway';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  isLoggedIn = false;

  constructor(
    @Inject('AuthGateway') private readonly authGateway: AuthGateway,
    private readonly router: Router
  ) {}

  async disconnect() {
    await lastValueFrom(this.authGateway.invalidate());
    await this.router.navigateByUrl('/auth/login');
    this.isLoggedIn = false;
  }
}
