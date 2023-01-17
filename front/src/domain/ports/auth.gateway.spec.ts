import { AuthGateway } from './auth.gateway';
import { InMemoryAuthGateway } from '../adapters/in-memory-auth.gateway';
import { lastValueFrom } from 'rxjs';

let authGateway: AuthGateway;

beforeEach(() => {
  authGateway = new InMemoryAuthGateway();
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
