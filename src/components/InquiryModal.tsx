import React, { useState, useEffect } from 'react';
import { X, Send, Lock, Phone, User, Globe, ShieldCheck, Briefcase, Landmark } from 'lucide-react';
import { Lead } from '../types';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDiscussionType?: string;
  onSuccess: (lead: Lead) => void;
}

const investorTypes = [
  'Family Office',
  'Hospitality Group',
  'Hotel Operator',
  'Strategic Investor',
  'Private Equity / Investment Firm',
  'HNWI Private Investor',
  'Acquisition Prospect',
];

const discussionTypes = [
  'Strategic Equity Participation',
  'Growth Capital Partnership',
  'Joint Venture Discussion',
  'Hospitality Operator Partnership',
  'Majority Investment',
  'Full Asset Acquisition / Buyout',
];

const capitalRanges = [
  '1/3rd Strategic Partnership Block (33.3% Equity)',
  'Full Buyout / Asset Acquisition (100% Equity)',
  'Other Strategic / Joint Venture Structure',
];

export default function InquiryModal({ isOpen, onClose, defaultDiscussionType, onSuccess }: InquiryModalProps) {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('United Arab Emirates (UAE)');
  const [phone, setPhone] = useState('');
  const [investorType, setInvestorType] = useState('Family Office');
  
  // Set default based on click context
  const [discussionType, setDiscussionType] = useState('Full Asset Acquisition / Buyout');
  const [capitalRange, setCapitalRange] = useState('Full Buyout / Asset Acquisition (100% Equity)');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (defaultDiscussionType) {
      if (defaultDiscussionType.includes('1/3rd') || defaultDiscussionType.includes('33.3%') || defaultDiscussionType.includes('third')) {
        setDiscussionType('Strategic Equity Participation');
        setCapitalRange('1/3rd Strategic Partnership Block (33.3% Equity)');
      } else if (defaultDiscussionType.includes('Full') || defaultDiscussionType.includes('buyout') || defaultDiscussionType.includes('100%')) {
        setDiscussionType('Full Asset Acquisition / Buyout');
        setCapitalRange('Full Buyout / Asset Acquisition (100% Equity)');
      } else {
        setDiscussionType('Joint Venture Discussion');
        setCapitalRange('Other Strategic / Joint Venture Structure');
      }
    }
  }, [defaultDiscussionType]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !country || !phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newLead: Lead = {
        id: Math.random().toString(36).substring(2, 11),
        name,
        country,
        phone,
        investmentAmount: `${investorType} | ${discussionType} | ${capitalRange}`,
        notes: 'Private strategic memorandum request submitted from modal.',
        submittedAt: new Date().toLocaleTimeString(),
      };

      const existingLeads = JSON.parse(localStorage.getItem('wayanad_leads') || '[]');
      localStorage.setItem('wayanad_leads', JSON.stringify([...existingLeads, newLead]));

      setIsSubmitting(false);
      setSubmitSuccess(true);
      onSuccess(newLead);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-[#051310]/85 backdrop-blur-md font-sans">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#0B251E] border border-[#c5a059]/30 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 z-10" aria-label="Close enquiry modal">
          <X className="w-5 h-5" />
        </button>

        <div className="bg-[#051310] border-b border-[#c5a059]/20 p-6 pr-14">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#ebd49b]" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#c5a059] font-bold font-mono">Private Access Request</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-white uppercase font-bold tracking-wide">Strategic Memorandum</h2>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed font-light">
            For qualified strategic partners, hotel groups, family offices, operators and acquisition prospects only.
          </p>
        </div>

        {submitSuccess ? (
          <div className="p-8 text-center space-y-5">
            <ShieldCheck className="w-16 h-16 text-[#c5a059] mx-auto" />
            <h3 className="text-2xl font-serif text-[#ebd49b] uppercase font-bold">Request Received</h3>
            <p className="text-gray-300 text-sm leading-relaxed font-light">
              Your enquiry has been captured. Our team will review the investor profile and follow up for private discussion.
            </p>
            <button onClick={onClose} className="bg-[#c5a059] text-[#0B251E] font-bold uppercase tracking-widest px-6 py-3 rounded">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <label className="block">
              <span className="text-[10px] uppercase tracking-widest text-[#ebd49b] font-bold flex items-center gap-2 mb-2"><User className="w-3.5 h-3.5" /> Full Name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-[#051310] border border-[#c5a059]/20 rounded px-4 py-3 text-sm outline-none focus:border-[#c5a059]" />
            </label>

            <label className="block">
              <span className="text-[10px] uppercase tracking-widest text-[#ebd49b] font-bold flex items-center gap-2 mb-2"><Globe className="w-3.5 h-3.5" /> Country</span>
              <input value={country} onChange={(e) => setCountry(e.target.value)} required className="w-full bg-[#051310] border border-[#c5a059]/20 rounded px-4 py-3 text-sm outline-none focus:border-[#c5a059]" />
            </label>

            <label className="block">
              <span className="text-[10px] uppercase tracking-widest text-[#ebd49b] font-bold flex items-center gap-2 mb-2"><Phone className="w-3.5 h-3.5" /> WhatsApp Number</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full bg-[#051310] border border-[#c5a059]/20 rounded px-4 py-3 text-sm outline-none focus:border-[#c5a059]" />
            </label>

            <label className="block">
              <span className="text-[10px] uppercase tracking-widest text-[#ebd49b] font-bold flex items-center gap-2 mb-2"><Briefcase className="w-3.5 h-3.5" /> Investor Type</span>
              <select value={investorType} onChange={(e) => setInvestorType(e.target.value)} className="w-full bg-[#051310] border border-[#c5a059]/20 rounded px-4 py-3 text-sm outline-none focus:border-[#c5a059]">
                {investorTypes.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>

            <label className="block">
              <span className="text-[10px] uppercase tracking-widest text-[#ebd49b] font-bold flex items-center gap-2 mb-2"><Landmark className="w-3.5 h-3.5" /> Discussion Type</span>
              <select value={discussionType} onChange={(e) => setDiscussionType(e.target.value)} className="w-full bg-[#051310] border border-[#c5a059]/20 rounded px-4 py-3 text-sm outline-none focus:border-[#c5a059]">
                {discussionTypes.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>

            <label className="block">
              <span className="text-[10px] uppercase tracking-widest text-[#ebd49b] font-bold mb-2 block">Target Partnership Allotment</span>
              <select value={capitalRange} onChange={(e) => setCapitalRange(e.target.value)} className="w-full bg-[#051310] border border-[#c5a059]/20 rounded px-4 py-3 text-sm outline-none focus:border-[#c5a059]">
                {capitalRanges.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>

            <div className="bg-[#051310] border border-red-400/20 rounded p-3 text-[11px] text-gray-400 leading-relaxed">
              Not intended for retail investment, small-ticket investment plans, crowdfunding, or stay-perk-led participation.
            </div>

            <button disabled={isSubmitting} className="w-full bg-[#c5a059] hover:bg-[#a98041] disabled:opacity-60 text-[#0B251E] font-bold uppercase tracking-[0.18em] py-4 rounded flex items-center justify-center gap-2">
              {isSubmitting ? 'Submitting...' : 'Request Private Access'} <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
