# HermesHub Architecture

HermesHub is an AI-assisted content SaaS prototype that combines user context, LLM generation and Instagram platform integration.

```text
Browser
  ↓
React / TypeScript
  ↓
Supabase Auth
  ↓
PostgreSQL + RLS
  ↓
Generation API / workflow
  ↓
Claude
  ↓
Structured content output

Instagram connection
  ↓
OAuth2
  ↓
Encrypted token persistence
  ↓
Instagram Graph API
```

## Main engineering concerns

- authenticated multi-user product state
- contextual generation per account
- OAuth2 lifecycle
- encrypted third-party tokens
- external API permissions
- structured LLM outputs
- deployment automation

The public repository contains sanitized references only. The complete application source is not published.
