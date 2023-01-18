import { Observable } from 'rxjs';
import { AuthTokenRepository } from '../../domain/auth/ports/auth-token.repository';

export abstract class MediaHubHttpClient {
  protected constructor(
    private readonly baseUrl: string,
    protected readonly authTokenRepository: AuthTokenRepository
  ) {}

  abstract get<T>(uri: string): Observable<T>;

  abstract post<T>(uri: string, body: unknown): Observable<T>;

  protected abstract getHeaders(): unknown;

  protected getRequestUrl(uri: string) {
    return this.baseUrl + '/' + uri;
  }
}
