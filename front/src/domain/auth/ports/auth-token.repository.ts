export interface AuthTokenRepository {
  add(token: string): void;
  get(): string | null;
  hasToken(): boolean;
  remove(): void;
}
