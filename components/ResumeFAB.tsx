import React, { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';

const ResumeFAB: React.FC = () => {
  // The hero already has an identical inline "Download CV" button — only surface
  // this floating duplicate once the user has scrolled that button out of view.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDownload = async () => {
    try {
      const response = await fetch('/Mohanad_Barakat_CV.pdf');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Mohanad_Barakat_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      window.open('/Mohanad_Barakat_CV.pdf', '_blank');
    }
  };

  return (
    <div
      className={`fixed bottom-8 right-8 z-40 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-hidden={!visible}
    >
      <button
        onClick={handleDownload}
        tabIndex={visible ? 0 : -1}
        className="btn-primary flex items-center gap-3 px-6 py-4 rounded-full transition-all transform hover:scale-105 group relative cursor-pointer"
        aria-label="Download Resume"
      >
        <FileText size={24} />
        <span className="font-semibold tracking-wide text-sm uppercase">Download CV</span>
        
        <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      </button>
    </div>
  );
};

export default ResumeFAB;