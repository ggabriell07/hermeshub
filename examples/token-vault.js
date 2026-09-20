const crypto = require('node:crypto');

function encryptToken(token, key) {
  if (!Buffer.isBuffer(key) || key.length !== 32) {
    throw new TypeError('key must be a 32-byte Buffer');
  }

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const ciphertext = Buffer.concat([
    cipher.update(token, 'utf8'),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return {
    ciphertext: ciphertext.toString('base64'),
    iv: iv.toString('base64'),
    authTag: authTag.toString('base64'),
  };
}

function decryptToken(payload, key) {
  if (!Buffer.isBuffer(key) || key.length !== 32) {
    throw new TypeError('key must be a 32-byte Buffer');
  }

  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    key,
    Buffer.from(payload.iv, 'base64')
  );

  decipher.setAuthTag(Buffer.from(payload.authTag, 'base64'));

  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(payload.ciphertext, 'base64')),
    decipher.final(),
  ]);

  return plaintext.toString('utf8');
}

module.exports = {
  encryptToken,
  decryptToken,
};
