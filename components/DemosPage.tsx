import React from 'react';
import Navigation from './Navigation';
import Projects from './Projects';
import Footer from './Footer';
import ResumeFAB from './ResumeFAB';

const DemosPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8f5f1] text-[#111111] overflow-x-hidden">
      <Navigation />
      <main className="pt-32">
        <Projects />
      </main>
      <ResumeFAB />
      <Footer />
    </div>
  );
};

export default DemosPage;
