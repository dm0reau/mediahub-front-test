import { AuthTokenRepository } from '../ports/auth-token.repository';

export class InMemoryAuthTokenRepository implements AuthTokenRepository {
  private token = '';

  add(token: string): void {
    this.token = token;
  }

  get(): string | null {
    return this.hasToken() ? this.token : null;
  }

  hasToken(): boolean {
    return this.token !== '';
  }

  remove(): void {
    this.token = '';
  }
}
