# WebPlayer V1

Status: **Foundation implemented**

## Current supported UX

The reusable `WebPlayer` component now models:
- `vps` — direct HTML5 video player;
- `telegram` — entitlement/community handoff surface;
- `youtube` — provider reserved for later integration;
- `cloudflare_stream` — provider reserved for later integration.

The component is provider-neutral. Content identity lives in the lesson/release model.

## Important security note

The current VPS component accepts a media `src`, but production premium content must **not** pass a permanent public VPS URL.

Before using premium VPS lessons in production, implement:

```text
authenticated customer
  → server checks ARO entitlement
  → server resolves lesson/release
  → server returns short-lived/protected media path
  → WebPlayer plays VPS asset
```

Sales-page videos and free previews can use intentionally public media.

## Telegram

Telegram remains valid as:
- course continuation;
- community;
- temporary delivery.

Do not expose a premium join link to an unauthorised browser session.

## Next implementation

1. add content/lesson registry from `novidades` schema;
2. implement ARO entitlement resolver;
3. implement VPS media authorization endpoint;
4. create `/assistir/[slug]` only when at least one real pilot release is mapped;
5. add progress tracking after identity/library V2 exists.
