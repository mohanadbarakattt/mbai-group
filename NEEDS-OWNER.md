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
- **Be3ly**: no production URL — keep `/be3ly` internal until owner supplies one. Thumbnail currently reuses `/thumbnails/project-3.png`; replace with a Be3ly asset when available.
- **IBNI**: external demo is `https://ibni.app` (DEMO_MODE) — confirm if that should stay the primary CTA.
- **TUT**: live product is `https://tutapp.co` — confirm domain branding vs older `tut.app` mentions elsewhere.

## Product count / stats copy
- Hero still says "10 shipped products" via i18n; revisit with owner if that number should change after venture-truth updates.
