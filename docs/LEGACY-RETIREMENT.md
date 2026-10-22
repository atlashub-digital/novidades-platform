# Legacy Retirement Plan

Status: **Controlled decommission plan**

## Keep as migration source
- existing digital Reader UI;
- digital content blocks;
- protected asset concepts;
- selected product copy/metadata;
- selected tools;
- PLR inventory/audit records;
- source template inventory.

## Disable from active target surface
- direct XPAYMENTS purchase calls;
- project-level XPAYMENTS webhooks;
- local payment-state authority;
- local entitlement authority;
- public site-template catalog;
- physical-first storefront positioning.

## Do not delete yet
During rebaseline do **not** destructively remove:
- legacy public-schema tables;
- stored objects;
- old migrations;
- historical checkout/entitlement rows;
- source manifests;
- site-template source data.

These remain evidence until migration is reconciled.

## novidades-digital repository

Migration plan:
1. preserve Git history;
2. identify any unique code/assets not present in `novidades-platform`;
3. migrate only useful primitives;
4. remove it from deployment/DNS;
5. archive the repository after production cutover evidence.

## Supabase Edge Functions

Target disposition:
- `digital-checkout` — RETIRE after ARO checkout cutover;
- `digital-webhook` — RETIRE after ARO cutover;
- `digital-access` — REPLACE with ARO entitlement-backed access;
- `digital-reader` — KEEP LOGIC / MIGRATE authorization;
- import/smoke functions — archive/retire after migration evidence;
- site-template functions — disable/retire after template surface is removed.

## Destructive cleanup gate

Only drop legacy tables/functions/storage after:
- data inventory exported;
- active references = zero;
- production traffic = zero;
- rollback window elapsed;
- explicit cleanup GO.
