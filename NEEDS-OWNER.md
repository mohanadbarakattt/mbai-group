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
- **Virlo marketplace**: no public URL yet — keep `/virlo` as internal "building" page until owner supplies a real storefront URL.
- **Be3ly**: no production URL — keep `/be3ly` internal until owner supplies one. Has its own typographic thumbnail (`/thumbnails/be3ly.webp`) since the Nov 2026 refresh.
- **IBNI**: ibni.app is now a live paid product (Nov 2026); site marks it Live. Confirm.
- **TUT**: live product is `https://tutapp.co` — confirm domain branding vs older `tut.app` mentions elsewhere.

## Product count / stats copy
- Hero now says "15 products, demos & projects" (5 ventures + 6 demos + 4 projects listed). Confirm wording.
- Stats "200+ leads delivered" / "3 MENA markets" come from the old AutoLeadss lead-gen agency; unverified.
- `/autoleads` in-site page still shows the old lead-gen agency site; autoleadss.com now sells membership systems.
