# Needs owner

Items that cannot be finished honestly without owner input. Do not invent URLs, quotes, or approvals to close these.

## Calendly
- Contact previously embedded `https://calendly.com/autoleadss-info/30min`, which shows **calendar unavailable**.
- Embed removed; Contact / Hero / Nav / venture CTAs now fall back to email, WhatsApp, and LinkedIn.
- **Owner must provide a working Calendly (or other booking) URL** before re-enabling an embed or popup.

## Social (Instagram / Facebook)
- Intentionally absent/hidden in `components/Contact.tsx` (`INSTAGRAM_URL` / `FACEBOOK_URL` empty).
- **Owner must provide confirmed profile URLs** before those icons are shown. Do not invent handles.

## Testimonials
- Hardcoded placeholder testimonials removed from `components/data/testimonials.ts`.
- Stats section shows an empty state until real attributed quotes exist.
- Admin/API path (`/api/testimonials`, `DATABASE_URL`, admin auth) still needs owner env/config for production moderation if used.
- **Owner must supply approved, attributable testimonials** (or confirm API + DB wiring) before publishing quotes.

## Legal
- Privacy / Terms remain **DRAFT — PENDING LEGAL REVIEW** (`LegalPageShell`).
- Do not claim lawyer-approved until owner confirms legal review is complete.

## Venture URLs / assets
- **Virlo**: site now presents Virlo Studio, linking https://virlo-studio.vercel.app (verified 200, 8 Nov 2026). No marketplace URL invented.
- **Be3ly**: no production URL — keep `/be3ly` internal until owner supplies one. Has its own typographic thumbnail (`/thumbnails/be3ly.webp`) since the Nov 2026 refresh.
- **IBNI**: site presents the codegen AI app builder at https://ibni-v2.vercel.app (Preview). ibni.app and ibni-umber.vercel.app now serve the COD storefront product and are not linked.
- **TUT**: live product is `https://tutapp.co` — confirm domain branding vs older `tut.app` mentions elsewhere.

## Product count / stats copy
- Hero says "14 products, demos & projects" (5 ventures + 6 demos + 3 open-source/assessment builds).
- Stats "200+ leads delivered" / "3 MENA markets" come from the old AutoLeadss lead-gen agency; unverified.
- `/autoleads` rewritten to the combined offer. Removed unattributed testimonials and the old $50k crypto pricing. Process section still describes the original real-estate lead-gen workflow.
- Ads management / website pricing not published; owner to confirm offer and prices.
