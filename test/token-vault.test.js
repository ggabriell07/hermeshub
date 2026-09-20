const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');

const {
  encryptToken,
  decryptToken,
} = require('../examples/token-vault');

test('round-trips a token with AES-256-GCM', () => {
  const key = crypto.randomBytes(32);
  const encrypted = encryptToken('example-access-token', key);

  assert.notEqual(encrypted.ciphertext, 'example-access-token');
  assert.equal(
    decryptToken(encrypted, key),
    'example-access-token'
  );
});

test('rejects invalid key sizes', () => {
  assert.throws(
    () => encryptToken('token', Buffer.alloc(16)),
    /32-byte Buffer/
  );
});
