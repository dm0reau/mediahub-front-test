import { Observable, of } from 'rxjs';
import { AuthGateway } from '../ports/auth.gateway';

const VALID_USERNAME = 'Canal-plus';
const VALID_PASSWORD = 'Super-secret';
const VALID_TOKEN = 'validToken';
const LOCAL_STORAGE_KEY = 'authToken';

export class InMemoryAuthGateway implements AuthGateway {
  validate(username: string, password: string): Observable<boolean> {
    if (this.isValidCredentials(username, password)) {
      localStorage.setItem(LOCAL_STORAGE_KEY, VALID_TOKEN);
      return of(true);
    }

    return of(false);
  }

  invalidate(): Observable<null> {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return of(null);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(LOCAL_STORAGE_KEY) !== null;
  }

  private isValidCredentials(username: string, password: string): boolean {
    return username === VALID_USERNAME && password === VALID_PASSWORD;
  }
}
