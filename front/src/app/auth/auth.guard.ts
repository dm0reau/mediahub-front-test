import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    if (this.isLoggedIn()) return true;
    await this.router.navigate(['/auth/login']);
    return false;
  }

  isLoggedIn(): boolean {
    const authToken = localStorage.getItem('authToken');
    return authToken !== null && authToken.length > 0;
  }
}
