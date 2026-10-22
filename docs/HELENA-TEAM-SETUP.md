# Helena Handoff — Novidades + GWD Team Setup

Status: **Ready to provision**

## Objective

Provision the initial four-agent Hermes team with least-privilege access while Novidades and GWD are developed in parallel.

## Team

- Diana — Product, Operations & Growth Lead
- Tomás — Research & Content Intelligence
- Elisa — Learning Product & Media Editor
- Maia — Community, Seller Success & Gamification

Full role contract: `docs/HERMES-WORKFORCE.md`.

## Helena — provisioning order

### H1 — Create Hermes identities
Create four distinct agent identities with persistent project context.

Each agent must know:
- Novidades.Store is digital-first;
- GWD manages sellers/affiliates;
- ARO is commerce/entitlement authority;
- GitHub is technical source of truth;
- Notion is operational layer;
- AMF is an external/shared production capability.

### H2 — GitHub permissions
Repos:
- `atlashub-digital/novidades-platform`
- `atlashub-digital/gwd-atlas-salesworkforce`
- `atlashub-digital/novidades-digital` read-only migration source
- ARO repo read-only unless specifically delegated.

Suggested:
- Diana: write/coordination.
- Tomás: read + docs/backlog contribution.
- Elisa: write to content/docs/media branches; no protected-branch direct merge.
- Maia: read + docs/issues only.

Do not give autonomous direct production merge/deploy authority.

### H3 — Notion
Give all four access to the Novidades + GWD project.

- Diana: edit/manage operational content.
- Tomás: research/backlog edit.
- Elisa: release/content edit.
- Maia: community/seller operation edit.

### H4 — Drive
Create/confirm project structure for:
- research intake;
- content sources/quarantine;
- editorial masters;
- media masters;
- approved releases;
- marketing/community materials.

Rights/source evidence must never be mixed with final published files without traceability.

### H5 — WhatsApp
Do **not** provision one number per agent.

When seller/community operations are ready:
- obtain/assign one AtlasHub-controlled WA Business number;
- connect through Evolution + Chatwoot/Atendimento.Center;
- expose Maia as an inbox operator;
- keep number/SIM ownership and recovery with AtlasHub/human admins.

### H6 — Telegram
Do **not** create a real-number Telegram account per agent.

Provision:
- one AtlasHub-controlled human/admin Telegram identity with real phone number for ownership, recovery and BotFather;
- create a Novidades/GWD bot when admission/moderation flow begins;
- grant bot/admin privileges only as required;
- give Maia operational access through the integration, not ownership of the human identity.

### H7 — Media access
For Elisa:
- Drive editorial/master access;
- scoped VPS media upload path when used;
- no VPS root;
- no payment secrets;
- later YouTube/Cloudflare media-scoped access only if those providers are activated.

### H8 — Secrets
Agents receive only secrets required by their runtime and role.

Never distribute:
- provider payment secrets;
- unrestricted Supabase service role to general agents;
- Cloudflare account-wide admin token;
- VPS root credentials;
- personal recovery credentials.

### H9 — Initial missions

**Diana**
- maintain combined Novidades/GWD implementation board;
- coordinate PRs/gates;
- keep parallel workstreams synchronized.

**Tomás**
- prepare first high-confidence digital content opportunity shortlist;
- prioritize assets we already own/control;
- mark provenance/rights uncertainty.

**Elisa**
- select 1–2 pilot content releases;
- define course/eBook structure;
- prepare first WebPlayer-ready lesson manifest and preview strategy.

**Maia**
- draft seller/community onboarding;
- define moderation rules;
- define WA/Telegram community operating flows;
- do not activate channels until infrastructure/permissions are approved.

## Current implementation streams

### Stream A — Novidades
Continue PR #1:
- page evolution;
- WebPlayer V1;
- content/release schema;
- ARO integration;
- account/library migration.

### Stream B — GWD
Build foundation:
- participant profile;
- affiliate/seller capability;
- referral code/link;
- campaign eligibility;
- attributed sale projection;
- accrual ledger;
- basic dashboard/gamification.

### Stream C — Content
Run G0–G8 homologation on first pilot releases.

## GO / NO-GO

Provisioning agents and non-production access: **GO**.

Production DNS, real payment, provider secrets, destructive DB migration, unrestricted channel ownership: **NO-GO until explicit gate**.
