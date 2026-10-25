-- GWD affiliate attribution on digital checkouts + refund/chargeback states (26/10/2026). Additive, no data change.
-- attribution: opaque GWD member code + utm_* captured on the offer page; forwarded (signed) to GWD by digital-webhook
-- only when the shared secret 'gwd_events_secret' exists in digital_runtime_secrets.
alter table public.digital_checkout_intents add column if not exists attribution jsonb not null default '{}'::jsonb;
alter table public.digital_checkout_intents drop constraint if exists digital_checkout_intents_status_check;
alter table public.digital_checkout_intents add constraint digital_checkout_intents_status_check
  check (status = any (array['creating','pending','processing','succeeded','failed','canceled','expired','refunded','chargeback']));
create index if not exists digital_checkout_intents_gwd_ref_idx on public.digital_checkout_intents ((attribution->>'gwd_ref')) where attribution ? 'gwd_ref';
-- ROLLBACK: drop index digital_checkout_intents_gwd_ref_idx; restore the previous status check (without refunded,
-- chargeback) only if no rows use them; alter table ... drop column attribution;
