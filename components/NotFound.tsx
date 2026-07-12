import React from 'react';
import { Link } from 'wouter';
import { Home, Compass } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

/** Dark-themed 404 — matches the frozen V3 master theme (bg-transparent over the body ambient). */
const NotFound: React.FC = () => (
  <div className="min-h-screen bg-transparent text-[#e8ecf4] overflow-x-hidden flex flex-col">
    <Navigation />
    <main className="relative flex-1 flex flex-col items-center justify-center text-center px-6 py-40">
      <div className="aurora aurora-drift w-[420px] h-[420px] -top-10 left-1/2 -translate-x-1/2"
        style={{ background: 'radial-gradient(circle, rgba(227,168,63,0.35), transparent 60%)' }} />
      <div className="absolute inset-0 grid-fade pointer-events-none" />

      <div className="relative">
        <p className="text-8xl md:text-9xl font-black leading-none text-gradient">404</p>
        <h1 className="mt-4 text-2xl md:text-3xl font-bold text-white">This page drifted off the grid.</h1>
        <p className="mt-3 text-[#8b93a7] max-w-md mx-auto">
          The link you followed doesn't exist — but the rest of MB AI Group is very much live.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="btn-primary inline-flex items-center gap-2 px-7 py-3 rounded-xl no-underline">
            <Home size={16} /> Back to home
          </Link>
          <Link href="/#demos" className="btn-ghost inline-flex items-center gap-2 px-7 py-3 rounded-xl no-underline">
            <Compass size={16} /> Explore the demos
          </Link>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default NotFound;
