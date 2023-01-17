import { AuthTokenRepository } from '../ports/auth-token.repository';

const LOCAL_STORAGE_KEY = 'authToken';

export class LocalStorageAuthTokenRepository implements AuthTokenRepository {
  add(token: string): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, token);
  }

  hasToken(): boolean {
    const item = localStorage.getItem(LOCAL_STORAGE_KEY);
    return item !== null && item.length > 0;
  }

  remove(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
}
