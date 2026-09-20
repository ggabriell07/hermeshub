# Security Notes

HermesHub integrates with third-party account tokens, so credential handling is part of the application architecture.

## Token storage

The public `examples/token-vault.js` file demonstrates authenticated encryption using AES-256-GCM.

The example intentionally requires the encryption key to be provided externally.

A production implementation should:

- keep encryption keys outside the database
- use secret management rather than source-controlled keys
- use a unique nonce/IV for each encryption operation
- persist the authentication tag with encrypted data
- rotate credentials when access is revoked
- request only the permissions required by the product
- avoid logging access tokens

## OAuth2

OAuth integrations must validate redirect flows and avoid exposing long-lived credentials to the browser.

The public example does not contain real application IDs, tokens or user accounts.
