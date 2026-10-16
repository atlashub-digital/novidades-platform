# Execution Backlog — Digital V2

GitHub Issues are currently disabled on this fork. Until that setting is deliberately changed, these workstreams are tracked here and in the project Notion.

## NOV-002 — V2 logical schema
Create `novidades` inside the existing Supabase project without deleting legacy `public` data.

Acceptance:
- content/release/module/lesson/assets/source/rights/review tables;
- offer bindings;
- ARO event receipt/dedupe;
- learning progress;
- community access;
- RLS + explicit Data API grants where used;
- advisors + migration evidence.

## NOV-003 — ARO checkout & entitlement
Replace all target direct-provider integration with ARO.

Acceptance:
- approved ARO offers;
- no provider secret in Novidades;
- server-side entitlement resolution;
- signed/idempotent events;
- refund/reversal support;
- legacy purchaser reconciliation;
- controlled E2E before LIVE.

## NOV-004 — Content homologation pipeline
Implement G0–G8 release gates from `CONTENT-GOVERNANCE.md`.

## NOV-005 — WebPlayer & media
Implement provider-neutral content assets, Cloudflare Stream playback and R2 delivery.

## NOV-006 — Customer identity & library
Replace local claim-token recovery with authenticated cross-device library backed by ARO entitlement.

## NOV-007 — Telegram community bridge
Entitlement-aware Telegram identity linking and join-request approval, with audit/revocation policy.

## NOV-008 — Hermes workforce
Provision the dedicated 8-role Novidades/GWD team plus release/domain specialists.

## Deferred

### NOV-PHYS-001 — External physical affiliate discovery
Later:
- marketplace link;
- affiliate disclosure;
- availability/last-checked date;
- no Novidades inventory/shipping/payment authority.

### NOV-ASSET-001 — Template/archive monetization
Evaluate the template library and selected legacy assets for:
- free ZIP;
- paid pack;
- bonus;
- discard.

No active public template marketplace before rights and quality review.
