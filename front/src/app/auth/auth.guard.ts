import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthGateway } from '../../domain/ports/auth.gateway';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AuthGateway')
    private readonly authGateway: AuthGateway,
    private readonly router: Router
  ) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    if (this.authGateway.isLoggedIn()) return true;
    await this.router.navigate(['/auth/login']);
    return false;
  }
}
