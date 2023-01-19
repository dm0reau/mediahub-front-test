import { MhHttpClient } from '../ports/mh-http-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageAuthTokenRepository } from '../../domain/auth/adapters/local-storage-auth-token.repository';
import { Observable } from 'rxjs';

// Usually it must be in an environment variable
const BASE_URL = 'http://localhost:3000';

export class AngularMhHttpClient extends MhHttpClient {
  constructor(private readonly angularHttpClient: HttpClient) {
    super(BASE_URL, new LocalStorageAuthTokenRepository());
  }

  get<T>(uri: string): Observable<T> {
    const url = this.getRequestUrl(uri);
    return this.angularHttpClient.get<T>(url, {
      headers: this.getHeaders(),
    });
  }

  post<T>(uri: string, body: unknown): Observable<T> {
    const url = this.getRequestUrl(uri);
    return this.angularHttpClient.post<T>(url, body, {
      headers: this.getHeaders(),
    });
  }

  protected getHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    if (this.authTokenRepository.hasToken()) {
      headers.set('Authorization', `Bearer: ${this.authTokenRepository.get()}`);
    }
    return headers;
  }
}
