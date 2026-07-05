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

const AutoLeadsHome = lazy(() => import('./autoleads/pages/Home'));
const ThreeArabyApp = lazy(() => import('./3araby/App'));
const TestimonialsAdmin = lazy(() => import('./components/admin/TestimonialsAdmin'));
const VirloPage = lazy(() => import('./pages/ventures/VirloPage'));
const IbniPage = lazy(() => import('./pages/ventures/IbniPage'));
const TutPage = lazy(() => import('./pages/ventures/TutPage'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-transparent text-[#8b93a7]">Loading…</div>
);

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-screen bg-transparent text-[#e8ecf4] overflow-x-hidden">
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
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter>
          <Switch>
            <Route path="/autoleads">
              <Suspense fallback={<div className="autoleads-page min-h-screen flex items-center justify-center bg-background text-foreground">Loading...</div>}>
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
            <Route path="/3araby">
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#f8f5f1] text-[#111111]">Loading...</div>}>
                <ThreeArabyApp />
              </Suspense>
            </Route>
            <Route path="/admin">
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900">Loading...</div>}>
                <TestimonialsAdmin />
              </Suspense>
            </Route>
            <Route path="/">
              <Home />
            </Route>
            <Route>
              <Home />
            </Route>
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
