# First Missions — Novidades + GWD Workforce

Status: **READY TO START — 2026-10-16**

Runtime provisioning has been verified by Helena for:
- Diana — `nov-diana`
- Tomás — `nov-tomas`
- Elisa — `nov-elisa`
- Maia — `nov-maia`

## Operating rule

Diana is the single consolidation point.

Tomás, Elisa and Maia may work in parallel, but:
- local container drafts are not canonical;
- durable evidence must move to GitHub / Notion / Drive;
- no agent may bypass the current NO-GO gates;
- no production payment, DNS, destructive migration, root or provider secret access.

---

## Mission D1 — Diana

### Objective
Create the integrated Novidades + GWD execution board and coordinate the first release cycle.

### Inputs
- Novidades PR #1
- GWD architecture PR #4
- GWD implementation PR #5
- Notion project
- current ARO integration constraints

### Deliverables
1. current-state map by workstream:
   - Novidades UI/product;
   - content pipeline;
   - WebPlayer;
   - ARO integration;
   - GWD foundation;
   - seller/community;
2. dependency graph;
3. P0/P1/P2 execution order;
4. blockers requiring Helena/human decision;
5. assignment of Tomás/Elisa/Maia outputs into the board.

### First recommended P0 ordering
1. choose first pilot release(s);
2. define source/rights evidence;
3. define WebPlayer/Reader delivery path;
4. implement Novidades V2 data model;
5. implement ARO offer/entitlement binding;
6. implement GWD participant/referral spine;
7. run preview/E2E;
8. only then discuss production cutover.

### Acceptance
- one integrated board;
- no duplicated workstream ownership;
- every task links to evidence/source;
- clear GO/NO-GO markers.

---

## Mission T1 — Tomás

### Objective
Produce the first high-confidence digital-content opportunity shortlist.

### Priority
Prefer material:
1. created by AtlasHub / the user;
2. with explicit rights evidence;
3. with strong existing source material;
4. that can become an eBook/course/webinar quickly;
5. that demonstrates WebReader/WebPlayer value.

### Deliverable
Shortlist of 5–10 candidates scored on:
- audience/problem;
- format;
- demand signal;
- differentiation;
- source location;
- provenance;
- rights status;
- update effort;
- media effort;
- commercial potential;
- recommended next action.

### Important
If rights are unclear: mark `RIGHTS_PENDING`.
Do not recommend publication merely because material exists.

---

## Mission E1 — Elisa

### Objective
Prepare 1–2 pilot releases for the new Novidades content model.

### Candidate characteristics
Prefer:
- rights controlled/clear;
- enough content to demonstrate real value;
- one Reader-oriented product and/or one video/course product;
- manageable production effort.

### Deliverables per pilot
- stable content ID;
- proposed release/version;
- product promise;
- target audience;
- module/lesson structure;
- preview/sample plan;
- WebReader or WebPlayer manifest;
- source manifest;
- rights/provenance checklist;
- required media/assets;
- ARO entitlement key proposal;
- known blockers.

### WebPlayer rule
For V1:
- sales/sample video can be embedded publicly;
- premium lesson may use protected VPS;
- existing Telegram course may remain partially/fully Telegram;
- YouTube/Cloudflare are future-compatible but not required.

---

## Mission M1 — Maia

### Objective
Design the first seller/community operating layer without activating public channels.

### Deliverables
1. seller onboarding flow;
2. affiliate vs authorized-seller onboarding differences;
3. community code of conduct;
4. moderation/escalation matrix;
5. weekly gamification loop;
6. basic FAQ;
7. proposed WhatsApp/Telegram/Discord channel topology;
8. entitlement-aware Telegram admission flow;
9. list of actions that require human/Helena approval.

### Restrictions
- no public channel activation;
- no manual commercial entitlement grant;
- no promise of payout;
- no access to payment/provider secrets.

---

## First consolidation

Diana must consolidate the first cycle into:
- completed;
- in progress;
- blocked;
- decision required;
- next 3 executable actions.

No percentage-complete claims without evidence.
