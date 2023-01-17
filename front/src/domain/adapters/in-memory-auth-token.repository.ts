import { AuthTokenRepository } from '../ports/auth-token.repository';

export class InMemoryAuthTokenRepository implements AuthTokenRepository {
  private token = '';

  add(token: string): void {
    this.token = token;
  }

  hasToken(): boolean {
    return this.token !== '';
  }

  remove(): void {
    this.token = '';
  }
}
