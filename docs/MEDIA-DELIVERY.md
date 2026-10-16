# Media Delivery — WebReader, WebPlayer & Community

Status: **Target architecture / phased rollout**

## Immediate objective

Launch digital learning without waiting for a full LMS, while avoiding permanent dependence on Telegram or public Drive links.

## Phase A — immediate bridge

Use Telegram where operationally useful for:
- community;
- cohort discussion;
- bonus delivery;
- temporary gated course access when rights permit.

Flow:

```text
ARO entitlement ACTIVE
  → user links Telegram identity
  → bot creates/uses controlled join-request flow
  → eligible user is admitted
```

Telegram is not the canonical catalog, rights registry or entitlement authority.

## Phase B — native WebPlayer

Use **Cloudflare Stream** for protected video:
- adaptive streaming;
- Stream video IDs stored in `novidades.content_assets`;
- signed-token playback for entitled users;
- first/public lesson can use a public preview asset or explicitly public token policy.

Suggested UX:
- product page trailer/lesson 0;
- course page with module list;
- mini player cards;
- full `/assistir/[slug]` learning player;
- progress tracking;
- continue watching.

## Phase C — object assets

Use **Cloudflare R2** for:
- PDFs;
- ZIP packs;
- workbooks;
- audio;
- subtitles/transcripts;
- thumbnails/source derivatives where appropriate.

Access should be short-lived and server-authorized.

## WebReader

Preserve the existing reader UX concept, but change authorization:
- old: checkout reference + claim + local entitlement;
- target: authenticated account + ARO active entitlement.

Content can be stored as structured blocks/releases and rendered natively.

## Google Drive

Use Drive for editorial/source collaboration if useful, not as the final customer streaming/delivery runtime.

## Telegram admission design

When implemented:
1. customer authenticates in Novidades;
2. server resolves ARO entitlement;
3. customer links Telegram identity;
4. bot issues or validates a join request;
5. bot approves only if entitlement is active;
6. audit admission;
7. refund/revocation triggers removal where the channel/bot permissions allow it.

No Telegram bot token is exposed client-side.

## Media portability

`content_assets` stores provider-neutral metadata:
- `provider`;
- `provider_asset_id`;
- `asset_kind`;
- `delivery_mode`;
- `duration`;
- `mime_type`;
- `release_id`;
- `preview_policy`.

This lets us move between Stream/R2/other providers without changing content identity.
