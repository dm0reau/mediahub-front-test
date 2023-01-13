import { Injectable } from '@angular/core';

const LOCAL_STORAGE_TOKEN = 'authToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  setToken(token: string) {
    localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
  }

  isLoggedIn(): boolean {
    const authToken = localStorage.getItem(LOCAL_STORAGE_TOKEN);
    return authToken !== null && authToken.length > 0;
  }
}
