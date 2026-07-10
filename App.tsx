import React, { lazy, Suspense } from 'react';
import { Switch, Route, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from './autoleads/components/ui/tooltip';
import { Toaster } from './autoleads/components/ui/toaster';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import MarqueeBanner from './components/MarqueeBanner';
import StatsSection from './components/StatsSection';
import FounderCredentials from './components/FounderCredentials';
import TechExpertise from './components/TechExpertise';
import HowWeWork from './components/HowWeWork';
import Demos from './components/Demos';
import Ventures from './components/Ventures';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import NotFound from './components/NotFound';
import Seo from './components/Seo';
import FAQSection from './components/FAQSection';
import { I18nProvider } from './i18n';

const HOME_FAQ_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is MB AI Group?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "MB AI Group (MBAI Solutions) is an AI product studio based in Cairo, Egypt and Dubai, UAE, founded by Mohanad Barakat, a former xAI Human Data Lead. It builds AI agents, data systems, and products for MENA businesses, and ships its own ventures — AutoLeadss, Virlo Studio, IBNI, and TUT.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is AutoLeadss?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AutoLeadss is a hybrid AI + human lead-generation system that sources, qualifies, and books appointments for MENA enterprises, plus a self-serve SaaS for building AI-powered lead funnels. It is live today at autoleadss.com.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many products has MB AI Group shipped or demoed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Four ventures (AutoLeadss, Virlo Studio, IBNI, TUT) plus six additional interactive engineering demos add up to ten working, try-it-live products shown on mbai-group.com.",
      },
    },
  ],
};

const AutoLeadsHome = lazy(() => import('./autoleads/pages/Home'));
const ThreeArabyApp = lazy(() => import('./3araby/App'));
const TestimonialsAdmin = lazy(() => import('./components/admin/TestimonialsAdmin'));
const VirloPage = lazy(() => import('./pages/ventures/VirloPage'));
const IbniPage = lazy(() => import('./pages/ventures/IbniPage'));
const TutPage = lazy(() => import('./pages/ventures/TutPage'));
const PrivacyPolicy = lazy(() => import('./components/legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/legal/TermsOfService'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-transparent text-[#8b93a7]">Loading…</div>
);

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-screen bg-transparent text-[#e8ecf4] overflow-x-hidden">
      <Seo
        title="MB AI Group — Frontier AI for MENA · Cairo & Dubai"
        description="MB AI Group — founded by former xAI Human Data Lead Mohanad Barakat. AutoLeadss, Virlo Studio, IBNI, and TUT: frontier-grade AI products built for the MENA region."
        path="/"
        jsonLd={HOME_FAQ_JSONLD}
      />
      <Navigation />
      <main>
        <Hero />
        <MarqueeBanner />
        <FounderCredentials />
        <Ventures />
        <Demos />
        <TechExpertise />
        <HowWeWork />
        <StatsSection />
        <FAQSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
      <TooltipProvider>
        <WouterRouter>
          <Switch>
            <Route path="/autoleads">
              <Suspense fallback={<div className="autoleads-page min-h-screen flex items-center justify-center bg-background text-foreground">Loading...</div>}>
                <Seo
                  title="AutoLeadss — AI Lead Generation & Funnel-Builder SaaS · MB AI Group"
                  description="AutoLeadss sources, qualifies, and books appointments for MENA enterprises with a hybrid AI + human system, plus a self-serve SaaS for building your own AI lead funnel."
                  path="/autoleads"
                />
                <AutoLeadsHome />
              </Suspense>
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/virlo">
              <Suspense fallback={<PageLoader />}><VirloPage /></Suspense>
            </Route>
            <Route path="/ibni">
              <Suspense fallback={<PageLoader />}><IbniPage /></Suspense>
            </Route>
            <Route path="/tut">
              <Suspense fallback={<PageLoader />}><TutPage /></Suspense>
            </Route>
            <Route path="/privacy">
              <Suspense fallback={<PageLoader />}><PrivacyPolicy /></Suspense>
            </Route>
            <Route path="/terms">
              <Suspense fallback={<PageLoader />}><TermsOfService /></Suspense>
            </Route>
            <Route path="/3araby">
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#f8f5f1] text-[#111111]">Loading...</div>}>
                <Seo
                  title="3araby — Egyptian Franco-Arabic Translator · MB AI Group demo"
                  description="An interactive demo translating Egyptian Franco-Arabic (Arabizi) into English and formal Arabic script, built by MB AI Group."
                  path="/3araby"
                />
                <ThreeArabyApp />
              </Suspense>
            </Route>
            <Route path="/admin">
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900">Loading...</div>}>
                <Seo title="Admin — MB AI Group" description="Internal testimonials moderation dashboard." path="/admin" noindex />
                <TestimonialsAdmin />
              </Suspense>
            </Route>
            <Route path="/">
              <Home />
            </Route>
            <Route>
              <Seo title="Page not found — MB AI Group" description="This page doesn't exist — but the rest of MB AI Group is very much live." path="/404" noindex />
              <NotFound />
            </Route>
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;
