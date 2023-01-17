import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthGateway } from '../ports/auth.gateway';
import { AuthTokenRepository } from '../ports/auth-token.repository';

const VALID_USERNAME = 'Canal-plus';
const VALID_PASSWORD = 'Super-secret';
const VALID_TOKEN = 'validToken';

export class InMemoryAuthGateway implements AuthGateway {
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly authTokenRepository: AuthTokenRepository) {
    this.isLoggedIn$.next(this.authTokenRepository.hasToken());
  }

  validate(username: string, password: string): Observable<boolean> {
    if (this.isValidCredentials(username, password)) {
      this.authTokenRepository.add(VALID_TOKEN);
      this.isLoggedIn$.next(true);
      return of(true);
    }

    return of(false);
  }

  invalidate(): Observable<null> {
    this.authTokenRepository.remove();
    this.isLoggedIn$.next(false);
    return of(null);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  private isValidCredentials(username: string, password: string): boolean {
    return username === VALID_USERNAME && password === VALID_PASSWORD;
  }
}
