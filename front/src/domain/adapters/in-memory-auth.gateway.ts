import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthGateway } from '../ports/auth.gateway';

const VALID_USERNAME = 'Canal-plus';
const VALID_PASSWORD = 'Super-secret';
const VALID_TOKEN = 'validToken';

export class InMemoryAuthGateway implements AuthGateway {
  private token = '';
  private isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  validate(username: string, password: string): Observable<boolean> {
    if (this.isValidCredentials(username, password)) {
      this.addToken(VALID_TOKEN);
      this.isLoggedIn$.next(true);
      return of(true);
    }

    return of(false);
  }

  invalidate(): Observable<null> {
    this.removeToken();
    this.isLoggedIn$.next(false);
    return of(null);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  private isValidCredentials(username: string, password: string): boolean {
    return username === VALID_USERNAME && password === VALID_PASSWORD;
  }

  private addToken(token: string) {
    this.token = token;
  }

  private removeToken() {
    this.token = '';
  }

  private hasToken() {
    return this.token.length > 0;
  }
}
