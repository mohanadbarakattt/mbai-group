import React from 'react';
import { Link } from 'wouter';
import { Home, Compass } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

/** Dark-themed 404 — matches the frozen V3 master theme (bg-transparent over the body ambient). */
const NotFound: React.FC = () => (
  <div className="min-h-screen bg-transparent text-[#14110f] overflow-x-hidden flex flex-col">
    <Navigation />
    <main className="relative flex-1 flex flex-col items-center justify-center text-center px-6 py-40">
<div className="hidden" />

      <div className="relative">
        <p className="text-8xl md:text-9xl font-semibold leading-none text-gradient">404</p>
        <h1 className="mt-4 text-2xl md:text-3xl font-bold text-[#14110f]">This page is not here.</h1>
        <p className="mt-3 text-[#6b645c] max-w-md mx-auto">
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
