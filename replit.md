# AutoLeads by MB AI Solutions — Landing Page

## Project Overview
Professional portfolio website for Mohanad Barakat, former xAI Human Data Lead, showcasing AI/ML expertise and projects for the MENA region. Includes an integrated AutoLeads product page.

## Architecture
- **Framework**: React + TypeScript + Vite
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin
- **Routing**: `wouter` for client-side routing (`/` = portfolio, `/autoleads` = product page)
- **State**: `@tanstack/react-query` for data fetching (AutoLeads)
- **UI**: Custom components (portfolio) + shadcn/ui with Radix primitives (AutoLeads)

## Key Routes
- `/` — Main portfolio (hero, experience, tech stack, projects, contact)
- `/autoleads` — AutoLeads product page (lead generation service)

## Directory Structure
```
/                       — Root (portfolio)
├── App.tsx             — Main app with wouter routing
├── index.tsx           — React entry point
├── index.html          — HTML shell
├── index.css           — Combined CSS (portfolio + AutoLeads themes)
├── vite.config.ts      — Vite config with Tailwind plugin
├── components/         — Portfolio components
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── Experience.tsx
│   ├── TechStack.tsx
│   ├── Projects.tsx
│   ├── Entrepreneurship.tsx
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   └── ResumeFAB.tsx
├── autoleads/          — AutoLeads product (integrated from separate project)
│   ├── pages/Home.tsx  — AutoLeads main page
│   ├── components/     — AutoLeads components (sections, layout, ui)
│   ├── hooks/          — Custom hooks
│   ├── data/           — Data files
│   └── lib/utils.ts    — cn() utility
└── public/
    ├── autoleads-images/  — AutoLeads images
    ├── sonicboom/         — Sonic Boom demo screenshots
    ├── neobank/           — Neobank demo screenshots
    ├── 3araby/            — 3ARABY demo screenshots
    ├── masrguide/         — Masr Guide demo screenshots
    └── Mohanad_Barakat_CV.pdf
```

## CSS Architecture
- Portfolio uses dark theme (bg #020617, cyan accents)
- AutoLeads uses light theme scoped under `.autoleads-page` class
- CSS variables in `:root` for portfolio, overridden in `.autoleads-page` for AutoLeads
- Custom classes: `glass-panel`, `glass-card`, `text-glow`, `xai-glow` (portfolio); `hero-gradient-text`, `accent-gradient-text`, `hero-blob-*` (AutoLeads)

## External Integrations
- Calendly badge widget for scheduling (loaded via CDN in index.html)
- Contact form sends to mohanad.barakat@mbai-group.com
- Fonts: Inter (portfolio), Outfit + Plus Jakarta Sans (AutoLeads)

## Key Dependencies
- react, react-dom, wouter, framer-motion
- @tanstack/react-query, @radix-ui/* (various), lucide-react
- tailwindcss, @tailwindcss/vite, tw-animate-css
- class-variance-authority, clsx, tailwind-merge
- sonner, zod, react-hook-form, @hookform/resolvers
