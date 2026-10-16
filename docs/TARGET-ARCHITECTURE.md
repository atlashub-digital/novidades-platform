# Target Architecture — Novidades.Store Digital V2

Status: **Target baseline**

## 1. Product definition

Novidades.Store is a digital discovery, learning and commerce experience.

Primary content types:
- `ebook`;
- `guide`;
- `class`;
- `lesson`;
- `course`;
- `webinar`;
- `video`;
- `audio`;
- `bundle`;
- `download`;
- `tool`.

A product may contain several content types.

## 2. Public/application surfaces

Target routes:

```text
/
├── /conteudos
├── /cursos
├── /aulas
├── /webinars
├── /ebooks
├── /produto/[slug]
├── /biblioteca
├── /ler/[slug]        # WebReader
├── /assistir/[slug]   # WebPlayer
├── /ferramentas
└── /comunidade
```

Legacy route aliases may redirect during migration.

## 3. System boundaries

### Novidades owns
- catalog/discovery;
- content metadata;
- releases/versions;
- modules/lessons;
- media references;
- Reader/Player UX;
- editorial gates;
- user learning progress;
- community-channel mapping;
- ARO offer/entitlement binding references.

### ARO owns
- offer commercial truth;
- checkout session;
- payment state;
- order;
- entitlement authority;
- provider routing/secrets;
- refunds/chargebacks.

### GWD owns
- seller/affiliate identity;
- referral/campaign attribution;
- seller offers within commercial rules;
- commissions/margins;
- seller gamification;
- seller/community enablement.

### Media providers own
- binary/video delivery, never commercial entitlement truth.

## 4. Fresh logical data model

Create a new `novidades` schema in the existing physical Supabase project.

Proposed entities:

```text
novidades.content_items
novidades.content_releases
novidades.content_modules
novidades.content_lessons
novidades.content_assets
novidades.content_sources
novidades.content_rights
novidades.editorial_reviews
novidades.offer_bindings
novidades.aro_event_receipts
novidades.learning_progress
novidades.community_channels
novidades.community_access_requests
novidades.external_affiliate_offers   # later
```

Do not reuse legacy `public.orders`, `public.payments` or `digital_entitlements` as target commercial authority.

## 5. Core content identity

A content item has a stable identity independent of its commercial offer.

Example:

```text
Content: course-growth-001
Release: 2.1
Assets: Stream video + R2 workbook
Offer: novidades-course-growth-br
Entitlement: novidades:course-growth-001
```

This allows pricing, campaigns and delivery versions to evolve independently.

## 6. Reader/Player authorization

Target:

```text
authenticated user
    ↓
Novidades server
    ↓
ARO /v1/entitlements/resolve
    ↓ ACTIVE entitlement
Novidades resolves content release
    ↓
short-lived media access
    ├── R2 signed download
    └── Stream signed playback token
```

Browser redirects and localStorage claims are not authoritative access control.

## 7. Community entitlement

Community can be an entitlement benefit:

```text
ARO entitlement ACTIVE
   ↓
Novidades community bridge
   ↓
Telegram/Discord/WA eligibility
   ↓
channel-specific admission workflow
```

Membership revocation/refund must be reflected by the integration policy where technically supported.

## 8. Physical affiliate layer — later

Physical products are not stored as internal inventory in V1.

Future table `external_affiliate_offers` can represent:
- marketplace;
- external product URL;
- affiliate URL;
- category;
- image;
- disclosure;
- validity/last-check timestamp.

Novidades acts as discovery/referral, not merchant of record for these external items.

## 9. GWD attribution gap

The current ARO V1 `Attribution` schema supports UTM/referrer but not explicit GWD identifiers.

Before GWD production attribution, add stable fields such as:
- `referral_code`;
- `participant_id`;
- `campaign_id`;
- `seller_offer_id`.

Temporary metadata is acceptable only as a controlled transition; first-class contract fields are preferred.

## 10. Migration principle

New architecture is built alongside legacy data, then cut over by evidence.

Do not drop legacy tables/functions in the first migration.
