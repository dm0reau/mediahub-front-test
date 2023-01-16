import { Component, Inject, OnInit } from '@angular/core';
import { AuthGateway } from '../../domain/ports/auth.gateway';
import { Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  isLoggedIn$ = new Observable<boolean>();

  constructor(
    @Inject('AuthGateway') private readonly authGateway: AuthGateway,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authGateway.isLoggedIn();
  }

  async disconnect() {
    await lastValueFrom(this.authGateway.invalidate());
    await this.router.navigateByUrl('/auth/login');
  }
}
