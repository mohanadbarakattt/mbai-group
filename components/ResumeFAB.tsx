import React from 'react';
import { FileText } from 'lucide-react';

const ResumeFAB: React.FC = () => {
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
    <div className="fixed bottom-8 right-8 z-40">
      <button 
        onClick={handleDownload}
        className="flex items-center gap-3 px-6 py-4 bg-[#111111] hover:bg-[#2a2a2a] text-white rounded-full  transition-all transform hover:scale-105 group relative cursor-pointer"
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