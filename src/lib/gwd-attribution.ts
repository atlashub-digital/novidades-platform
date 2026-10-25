/** GWD affiliate attribution, kept first-party on novidades.store from the click to the checkout session.
 *  The GWD link (goworld.digital/r/<id>) lands on the offer page with gwd_ref + utm_*; we keep them for 30 days
 *  (last click wins) and send them with the checkout request. No personal data: only the opaque member code. */
const KEY = "nv:gwd-attribution";
const TTL_MS = 30 * 24 * 60 * 60 * 1000;
const UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export type GwdAttribution = { gwd_ref: string; utm: Partial<Record<(typeof UTM)[number], string>>; landing: string; at: number };

export function captureGwdAttribution(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("gwd_ref")?.toLowerCase() ?? "";
    if (!/^[a-z0-9]{8,16}$/.test(ref)) return;
    const utm: GwdAttribution["utm"] = {};
    for (const key of UTM) {
      const value = params.get(key);
      if (value && /^[A-Za-z0-9._-]{1,128}$/.test(value)) utm[key] = value;
    }
    const record: GwdAttribution = { gwd_ref: ref, utm, landing: window.location.pathname.slice(0, 200), at: Date.now() };
    localStorage.setItem(KEY, JSON.stringify(record));
  } catch {
    /* storage unavailable: checkout works without attribution */
  }
}

export function readGwdAttribution(): GwdAttribution | null {
  try {
    const record = JSON.parse(localStorage.getItem(KEY) || "null") as GwdAttribution | null;
    if (!record || Date.now() - record.at > TTL_MS || !/^[a-z0-9]{8,16}$/.test(record.gwd_ref)) return null;
    return record;
  } catch {
    return null;
  }
}
