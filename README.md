# HermesHub

AI-assisted content SaaS prototype integrating **LLM generation, OAuth2, encrypted third-party credentials, Supabase and Instagram Graph API**.

The project is paused as a product, but remains useful as an engineering case study for secure API integration and contextual AI generation.

## Architecture

```text
React / TypeScript
      ↓
Supabase Auth
      ↓
PostgreSQL + RLS
      ↓
Generation workflow
      ↓
Claude
      ↓
Structured content output

Instagram connection
      ↓
OAuth2
      ↓
AES-256-GCM encrypted token persistence
      ↓
Instagram Graph API
```

## Engineering focus

- contextual LLM generation using account-specific onboarding data
- authenticated multi-user application state
- Supabase Auth and PostgreSQL RLS
- Instagram OAuth2 integration
- encrypted access-token persistence
- external API permissions
- structured LLM output
- CI/CD through GitHub Actions

## Public reference implementation

The complete product source is private.

This repository contains sanitized engineering references that demonstrate selected patterns without publishing credentials or proprietary application code.

```text
examples/
  token-vault.js

test/
  token-vault.test.js

docs/
  architecture.md
  security.md

.github/workflows/
  test.yml
```

## AES-256-GCM token storage example

The public token-vault example demonstrates authenticated encryption for sensitive third-party credentials.

```javascript
const crypto = require('node:crypto');
const { encryptToken, decryptToken } = require('./examples/token-vault');

const key = crypto.randomBytes(32);
const encrypted = encryptToken('example-token', key);

decryptToken(encrypted, key);
```

The encryption key is intentionally external to the encrypted payload.

Production systems should store encryption keys in protected secret-management infrastructure rather than source code or application tables.

## Run the public tests

Requires Node.js 20+.

```bash
npm test
```

The current tests verify:

- AES-256-GCM token round-trip
- invalid key-size rejection

## Security principles

- do not persist third-party access tokens in plaintext
- keep encryption keys outside the database
- request only necessary OAuth permissions
- avoid logging credentials
- treat token revocation and rotation as lifecycle concerns
- separate browser-visible data from server-side secrets

See [docs/security.md](docs/security.md) for more detail.

## AI generation flow

A simplified generation flow:

```text
business context
+ audience
+ tone
+ content objective
        ↓
prompt/context builder
        ↓
LLM
        ↓
structured result validation
        ↓
application UI
```

The objective was to make generation account-specific instead of using generic prompts for every user.

## Stack

**Frontend**  
React · TypeScript

**Backend / Data**  
Supabase · PostgreSQL · Auth · RLS

**AI**  
Claude · Structured generation

**Integration**  
Instagram Graph API · OAuth2

**Security**  
AES-256-GCM

**Delivery**  
GitHub Actions

## Repository scope

Not included:

- production credentials
- OAuth client secrets
- real access tokens
- real user accounts
- full private frontend source
- private workflow configuration

## Status

Product development is currently paused.

The repository is maintained as a secondary engineering case study focused on AI SaaS architecture, OAuth2 integration and secure credential handling.
