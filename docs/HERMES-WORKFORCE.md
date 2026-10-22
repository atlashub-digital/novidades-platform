# Hermes Workforce — Novidades + GWD

Status: **Approved initial team — 4 core agents**

The project starts with four dedicated agents. AMF, Helena and Atlas QA remain shared services/gates rather than permanent roles inside this team.

## Governance principle

No agent owns a personal phone number, SIM, Telegram identity or social account.

Where a channel requires a real identity:
- the account belongs to AtlasHub;
- credentials are controlled centrally;
- agents operate through bot/API/shared inbox/browser permissions;
- recovery ownership remains human/corporate.

No agent receives payment-provider authority or unrestricted production secrets.

---

## 1. Diana — Product, Operations & Growth Lead

### Mission
Own the operational coherence of Novidades + GWD.

### Responsibilities
- maintain roadmap, priorities and release sequence;
- coordinate Novidades page/product evolution;
- coordinate GWD foundation and seller experience;
- maintain GitHub/Notion traceability;
- define launch briefs and campaign requirements;
- coordinate growth/lifecycle work until volume justifies a dedicated Growth role;
- coordinate AMF requests;
- escalate unresolved product, legal, financial or production decisions;
- prepare GO/NO-GO evidence for Helena/human approval.

### Tools required
**Required**
- GitHub: read/write on Novidades + GWD documentation, issues/PR coordination; code merge only according to governance.
- Notion: project/task/decision edit.
- Google Drive: read/write project folders and editorial assets.
- analytics dashboards when available.
- web/research access.

**Optional later**
- email/lifecycle platform;
- social publishing tools.

### Channel identities
- WhatsApp number: **NO dedicated number**.
- Telegram real account: **NO**.
- Telegram bot: no direct operational need.
- Discord account/bot: no direct operational need.
- Video/audio creation: **NO**, except review/approval.

### Restrictions
- no real payments;
- no payment-provider secrets;
- no unilateral production deploy/DNS cutover;
- no rights override.

---

## 2. Tomás — Research & Content Intelligence

### Mission
Continuously discover high-potential content and commercial opportunities.

### Responsibilities
- research trends, demand, niches and questions;
- find candidate eBooks, courses, webinars, videos and experts;
- identify content gaps;
- maintain a source/opportunity backlog;
- score opportunities by demand, differentiation, rights feasibility, effort and commercial fit;
- research competitive offers and pricing patterns;
- prepare evidence packs for Elisa/Diana;
- monitor opportunities for future physical affiliate discovery without operating that vertical.

### Tools required
**Required**
- web research/search;
- GitHub: read + documentation/backlog write; no production code authority required.
- Notion: research/backlog edit.
- Google Drive: read/write research folders.
- spreadsheets/data analysis when needed.

**Useful**
- YouTube/Telegram research access where legally/operationally permitted.
- transcription/summarization tools.

### Channel identities
- WhatsApp number: **NO**.
- Telegram real account: preferably **NO dedicated project account**; research can use approved human/corporate access when necessary.
- Telegram bot: **NO**.
- Video/audio generation: **NO**.
- Social publishing credentials: **NO**.

### Restrictions
- discovered content is SOURCE, never automatically publishable;
- cannot declare license/right approval;
- cannot publish commercial releases.

---

## 3. Elisa — Learning Product & Media Editor

### Mission
Turn approved sources into professional digital learning products.

### Responsibilities
- define product format and learning outcome;
- structure courses, modules and lessons;
- edit/rewrite eBooks and guides;
- prepare WebReader releases;
- prepare WebPlayer lesson manifests;
- produce or coordinate scripts, transcripts, subtitles and lesson notes;
- prepare thumbnails/covers/media packaging;
- create free preview/sample versions;
- maintain release/version notes;
- perform the first rights/provenance checklist before escalation;
- request specialist/Helena review when rights or high-risk subject matter is uncertain;
- coordinate AMF for high-end creative/video production.

### Tools required
**Required**
- GitHub: content-schema/docs/media-manifest write; code read.
- Notion: release/task edit.
- Google Drive: editorial/master read/write.
- Supabase: limited content/media metadata access; no unrestricted service-role use by the agent.
- transcription tools.
- image/media editing/generation tools approved by AtlasHub.

**Media**
- access to VPS media upload workflow through scoped mechanism, not root SSH if avoidable;
- Telegram course/channel content access when required for migration;
- later YouTube/Cloudflare upload permissions scoped to media only.

**Audio/video**
- can use TTS/voice generation for drafts or approved narrated products;
- can use video-generation/editing tooling;
- final commercial voice/avatar use requires content/brand approval.

### Channel identities
- WhatsApp number: **NO**.
- Telegram real account: **NO dedicated identity**; media access via corporate/admin-approved source when needed.
- Telegram bot: **NO** for routine work.
- YouTube channel account: later **scoped uploader/editor**, not owner.
- Cloudflare: later media-scoped permission, not account administrator.

### Restrictions
- no commerce authority;
- no unilateral publication when rights gate is incomplete;
- no unrestricted VPS root;
- no provider/payment secrets.

---

## 4. Maia — Community, Seller Success & Gamification

### Mission
Operate the human/community side of Novidades and GWD.

### Responsibilities
- onboard affiliates and authorized sellers;
- seller FAQ and first-line support;
- publish seller playbooks/campaign instructions;
- community moderation;
- run challenges, points/badges narratives and leaderboard communication;
- collect seller/community feedback;
- manage Telegram/Discord/WhatsApp community routines;
- route commercial/payment problems to the correct system/human;
- manage entitlement-aware channel admission once implemented;
- maintain moderation/escalation logs.

### Tools required
**Required**
- GWD operational interface.
- Notion: seller/community playbooks and incident notes.
- GitHub: read; limited docs/issues write.
- Chatwoot/Atendimento.Center shared inbox where available.
- Evolution/WhatsApp integration where approved.
- Telegram bot/admin interface.
- Discord bot/moderation permissions when activated.

### WhatsApp
**One corporate project/business number is enough for V1.**

Recommendation:
- provision **one AtlasHub-controlled WhatsApp Business number for GWD/Novidades community & seller operations**;
- connect it to Evolution/Chatwoot/Atendimento.Center;
- Maia operates the inbox as an agent;
- Maia does **not** own the SIM/number.

Do not create one WA number per Hermes agent.

### Telegram
For bot operation:
- bot itself does **not** need its own phone number;
- BotFather setup requires an AtlasHub-controlled human Telegram account;
- group/channel ownership should remain with an AtlasHub human/corporate admin account using a real phone number;
- Maia operates through bot/admin permissions, not through ownership of that personal identity.

Recommendation:
- **one corporate Telegram admin identity** held by AtlasHub/human control;
- **one or more bots** created for Novidades/GWD workflows;
- no separate real-number Telegram account per agent.

### Discord
- bot/application + role-based permissions;
- no dedicated phone number for Maia;
- human corporate owner/admin remains recoverable outside the agent runtime.

### Social networks
Initially:
- Maia may moderate community comments/inbox where tooling supports it;
- Diana owns campaign direction;
- no dedicated personal social identity for agents.

### Audio/video
Not required for V1.
Optional later:
- approved TTS/voice for community announcements;
- avatar/video only when it adds value.

### Restrictions
- cannot alter order/payment truth;
- cannot manually grant commercial entitlement without governed exception;
- cannot promise seller payouts outside GWD/finance rules;
- cannot access provider payment credentials.

---

## Shared services / gates

### Helena — Governance / Operations Gate
Helena is not counted as a Novidades/GWD team agent.

Helena owns/co-owns:
- permissions;
- secrets provisioning;
- production gates;
- infrastructure coordination;
- agent provisioning;
- audit/governance checks;
- escalation to human direction.

### Atlas QA
On demand:
- browser/mobile;
- Reader/Player;
- auth/entitlement;
- release evidence;
- broken media;
- E2E.

### AMF
On demand:
- premium creative;
- high-production video;
- campaign assets;
- visual systems.

### Domain specialists
On demand for high-risk claims/subject matter.

---

## Minimum account/infrastructure provisioning

### Needed now
1. GitHub permissions for Diana, Tomás, Elisa, Maia according to role.
2. Notion project permissions.
3. Google Drive project folders and role access.
4. Hermes runtime identities/configuration for the four agents.
5. One corporate WA Business number **only when community/seller inbox is activated**.
6. One AtlasHub-controlled Telegram human/admin account with a real phone number **only for ownership/recovery/BotFather**.
7. Telegram bot token(s) when community/course admission is implemented.
8. Scoped VPS media upload path for Elisa when VPS premium video begins.

### Not needed now
- four WA numbers;
- four Telegram real accounts;
- personal SIMs for agents;
- four social-media identities;
- full Cloudflare Stream account provisioning;
- YouTube ownership credentials per agent.

---

## Operating rhythm

### Diana
Daily: project triage.
Weekly: roadmap/gate review.

### Tomás
Continuous/recurring research intake.
Weekly: opportunity shortlist.

### Elisa
Release-driven editorial/media production.
Weekly: content pipeline status.

### Maia
Daily when communities are active: moderation/inbox.
Weekly: seller/community report and gamification cycle.

Every durable decision/evidence must link back to GitHub and/or Notion.
