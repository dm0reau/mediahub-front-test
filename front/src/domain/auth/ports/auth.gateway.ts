import { Observable } from 'rxjs';

export interface AuthGateway {
  validate(userName: string, password: string): Observable<boolean>;

  invalidate(): Observable<null>;

  isLoggedIn(): Observable<boolean>;
}
