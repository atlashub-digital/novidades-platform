# Novidades.Store — Digital Content Marketplace

**Canonical repository:** `atlashub-digital/novidades-platform`

Novidades.Store is being rebaselined as a **digital-first content, learning and media marketplace**. The commercial core is eBooks, classes, webinars, complete trainings, video/audio learning, WebReader/WebPlayer experiences and curated digital bundles.

Physical commerce is **not a V1 priority**. It may return later as a complementary affiliate-discovery layer (for example external marketplace links), without bringing inventory, fulfillment or provider-payment complexity back into the core.

## Governance

- **GitHub** is the technical source of truth.
- **Notion** is the operational/project layer.
- **ARO** is the authority for checkout, order, payment state and entitlement.
- **GWD / GoWorld.Digital** owns sellers, affiliates, attribution, commissions, gamification and seller/community enablement.
- **AMF** remains a separate content/creative factory; Novidades may have its own dedicated operational agents.

## Repository consolidation

This repository is the target application for Novidades.Store.

`atlashub-digital/novidades-digital` is now a **migration source / legacy application**. Its useful entitlement, protected-delivery and product concepts will be migrated here. It should not remain a second production application for the same customer journey.

See:
- `docs/NOV-001-AUDIT.md`
- `docs/TARGET-ARCHITECTURE.md`
- `docs/CONTENT-GOVERNANCE.md`
- `docs/MEDIA-DELIVERY.md`
- `docs/HERMES-WORKFORCE.md`
- `docs/LEGACY-RETIREMENT.md`

## Product priority

### P0 — Digital learning & content
- eBooks and long-form guides;
- classes and lesson series;
- webinars;
- complete courses/trainings;
- video/audio content;
- WebReader;
- WebPlayer;
- private downloads/assets;
- bundles and curated collections;
- community access attached to an entitlement.

### P1 — Free/lead content
- excerpts and first lessons;
- mini publications;
- public articles;
- selected tools/checklists;
- previews/trailers;
- lead magnets.

### P2 — Digital asset packs
Existing site templates, old PLR-derived assets and tools are **not automatically products**. They must pass product and rights gates. Strong assets may later become ZIP packs, freebies or paid bundles.

### P3 — Physical/affiliate discovery
Future complementary revenue only:
- external affiliate offers;
- marketplace links;
- curated recommendations.

No V1 inventory, shipping or physical-product checkout is required.

## Target customer flow

```text
Discovery / social / seller referral
          ↓
Novidades.Store product / course / webinar page
          ↓
ARO checkout
          ↓
ARO Order APPROVED
          ↓
ARO entitlement ACTIVE
          ↓
Novidades Library
   ├── WebReader
   ├── WebPlayer
   ├── Downloads
   └── Community access
          ↓
GWD receives attributed commercial event
   └── seller/affiliate accrual + gamification
```

## Media strategy

- **Cloudflare Stream** — target video delivery for protected adaptive playback.
- **Cloudflare R2** — target object storage for PDFs, ZIPs, audio and supporting assets.
- **Telegram** — immediate bridge/community channel where rights and access rules permit; not canonical content storage.
- **Google Drive** — production/customer delivery is not the target.

## Content rule

Nothing becomes sellable merely because it exists in Drive, Telegram, GitHub or the current catalog.

Every release must pass:
1. source/provenance;
2. rights/license;
3. editorial/risk review;
4. productization;
5. media/delivery QA;
6. ARO offer + entitlement mapping;
7. preview/E2E;
8. publication gate.

## Current safety state

Direct XPAYMENTS checkout is legacy and **not the target architecture**. During this rebaseline, customer-facing direct checkout is intentionally blocked until the ARO path and access model are homologated.

No DNS cutover, LIVE activation or real payment is authorized by this branch.
