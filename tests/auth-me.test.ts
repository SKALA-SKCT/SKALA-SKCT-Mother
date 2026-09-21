import assert from 'node:assert/strict';
import test from 'node:test';

import { onRequestGet } from '../functions/api/auth/me.ts';

test('authenticated users receive a session cookie shared with subdomains', async () => {
  const response = await onRequestGet({
    data: {
      claims: {
        sub: 'skct:1',
        nick: '박건민',
        admin: false,
      },
    },
    env: {},
    request: new Request('https://www.skala-skct.com/api/auth/me', {
      headers: {
        cookie: 'skct_session=existing-session-token',
      },
    }),
  });

  assert.equal(response.status, 200);
  assert.match(response.headers.get('set-cookie') ?? '', /^skct_session=existing-session-token;/);
  assert.match(response.headers.get('set-cookie') ?? '', /Domain=.skala-skct.com;/);
  assert.match(response.headers.get('set-cookie') ?? '', /HttpOnly;/);
  assert.match(response.headers.get('set-cookie') ?? '', /Secure;/);
  assert.match(response.headers.get('set-cookie') ?? '', /SameSite=Lax;/);
});
