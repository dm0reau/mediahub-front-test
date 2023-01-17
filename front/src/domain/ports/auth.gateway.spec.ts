import { AuthGateway } from './auth.gateway';
import { InMemoryAuthGateway } from '../adapters/in-memory-auth.gateway';
import { lastValueFrom } from 'rxjs';
import { InMemoryAuthTokenRepository } from '../adapters/in-memory-auth-token.repository';
import { AuthTokenRepository } from './auth-token.repository';

let authGateway: AuthGateway;
let authTokenRepository: AuthTokenRepository;

beforeEach(() => {
  authTokenRepository = new InMemoryAuthTokenRepository();
  authGateway = new InMemoryAuthGateway(authTokenRepository);
});

it('validates with valid credentials', async () => {
  const isValid = await lastValueFrom(
    authGateway.validate('Canal-plus', 'Super-secret')
  );
  expect(isValid).toBe(true);
});

it("don't validates with invalid credentials", async () => {
  const isValid = await lastValueFrom(
    authGateway.validate('invalid-user', 'invalid')
  );
  expect(isValid).toBe(false);
});
