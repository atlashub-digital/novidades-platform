# Media Delivery — WebReader, WebPlayer & Community

Status: **Decision fixed — V1 rollout**

## 1. Decision

Novidades launches with a provider-neutral WebPlayer immediately.

For V1, video sources are:

1. **Sales-page videos and public samples/previews** — embedded directly in Novidades pages.
2. **Premium lessons/videos** — either:
   - protected files hosted on Atlas VPS; or
   - Telegram delivery/community when that is the fastest operational route.
3. **Later providers already anticipated, but not blockers**:
   - YouTube (typically unlisted/public preview use);
   - Cloudflare Stream.

The application must not hard-code one provider as the content identity.

## 2. WebPlayer V1

The WebPlayer is a Novidades application surface, independent of media origin.

Target route:

```text
/assistir/[content]/[lesson]
```

UX supports:
- embedded sales video;
- public trailer/sample;
- first lesson preview;
- protected premium lesson;
- module/lesson navigation;
- lesson metadata;
- downloads/materials;
- later progress tracking.

## 3. Supported V1 providers

### VPS

Use for premium video when we want the lesson to play directly inside the Novidades page.

Preferred baseline:
- media behind a dedicated server/reverse-proxy route;
- HTTP range requests enabled;
- no permanent public premium asset URL exposed as the access authority;
- server validates content access before issuing/serving a short-lived media path;
- MP4 progressive playback is acceptable for V1;
- HLS may be added later.

VPS media is a delivery mechanism only. ARO remains entitlement authority.

### Telegram

Use for:
- complete courses already organized in Telegram;
- community;
- cohort discussion;
- bonus materials;
- temporary premium delivery where migration is not yet worth the effort.

Telegram is never the canonical catalog, rights registry or commerce authority.

A course may be hybrid:

```text
Sales page / preview     → Novidades embedded video
Selected premium lessons → WebPlayer + VPS
Remaining course         → Telegram channel/group
Community                → Telegram
```

## 4. Future providers

### YouTube
Plan support in the provider abstraction.

Best use:
- trailers;
- sample lessons;
- public/free video;
- lower-sensitivity content.

Unlisted links are operationally useful but are not treated as strong entitlement protection.

### Cloudflare Stream
Planned upgrade path for:
- adaptive streaming;
- signed playback;
- larger video library;
- reduced custom media operations.

Cloudflare is not required for V1.

## 5. Provider-neutral asset model

`content_assets` should support:

- `provider`: vps | telegram | youtube | cloudflare_stream | drive | supabase | external
- `provider_asset_id`
- `asset_kind`: video | audio | pdf | zip | image | subtitle | transcript
- `delivery_mode`: embedded | protected_stream | download | community
- `preview_policy`
- `duration`
- `mime_type`
- `release_id`
- `lesson_id`
- `active`

This permits provider migration without changing content identity.

## 6. eBooks, PDFs and other digital assets

### Current state
Google Drive may continue to hold:
- editorial masters;
- source files;
- current PDFs/assets during transition.

Supabase may continue to serve:
- structured content;
- WebReader blocks;
- metadata;
- existing protected objects during migration.

### V1 target
Separate **source/master** from **customer delivery**.

```text
Google Drive
  → editorial/master/source

Supabase/Postgres
  → metadata / releases / Reader content / access projection

Delivery
  → current protected Supabase storage where suitable
  → VPS when operationally useful
  → future R2/other object storage when scale justifies
```

Do not make a public Google Drive link the permanent premium delivery mechanism.

## 7. WebReader

Preserve the existing WebReader experience.

Authorization target:
- authenticated customer;
- ARO ACTIVE entitlement;
- Novidades resolves the approved content release;
- structured content is rendered natively.

During migration, legacy claim-based access can be preserved only for historical purchasers until reconciliation is complete.

## 8. Community admission

Telegram community/course admission:

1. customer authenticates or presents the approved identity bridge;
2. Novidades resolves ARO entitlement;
3. customer links Telegram identity;
4. Telegram bot/admin workflow receives join request;
5. admission only if entitlement is valid;
6. admission is logged;
7. refund/reversal can trigger removal according to channel policy.

Telegram bot token remains server-side.

## 9. Non-goals for V1

- DRM.
- bespoke transcoding farm.
- full LMS.
- mandatory Cloudflare Stream migration.
- mandatory YouTube hosting.
- replacing every Telegram course before launch.
