import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

const VALID_USERNAME = 'Canal-plus';
const VALID_PASSWORD = 'Super-secret';
const VALID_TOKEN = 'validToken';

@Injectable()
export class LoginService {
  constructor(private readonly authService: AuthService) {}

  async validate(username: string, password: string): Promise<boolean> {
    if (this.isValidCredentials(username, password)) {
      this.authService.setToken(VALID_TOKEN);
      return true;
    }

    return false;
  }

  private isValidCredentials(username: string, password: string): boolean {
    return username === VALID_USERNAME && password === VALID_PASSWORD;
  }
}
