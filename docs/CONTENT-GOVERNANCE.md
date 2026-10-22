# Content Governance & Homologation

Status: **Mandatory release policy**

## Principle

A file, Telegram post, Drive folder, PLR package, old course or AI-generated draft is a **source**, not a product.

A commercial product is an approved **release** with provenance, rights, editorial quality, delivery, commerce and rollback evidence.

## Gate model

### G0 — Intake & provenance
Required:
- source URI/location;
- acquisition date;
- source owner/creator where known;
- raw-file checksum/manifest where applicable;
- proposed use;
- duplicate check.

Fail → `QUARANTINED`.

### G1 — Rights & license
Required:
- license/evidence;
- redistribution rights;
- edit/derivative rights;
- media/music/image rights where applicable;
- geographic/channel limitations;
- attribution requirements.

Unknown rights → **cannot be sold or published**.

### G2 — Editorial, factual & safety review
Check:
- language quality;
- originality/value-add;
- outdated facts;
- misleading claims;
- unsafe instructions;
- privacy/personality rights;
- source quality.

High-risk domains such as health, finance, legal, cybersecurity or professional advice require specialist review.

### G3 — Productization
Define:
- target audience;
- learning/outcome promise;
- format;
- modules/lessons;
- exercises/assets;
- free preview;
- sales-page evidence;
- version.

### G4 — Media & accessibility QA
Check:
- video/audio quality;
- captions/transcript;
- mobile playback;
- Reader formatting;
- filenames/metadata;
- download integrity;
- accessibility basics;
- thumbnails/covers.

### G5 — Commerce & entitlement
Required:
- ARO offer configured;
- canonical entitlement key;
- refund/reversal behavior;
- access mapping;
- seller/referral eligibility where applicable.

### G6 — Preview & E2E
Verify:
- sales page;
- preview/first lesson;
- checkout non-production/control path;
- entitlement resolution;
- Reader/Player;
- download/media token;
- community admission if included;
- mobile/browser QA.

### G7 — Publish
Requires release evidence and explicit GO.

### G8 — Revalidation
Every release has:
- review date;
- next review;
- change log;
- source refresh trigger;
- suspension/retirement path.

## Canonical statuses

```text
DISCOVERED
QUARANTINED
RIGHTS_PENDING
REVIEWING
PRODUCTIZING
READY_FOR_PREVIEW
APPROVED
PUBLISHED
SUSPENDED
RETIRED
```

## Release record minimum

Each published release records:
- content ID;
- release/version;
- title/language;
- format(s);
- source manifest;
- rights evidence;
- risk class;
- reviewer(s);
- release notes;
- media asset IDs;
- ARO offer;
- entitlement key;
- publish timestamp;
- next review;
- rollback/suspension reason if applicable.

## Telegram-origin content

Content discovered in Telegram requires the same G0/G1 evidence as any other source.

**Membership in or access to a channel is not evidence of commercial redistribution rights.**

If Telegram is used only as a delivery/community channel for content we own or are licensed to distribute, it may be integrated after entitlement validation.
