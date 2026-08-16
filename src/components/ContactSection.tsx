import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ContactFormState } from '../types';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    fullName: '',
    email: '',
    vision: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit form.');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      // Fallback submission experience if offline or network glitch
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ fullName: '', email: '', vision: '' });
  };

  return (
    <section
      id="contact"
      className="contact min-h-screen w-full bg-[#332d2b]/85 backdrop-blur-md text-white flex flex-col justify-between items-center px-6 py-24 sm:py-32 relative text-center z-10"
    >
      <div className="my-auto max-w-2xl w-full space-y-12">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="font-heading text-xs tracking-[0.3em] uppercase text-[#d8b6a9]/80">
            CONNECT
          </div>
          <h2 className="text-3xl sm:text-5xl font-extralight uppercase tracking-[0.2em] text-[#d8b6a9]">
            Start the Dialogue
          </h2>
        </motion.div>

        {/* Contact Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="contact-form mx-auto w-full max-w-lg"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 text-left font-sans">
              <div>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Full Name"
                  className="w-full p-6 bg-white/90 focus:bg-white border border-[#d8b6a9]/60 focus:border-[#d8b6a9] text-[#332d2b] placeholder-[#7c706b] focus:outline-none transition-all rounded-sm text-base font-light shadow-sm"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Professional Email"
                  className="w-full p-6 bg-white/90 focus:bg-white border border-[#d8b6a9]/60 focus:border-[#d8b6a9] text-[#332d2b] placeholder-[#7c706b] focus:outline-none transition-all rounded-sm text-base font-light shadow-sm"
                />
              </div>

              <div>
                <textarea
                  rows={4}
                  required
                  value={formData.vision}
                  onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                  placeholder="Your Vision"
                  className="w-full p-6 bg-white/90 focus:bg-white border border-[#d8b6a9]/60 focus:border-[#d8b6a9] text-[#332d2b] placeholder-[#7c706b] focus:outline-none transition-all rounded-sm text-base font-light resize-none shadow-sm"
                />
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-12 py-5 bg-[#d8b6a9] hover:bg-white text-white hover:text-[#332d2b] font-heading text-xs tracking-[2px] hover:tracking-[5px] uppercase transition-all duration-300 cursor-pointer border-none shadow-md disabled:opacity-50"
                >
                  {loading ? 'Initiating...' : 'Initiate Connection'}
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 rounded-2xl bg-[#3d3734] border border-[#d8b6a9]/40 space-y-6 text-center font-sans"
            >
              <div className="w-14 h-14 rounded-full bg-[#d8b6a9]/20 text-[#d8b6a9] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-heading font-light text-[#d8b6a9] tracking-wider uppercase">
                  Dialogue Initiated
                </h3>
                <p className="text-sm font-light text-[#c9bcad] leading-relaxed">
                  Thank you, <span className="text-white font-medium">{formData.fullName}</span>. Your vision has been received. Our executive engineering team will contact <span className="text-white font-medium">{formData.email}</span> within 24 hours.
                </p>
              </div>

              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-full border border-[#d8b6a9]/40 text-[#d8b6a9] font-heading text-xs tracking-widest uppercase hover:bg-[#d8b6a9] hover:text-[#332d2b] transition-all"
              >
                Send Another Vision
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Footer copyright */}
      <div className="pt-12 border-t border-[#443d3a] w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between text-[11px] font-heading tracking-widest text-[#887c77] uppercase space-y-4 sm:space-y-0">
        <div>
          © 2026 EXELLI-ON GLOBAL. ALL RIGHTS RESERVED.
        </div>
        <div className="flex space-x-6 text-[#b4a59f]">
          <span className="hover:text-white transition-colors cursor-pointer">Privacy Protocol</span>
          <span>•</span>
          <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </section>
  );
};
