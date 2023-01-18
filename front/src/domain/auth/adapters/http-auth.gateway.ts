import { AuthGateway } from '../ports/auth.gateway';
import { map, Observable, of, tap } from 'rxjs';
import { AuthTokenRepository } from '../ports/auth-token.repository';
import { MediaHubHttpClient } from '../../../infra/ports/media-hub-http-client';

export class HttpAuthGateway implements AuthGateway {
  constructor(
    private readonly authTokenRepository: AuthTokenRepository,
    private readonly mediaHubHttpClient: MediaHubHttpClient
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
    return this.mediaHubHttpClient
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
