# Data Model — Novidades V2

Status: **Design approved for implementation planning; no migration applied by this document**

Physical database: existing Supabase project `novidades-store-platform` (`eivqvrfsreaopzlvhadu`).

## Separation

```text
Postgres/Supabase
├── auth       # Supabase identity
├── novidades  # new digital content/application domain
├── gwd        # sales workforce domain (V1 may share physical DB)
└── public     # legacy migration source; do not extend as the V2 domain

ARO: separate transactional authority
```

## novidades.content_items

Stable editorial/content identity.

Core fields:
- id UUID;
- slug;
- type: ebook | guide | class | course | webinar | video | audio | bundle | tool | download;
- title;
- subtitle;
- summary;
- language;
- risk_class;
- lifecycle_status;
- created_at / updated_at.

## novidades.content_releases

Versioned publishable release.

Core fields:
- id;
- content_item_id;
- version;
- status;
- release_notes;
- editorial_owner;
- approved_at;
- published_at;
- next_review_at.

Unique: `(content_item_id, version)`.

## novidades.content_modules / content_lessons

Course/structured learning hierarchy.

Lessons support:
- title;
- lesson type;
- sequence;
- preview flag;
- duration;
- release relation.

## novidades.content_assets

Provider-neutral asset registry.

Core:
- release/lesson relation;
- asset_kind;
- provider: stream | r2 | telegram | external | legacy_supabase;
- provider_asset_id;
- object/path reference;
- mime type;
- duration;
- preview policy;
- active flag.

Do not store long-lived public premium URLs as source of truth.

## novidades.content_sources

Provenance record:
- source type;
- source location/reference;
- creator/owner where known;
- acquisition date;
- checksum/manifest;
- source notes.

## novidades.content_rights

Rights evidence:
- source relation;
- license/evidence URI;
- commercial use;
- derivative/edit permission;
- redistribution permission;
- channel/geography constraints;
- attribution requirement;
- reviewed_at;
- review status.

## novidades.editorial_reviews

Gate evidence:
- release;
- gate;
- reviewer;
- decision;
- findings;
- evidence links;
- timestamp.

Publication policy should require mandatory gates, not only a mutable boolean.

## novidades.offer_bindings

Connect editorial content to ARO without duplicating ARO commerce truth:
- content/release;
- ARO project;
- ARO offer key;
- entitlement key;
- market;
- active window.

No provider price/fee ledger here.

## novidades.aro_event_receipts

Idempotent event receipt/projection:
- ARO event id unique;
- event type;
- order id;
- processed_at;
- payload hash;
- processing result.

Useful for side effects and audit; not payment authority.

## novidades.learning_progress

Per authenticated user:
- user_id;
- content/release/lesson;
- progress/status;
- position;
- completed_at;
- updated_at.

Authorization must still validate entitlement for premium content.

## novidades.community_channels

Maps release/content/entitlement benefit to:
- provider: telegram | discord | whatsapp;
- external channel id;
- admission policy;
- revocation policy.

## novidades.community_access_requests

Audit:
- user;
- entitlement key;
- provider identity;
- request/admission/revocation status;
- timestamps;
- reason/evidence.

## Later: novidades.external_affiliate_offers

For physical/external marketplace monetization:
- marketplace;
- title;
- external URL;
- affiliate URL;
- disclosure;
- image;
- category;
- active;
- last_checked_at.

This is discovery/referral metadata, not inventory/order/shipping.

## Security

- Prefer private `novidades` schema and server APIs.
- Expose only intentionally public views/RPCs.
- Any exposed tables require RLS.
- Never use user-editable metadata for authorization.
- service-role stays server-side.
- entitlement authority stays in ARO.

## Migration process

Do not turn this document into migration history manually.

Implementation must:
1. create a Supabase development branch or controlled environment;
2. apply/iterate schema;
3. run security/database advisors;
4. generate a clean migration with Supabase tooling;
5. commit generated migration;
6. validate against preview before production.
