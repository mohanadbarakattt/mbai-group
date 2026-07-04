import React, { useState } from 'react';
import { Send, MapPin, Mail, Phone, MessageSquare, Linkedin } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', overview: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await fetch('https://formsubmit.co/ajax/mohanad.barakat@mbai-group.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.name, email: formData.email, phone: formData.phone,
          message: formData.overview, _subject: `New Enquiry from ${formData.name}`,
        }),
      });
      if (response.ok) { setSubmitted(true); setFormData({ name: '', email: '', phone: '', overview: '' }); }
    } catch {
      alert('Something went wrong. Please email mohanad.barakat@mbai-group.com directly.');
    } finally { setSending(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openCalendly = () => {
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/mohanad-barakat-mbai-group/30min' });
    }
  };

  const inputClass = "w-full bg-white border border-[#e2d9ce] rounded-xl px-4 py-3 text-[#111111] placeholder:text-[#c8bfb4] focus:outline-none focus:border-[#111111] transition-colors";

  return (
    <section id="contact" className="py-24 px-4 md:px-6 bg-[#f0ebe3]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left col */}
          <div className="space-y-8">
            <div>
              <p className="text-[#9a9490] text-xs font-semibold uppercase tracking-[0.2em] mb-4">Get in Touch</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4">
                Ready to Fill Your Pipeline?
              </h2>
              <p className="text-[#6b6460] text-base leading-relaxed max-w-md">
                Tell us about your market and goals. We'll design a lead generation campaign and get your first appointments booked.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { icon: <Mail size={18} />, label: 'Email', content: <a href="mailto:mohanad.barakat@mbai-group.com" className="text-[#111111] hover:underline break-all">mohanad.barakat@mbai-group.com</a> },
                { icon: <Linkedin size={18} />, label: 'LinkedIn', content: <a href="https://www.linkedin.com/in/mohanad-barakat-4b8a9b109/" target="_blank" rel="noopener noreferrer" className="text-[#111111] hover:underline">LinkedIn Profile</a> },
                { icon: <MapPin size={18} />, label: 'Base of Operations', content: <span className="text-[#111111]">Cairo, Egypt</span> },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-[#e2d9ce] rounded-xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#f0ebe3] flex items-center justify-center text-[#6b6460] shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-[#9a9490] uppercase tracking-wider mb-0.5">{item.label}</p>
                    <div className="text-sm font-medium">{item.content}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white border border-[#e2d9ce] rounded-2xl p-8">
            {submitted ? (
              <div className="h-[420px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-[#f0ebe3] rounded-full flex items-center justify-center text-[#6b6460] mb-6">
                  <Send size={28} />
                </div>
                <h4 className="text-2xl font-bold text-[#111111] mb-2">Message Sent</h4>
                <p className="text-[#6b6460]">We'll get back to you shortly.</p>
                <button onClick={() => setSubmitted(false)} className="mt-8 text-sm text-[#111111] underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#9a9490] uppercase tracking-wider">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="Your Name" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#9a9490] uppercase tracking-wider">Phone</label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-4 top-3.5 text-[#c8bfb4]" />
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={`${inputClass} pl-10`} placeholder="+20 ..." />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#9a9490] uppercase tracking-wider">Email</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-4 top-3.5 text-[#c8bfb4]" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className={`${inputClass} pl-10`} placeholder="email@company.com" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#9a9490] uppercase tracking-wider">Enquiry Overview</label>
                  <div className="relative">
                    <MessageSquare size={15} className="absolute left-4 top-3.5 text-[#c8bfb4]" />
                    <textarea name="overview" value={formData.overview} onChange={handleChange} required rows={4}
                      className={`${inputClass} pl-10 resize-none`} placeholder="Tell us about your market, target area, and goals..." />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button type="submit" disabled={sending}
                    className="flex-1 bg-[#111111] hover:bg-[#2a2a2a] text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                    {sending ? 'Sending...' : <><Send size={16} /> Send Enquiry</>}
                  </button>
                  <button type="button" onClick={openCalendly}
                    className="flex-1 border border-[#e2d9ce] hover:border-[#111111] text-[#444] hover:text-[#111111] font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                    <MessageSquare size={16} /> Schedule a Meeting
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
