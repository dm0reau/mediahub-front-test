export interface AuthTokenRepository {
  add(token: string): void;
  hasToken(): boolean;
  remove(): void;
}
