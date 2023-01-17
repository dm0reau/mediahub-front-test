import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthGateway } from '../../domain/auth/ports/auth.gateway';
import { firstValueFrom } from 'rxjs';

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
    const isLoggedIn = await firstValueFrom(this.authGateway.isLoggedIn());
    if (isLoggedIn) {
      return true;
    }

    await this.router.navigate(['/auth/login']);
    return false;
  }
}
