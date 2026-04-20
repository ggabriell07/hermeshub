# HermesHub

SaaS de criação de conteúdo para Instagram com geração por LLM. Frontend ~95% completo, desenvolvimento pausado.

---

## O que faz

O usuário descreve o negócio dele em um wizard de onboarding (nicho, persona, tom de voz, objetivos). A partir disso, o sistema gera ideias de conteúdo, legendas e plano editorial personalizado usando Claude Sonnet como modelo de linguagem.

---

## Arquitetura

```
Browser (React/TypeScript)
    ↓
Supabase Auth (email/senha)
    ↓
Supabase DB (PostgreSQL + RLS)
    ↓
n8n webhook  →  Claude Sonnet API  →  resposta JSON
    ↓
Instagram Graph API (leitura de perfil e métricas)
```

**CI/CD**
```
push → GitHub Actions → deploy HostGator
```

---

## Stack

| Camada | Tecnologia | Detalhe |
|---|---|---|
| Frontend | React + TypeScript | gerado via Lovable |
| Backend | Supabase | PostgreSQL, Auth, RLS policies |
| LLM | Claude Sonnet | via HTTP Request no n8n |
| Automação | n8n self-hosted | webhooks de geração |
| API social | Instagram Graph API | leitura de perfil, posts, métricas |
| CI/CD | GitHub Actions | deploy automático |
| Hospedagem | HostGator | domínio hermeshub.io |

---

## Autenticação com Instagram

Fluxo OAuth2 completo via Meta for Developers.

- App ID registrado: `1364365331718102`
- Permissões: `instagram_basic`, `instagram_content_publish`, `pages_read_engagement`
- Access token persistido no Supabase com encriptação **AES-GCM-256**
- Conta de teste integrada: `@hermeshub.ai`

O token é encriptado no momento da escrita e descriptografado somente em tempo de uso, nunca exposto em texto plano.

---

## Geração de conteúdo

Workflow n8n:
1. `Webhook` — recebe `{ nicho, quantidade, contexto_usuario }`
2. `Code` — monta prompt com contexto do perfil do usuário
3. `HTTP Request` — Claude Sonnet API
4. `Code` — extrai e valida JSON da resposta
5. `Respond to Webhook` — retorna array de ideias

O prompt inclui nicho, persona do público-alvo, tom de voz e objetivos definidos no onboarding o conteúdo gerado não é genérico, é contextualizado por usuário.

---

## Frontend

Construído com React + TypeScript via Lovable. Componentes principais:

- **Wizard de onboarding** — 4 etapas com persistência de estado no Supabase
- **Dashboard** — métricas do Instagram (seguidores, posts, engajamento)
- **Gerador de ideias** — input de contexto + grid de resultados
- **Conexão Instagram** — botão OAuth2, status de conexão, opção de desconectar

---

## O que não está aqui

Código-fonte completo não público. O repositório documenta arquitetura, decisões técnicas e estrutura de integração.
