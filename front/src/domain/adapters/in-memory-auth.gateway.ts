import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthGateway } from '../ports/auth.gateway';

const VALID_USERNAME = 'Canal-plus';
const VALID_PASSWORD = 'Super-secret';
const VALID_TOKEN = 'validToken';
const LOCAL_STORAGE_KEY = 'authToken';

export class InMemoryAuthGateway implements AuthGateway {
  private isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  validate(username: string, password: string): Observable<boolean> {
    if (this.isValidCredentials(username, password)) {
      localStorage.setItem(LOCAL_STORAGE_KEY, VALID_TOKEN);
      this.isLoggedIn$.next(true);
      return of(true);
    }

    return of(false);
  }

  invalidate(): Observable<null> {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    this.isLoggedIn$.next(false);
    return of(null);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  private isValidCredentials(username: string, password: string): boolean {
    return username === VALID_USERNAME && password === VALID_PASSWORD;
  }

  private hasToken() {
    return localStorage.getItem(LOCAL_STORAGE_KEY) !== null;
  }
}
