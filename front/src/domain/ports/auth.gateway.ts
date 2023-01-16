import { Observable } from 'rxjs';

export interface AuthGateway {
  validate(userName: string, password: string): Observable<boolean>;

  isLoggedIn(): boolean;
}
