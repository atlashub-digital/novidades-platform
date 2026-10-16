# NOV-001 — Complete Audit & Rebaseline Decision

Status: **Audit complete / implementation rebaseline in progress**  
Audit date: 2026-10-16

## Executive decision

### Canonical application
**KEEP + REBASELINE:** `atlashub-digital/novidades-platform`

### Secondary repository
**DEPRECATE AFTER MIGRATION:** `atlashub-digital/novidades-digital`

The second repository existed for a reasonable historical reason: the original architecture proposed splitting digital delivery only when it became an independently deployable surface with authenticated library, interactive tools or a heavy media/course player. That condition later occurred, so `novidades-digital` was created.

The strategy has now changed: **Novidades itself is digital-first**. Maintaining two customer applications would duplicate catalog, product registry, checkout, entitlement, delivery and release logic. The split no longer pays for itself.

## Audit inventory

### novidades-platform
Observed at audit baseline:
- 703 files;
- 467 files under `digital-library`;
- 162 source files under `src`;
- digital discovery pages;
- eBook catalog + WebReader;
- digital library/access UI;
- digital tools;
- old physical-commerce UI and data assumptions;
- site-template engine;
- direct XPAYMENTS/Supabase Edge checkout;
- legacy shared AutoHub360/public-schema commerce model.

### novidades-digital
Observed at audit baseline:
- 39 files;
- separate Next.js application plus legacy static `site/`;
- hard-coded digital product registry;
- direct XPAYMENTS checkout;
- XPAYMENTS webhook processing;
- local checkout intents;
- local entitlement authority;
- protected asset signing;
- protected online-content release.

This is useful migration material, but not a justified second product runtime.

## Supabase reality

Physical project already exists:
- name: `novidades-store-platform`;
- ref: `eivqvrfsreaopzlvhadu`;
- region: `sa-east-1`;
- state at audit: healthy.

The database contains substantial legacy/public-schema commerce history:
- products/listings/categories;
- inventory, orders, shipments and physical-commerce tables;
- payment-provider tables;
- CRM/support/automation;
- digital checkout/entitlement/assets/content;
- site-template/partner-site tables.

Decision: **reuse the physical project, create a clean logical `novidades` schema, and migrate deliberately. Do not destroy the legacy `public` model during rebaseline.**

A separate `gwd` schema may share this physical database in V1, while ARO stays a separate transactional data plane.

## Digital content library audit

Master PLR inventory: **437 candidates**.

Decision distribution:
- 70 — `PUBLICAR APÓS QA`;
- 295 — `ATUALIZAR`;
- 57 — `REVISÃO ESPECIALIZADA`;
- 15 — `EXCLUIR`.

Risk:
- 70 — low/medium;
- 275 — medium;
- 20 — medium/high;
- 72 — high.

Audit depth:
- **2** — content actually read;
- 94 — package/sample;
- **341** — title/folder only.

License status:
- **437 / 437 — VERIFICAR POR PRODUTO**.

Conclusion: the library is an **inventory/research asset**, not an approved commercial catalog.

## Site-template audit

Current engine contains hundreds of templates and generated partner-site records. The runtime generates synthetic company names, phone numbers, emails, city and quantitative-looking statistics.

Decision:
- **REMOVE FROM ACTIVE PUBLIC PRODUCT SURFACE**;
- keep source/template inventory for later evaluation;
- do not present generated synthetic business facts as live commercial sites;
- later option: curate legitimate assets into a downloadable ZIP/template pack after rights + quality review.

## Component disposition

| Area | Decision | Reason |
|---|---|---|
| Next.js 16 / React 19 foundation | KEEP | Current and appropriate |
| Digital discovery UI | KEEP / REDESIGN | Strong base, new positioning |
| eBook WebReader | KEEP / MIGRATE AUTH | Valuable UX; access authority must move to ARO |
| Digital library UI | KEEP / REBUILD ACCOUNT MODEL | Current localStorage claim model is transitional |
| Digital content blocks | KEEP / MIGRATE | Good content primitive |
| Protected object delivery | KEEP CONCEPT | Move to new access model; R2 preferred for scale |
| Digital tools | CURATE | Useful as lead magnets/bonuses; not core |
| PLR inventory | ARCHIVE / RESEARCH | Rights + QA not sufficient for commerce |
| Site templates | ARCHIVE / FUTURE PACK | Not a priority; synthetic runtime unsuitable |
| Physical-product storefront | DEFER | Affiliate discovery only in later phase |
| Inventory/shipping runtime | DEFER/LEGACY | Outside digital-first V1 |
| Direct XPAYMENTS checkout | REMOVE FROM TARGET | ARO is commerce authority |
| Local payment webhook | REMOVE FROM TARGET | Provider webhooks belong to ARO |
| Local entitlement authority | REMOVE FROM TARGET | ARO entitlement is authoritative |
| Old SQLite Prisma User/Post | REMOVE | Boilerplate / unused |
| `novidades-digital` app | DEPRECATE | Duplicate product/runtime boundary |
| Static GitHub Pages copy | REMOVE/ARCHIVE | Duplicate deployment surface |

## Immediate blockers before commercial launch

1. ARO offer registry for selected Novidades products.
2. ARO entitlement keys for Reader/Player/community access.
3. customer identity/account recovery model.
4. migration away from claim-token/localStorage access.
5. content homologation for first launch catalog.
6. rights evidence per commercial release.
7. WebPlayer/media provider implementation.
8. GWD attribution extension in the ARO contract.
9. preview/E2E and controlled domain cutover.

## NOV-001 conclusion

The project does **not** need to be rebuilt from zero at the UI level. It needs a **clean domain/data/payment rebaseline**.

We preserve what has real product value:
- digital UX;
- Reader;
- content structures;
- selected tools;
- protected-delivery concepts.

We retire the accidental architecture:
- physical-commerce-first positioning;
- duplicated digital app;
- direct provider payments;
- local entitlement truth;
- public template catalog;
- unhomologated PLR as sellable inventory.
