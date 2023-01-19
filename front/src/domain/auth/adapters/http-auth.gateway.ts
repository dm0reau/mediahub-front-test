import { AuthGateway } from '../ports/auth.gateway';
import { map, Observable, of, tap } from 'rxjs';
import { AuthTokenRepository } from '../ports/auth-token.repository';
import { MhHttpClient } from '../../../infra/ports/mh-http-client';

export class HttpAuthGateway implements AuthGateway {
  constructor(
    private readonly authTokenRepository: AuthTokenRepository,
    private readonly mhHttpClient: MhHttpClient
  ) {}

  invalidate(): Observable<null> {
    return of(null).pipe(
      tap(() => {
        this.authTokenRepository.remove();
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return of(this.authTokenRepository.hasToken());
  }

  validate(userName: string, password: string): Observable<boolean> {
    return this.mhHttpClient
      .post<{
        token: string;
      }>('auth/login', {
        username: userName,
        password,
      })
      .pipe(
        map((response) => {
          if (response.token) {
            this.authTokenRepository.add(response.token);
            return true;
          }
          return false;
        })
      );
  }
}
