import { AuthGateway } from '../ports/auth.gateway';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { AuthTokenRepository } from '../ports/auth-token.repository';
import { MhHttpClient } from '../../../infra/ports/mh-http-client';

export class HttpAuthGateway implements AuthGateway {
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly authTokenRepository: AuthTokenRepository,
    private readonly mhHttpClient: MhHttpClient
  ) {
    this.isLoggedIn$.next(this.authTokenRepository.hasToken());
  }

  invalidate(): Observable<null> {
    return of(null).pipe(
      tap(() => {
        this.authTokenRepository.remove();
        this.isLoggedIn$.next(false);
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
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
        }),
        tap(() => this.isLoggedIn$.next(true)),
        catchError(() => of(false))
      );
  }
}
