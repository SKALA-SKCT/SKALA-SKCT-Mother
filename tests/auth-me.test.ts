import assert from 'node:assert/strict';
import test from 'node:test';

import { onRequestGet } from '../functions/api/auth/me.ts';
import { onRequest } from '../functions/_middleware.ts';
import { signSession } from '../shared/auth.ts';

test('authenticated users receive a session cookie shared with subdomains', async () => {
  const response = await onRequestGet({
    data: {
      sessionToken: 'existing-session-token',
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

test('apex redirect promotes an existing host-only session to the shared domain', async () => {
  const secret = 'a-secure-session-secret-that-is-at-least-32-characters';
  const validToken = await signSession({ sub: 'skct:1', nick: '박건민' }, secret);
  const response = await onRequest({
    data: {},
    env: { SESSION_SECRET: secret },
    request: new Request('https://skala-skct.com/login?redirect=https%3A%2F%2Fcommunity.skala-skct.com', {
      headers: {
        cookie: `skct_session=stale-invalid-session; skct_session=${validToken}`,
      },
    }),
    next: () => new Response(null, { status: 204 }),
  });

  assert.equal(response.status, 308);
  assert.equal(
    response.headers.get('location'),
    'https://www.skala-skct.com/login?redirect=https%3A%2F%2Fcommunity.skala-skct.com',
  );
  assert.match(response.headers.get('set-cookie') ?? '', new RegExp(`^skct_session=${validToken.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')};`));
  assert.match(response.headers.get('set-cookie') ?? '', /Domain=.skala-skct.com;/);
});
