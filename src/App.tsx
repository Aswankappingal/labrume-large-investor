import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowRight,
  Building,
  CheckCircle2,
  Compass,
  Crown,
  FileText,
  Landmark,
  Lock,
  MapPin,
  Menu,
  PhoneCall,
  ShieldCheck,
  TrendingUp,
  Users,
  X,
  Video,
  Play,
  FileCheck,
} from 'lucide-react';
import InquiryModal from './components/InquiryModal';
import ROICalculator from './components/ROICalculator';
import PitchDeckViewer from './components/PitchDeckViewer';
import AppreciationChart from './components/AppreciationChart';
import LeadHistory from './components/LeadHistory';
import { Lead } from './types';

const phoneNumber = '914936220594';
const whatsappText = encodeURIComponent(
  'I am interested in the confidential strategic investment / acquisition memorandum for the Wayanad premium hospitality asset. Please share the next steps.'
);
const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${whatsappText}`;

const media = {
  hero: 'https://lh3.googleusercontent.com/d/1LuA0lWL-0nV-lqOrYBzs-X3p5-daGqaq',
  exterior: 'https://lh3.googleusercontent.com/d/1FjTrnA7G4RAh7ScDZRP_TR6J9nnRUNQE',
  pool: 'https://lh3.googleusercontent.com/d/1J4jjEkN9lVF7IscFYaL8_uL08ryoWfUw',
  landscape: 'https://lh3.googleusercontent.com/d/1Ju9lPAk2xhLzxy8cttumsgi7riu-XL-v',
  interior: 'https://lh3.googleusercontent.com/d/1WZ3o7AEIwT3sYYyUlJvOgxvss2VsiD0C',
  video: 'https://drive.google.com/file/d/1cqzvF1UtJ6i9goH5j0wO867h_b14Vwkn/preview',
};

const heroSlides = [
  { img: media.exterior, label: 'Exterior — G+6 Premium Structure', sub: 'National Highway Frontage · Wayanad' },
  { img: media.hero,     label: 'Property Scale & Elevation', sub: 'Completed 46,500 Sq.Ft. Built-Up Asset' },
  { img: media.pool,     label: 'Infinity Pool & Recreation Deck', sub: 'Premium Guest Infrastructure' },
  { img: media.landscape,label: 'Wayanad Destination Setting', sub: 'Eco-Resort Corridor · High Tourism Demand' },
  { img: media.interior, label: 'Interior Quality & Finishes', sub: '43 Keys · Executive Suites & Grand Suites' },
];

const bRollClips = [
  {
    id: '1cqzvF1UtJ6i9goH5j0wO867h_b14Vwkn',
    title: 'Primary Cinematic Walkthrough',
    category: 'Cinematic Showcase',
    desc: 'Cinematic overview of property scale, premium guest suites, and destination setting.',
    thumbnail: media.hero,
  },
  {
    id: '1eCbIh0mPwbtNQBqXWw6ASeAdN9CzBBRA',
    title: 'Aerial Flyover & Elevation',
    category: 'Drone Footage',
    desc: 'High-altitude drone sweep showing clear boundaries, highway frontage, and architectural height.',
    thumbnail: media.exterior,
  },
  {
    id: '1GOH2qJwU-Moq5IdBDWmrx4VJRrFVqeHJ',
    title: 'Highway Frontage & Boundary',
    category: 'Drone Footage',
    desc: 'Drone perspective tracking direct NH access corridor and local panchayat boundary contours.',
    thumbnail: media.landscape,
  },
  {
    id: '1UT0ykJ6Pz6vE73rUinT6E15La3GZP7bc',
    title: 'Wayanad Mountain Panorama',
    category: 'Drone Footage',
    desc: 'Scenic high-elevation drone view highlighting the surrounding lush green eco-resort corridor.',
    thumbnail: media.landscape,
  },
  {
    id: '1M4obPeTm6813vNeA4PcZ91dva5mbL5bi',
    title: 'Entrance & Building Façade',
    category: 'Ground Footage',
    desc: 'Ground camera tracking the premium G+6 completed structural development and driveways.',
    thumbnail: media.hero,
  },
  {
    id: '16yRbJ0-3WHgQgKkTnYFTw0R95A1EU0b0',
    title: 'Infinity Pool & Recreational Deck',
    category: 'Ground Footage',
    desc: 'Ground footage of the premium infinity guest pool and outdoor recreational spaces.',
    thumbnail: media.pool,
  },
  {
    id: '1nlf7xYGPNkGMyM23grSk2kFon6giuO3u',
    title: 'Signature Spa & Wellness Wings',
    category: 'Ground Footage',
    desc: 'Walkthrough of operational wellness rooms, reception lobby, and guest facilities.',
    thumbnail: media.interior,
  },
];


const navItems = [
  { label: 'Asset Overview', href: '#asset-overview' },
  { label: 'Opportunity', href: '#opportunity' },
  { label: 'Gallery', href: '#asset-gallery' },
  { label: 'Contact', href: '#contact' },
];

const assetSnapshot = [
  { icon: Building, title: '43 Premium Keys', detail: 'Revenue-generating accommodation inventory' },
  { icon: MapPin, title: 'Wayanad, Kerala', detail: 'Premium tourism and eco-resort corridor' },
  { icon: CheckCircle2, title: 'Operational Asset', detail: 'Developed hospitality infrastructure' },
  { icon: Compass, title: 'Expansion Potential', detail: 'Scope for strategic growth and repositioning' },
  { icon: ShieldCheck, title: 'Brand Confidential', detail: 'Property and location disclosed; brand protected' },
];

const attentionCards = [
  ['Existing Operational Asset', 'A developed physical hospitality property with completed infrastructure, reducing construction-stage uncertainty for strategic buyers.'],
  ['Premium Tourism Exposure', 'Positioned in Wayanad, one of Kerala’s strongest leisure tourism corridors with high NRI and domestic travel appeal.'],
  ['High Replacement Value', 'Land, built-up infrastructure, rooms, pool, public areas and hospitality systems create meaningful asset replacement value.'],
  ['Expansion-Ready Platform', 'Suitable for growth capital, operating partnership, brand tie-up, repositioning, majority investment or full acquisition.'],
  ['Strategic Buyer Fit', 'Relevant for hotel operators, family offices, hospitality groups, private equity participants and HNWI acquisition prospects.'],
  ['Confidential Process', 'Brand identity and sensitive documents are released only after initial qualification and controlled discussion.'],
];

const transactionStructures = [
  'Strategic Equity Participation',
  'Growth Capital Partnership',
  'Joint Venture Discussion',
  'Hospitality Operator Partnership',
  'Majority Investment',
  'Full Asset Acquisition / Buyout',
];

const galleryItems = [
  { title: 'Property Scale', label: 'Asset Overview', image: media.hero },
  { title: 'Exterior Development', label: 'Built Hospitality Asset', image: media.exterior },
  { title: 'Pool & Recreation', label: 'Premium Guest Infrastructure', image: media.pool },
  { title: 'Destination Setting', label: 'Wayanad Tourism Advantage', image: media.landscape },
  { title: 'Interior Quality', label: 'Accommodation & Public Areas', image: media.interior },
];

function SectionHeader({ eyebrow, title, desc, dark = true }: { eyebrow: string; title: string; desc?: string; dark?: boolean }) {
  return (
    <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
      <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-bold font-mono">{eyebrow}</span>
      <h2 className={`text-3xl md:text-5xl font-serif uppercase tracking-wide leading-tight font-bold ${dark ? 'text-white' : 'text-[#2A2D34]'}`}>
        {title}
      </h2>
      <div className="w-20 h-1 bg-[#c5a059] mx-auto" />
      {desc && <p className={`${dark ? 'text-gray-300' : 'text-gray-700'} text-sm md:text-base leading-relaxed font-light`}>{desc}</p>}
    </div>
  );
}

export default function App() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inlineName, setInlineName] = useState('');
  const [inlineCountry, setInlineCountry] = useState('United Arab Emirates (UAE)');
  const [inlinePhone, setInlinePhone] = useState('');
  const [inlineInvestorType, setInlineInvestorType] = useState('Family Office');
  const [inlineDiscussion, setInlineDiscussion] = useState('Full Asset Acquisition / Buyout');
  const [inlineCapital, setInlineCapital] = useState('1/3rd Strategic Partnership Block (33.3% Equity)');
  const [inlineSubmitted, setInlineSubmitted] = useState(false);
  const [inlineSubmitting, setInlineSubmitting] = useState(false);

  // Hero carousel state
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroPrev, setHeroPrev] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const markLoaded = useCallback((idx: number) => {
    setLoadedImages(prev => new Set(prev).add(idx));
  }, []);

  const advanceHero = useCallback((dir: 1 | -1 = 1) => {
    setHeroIndex(prev => {
      const next = (prev + dir + heroSlides.length) % heroSlides.length;
      setHeroPrev(prev);
      return next;
    });
  }, []);

  // Only auto-advance once first image has loaded
  useEffect(() => {
    if (!loadedImages.has(0)) return;
    const t = setInterval(() => advanceHero(1), 6000);
    return () => clearInterval(t);
  }, [advanceHero, loadedImages]);

  // High-value investor acquisition states
  const [activeVideoId, setActiveVideoId] = useState('1cqzvF1UtJ6i9goH5j0wO867h_b14Vwkn');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [activeFinTab, setActiveFinTab] = useState<'roi' | 'appreciation'>('roi');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedDealType, setSelectedDealType] = useState<string | undefined>(undefined);

  const openInquiry = () => {
    setSelectedDealType(undefined);
    setIsInquiryOpen(true);
  };

  const handleLeadSuccess = (_lead: Lead) => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleInvestClicked = (dealType: string) => {
    setSelectedDealType(dealType);
    setIsInquiryOpen(true);
  };

  const handleSlideInquiry = (dealType: string) => {
    setSelectedDealType(dealType);
    setIsInquiryOpen(true);
  };

  const handleSelectLead = () => {
    const el = document.getElementById('financial-suite');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineName || !inlineCountry || !inlinePhone) return;
    setInlineSubmitting(true);
    setTimeout(() => {
      const newLead: Lead = {
        id: Math.random().toString(36).substring(2, 11),
        name: inlineName,
        country: inlineCountry,
        phone: inlinePhone,
        investmentAmount: `${inlineInvestorType} | ${inlineDiscussion} | ${inlineCapital}`,
        notes: 'Strategic investor / acquisition enquiry from landing page.',
        submittedAt: new Date().toLocaleTimeString(),
      };
      const existingLeads = JSON.parse(localStorage.getItem('wayanad_leads') || '[]');
      localStorage.setItem('wayanad_leads', JSON.stringify([...existingLeads, newLead]));
      setInlineSubmitting(false);
      setInlineSubmitted(true);
      setRefreshTrigger(prev => prev + 1);
    }, 800);
  };


  return (
    <div className="min-h-screen bg-[#0B251E] text-white selection:bg-[#c5a059] selection:text-[#0B251E] antialiased font-sans">
      <div className="fixed top-0 left-0 w-full h-9 bg-[#051310] border-b border-[#c5a059]/25 z-[1001] flex items-center justify-center px-4 text-center">
        <p className="text-[9px] sm:text-[10px] text-gray-300 tracking-[0.18em] font-semibold uppercase">
          Private Strategic Discussions Worldwide • GCC • UK • Canada • USA • Australia
        </p>
      </div>

      <nav className="fixed top-9 left-0 w-full h-[82px] bg-[#0B251E]/95 backdrop-blur-md border-b border-[#c5a059]/20 z-[1000] px-5 md:px-12 flex items-center justify-between">
        <a href="#hero" className="font-serif font-bold tracking-[0.22em] text-sm md:text-lg uppercase text-white shrink-0 whitespace-nowrap mr-4">
          Premium Hospitality Asset
        </a>
        <div className="hidden xl:flex items-center gap-6 lg:gap-8 text-[10px] lg:text-[11px] uppercase tracking-[0.18em] font-bold">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-gray-200 hover:text-[#c5a059] transition-colors">
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href={`tel:+${phoneNumber}`} className="hidden sm:flex items-center gap-2 text-xs font-mono text-gray-300 hover:text-[#c5a059]">
            <PhoneCall className="w-4 h-4 text-[#c5a059]" /> +91 4936 220 594
          </a>
          <button onClick={openInquiry} className="hidden sm:inline-flex bg-[#c5a059] hover:bg-[#a98041] text-[#0B251E] text-[11px] uppercase tracking-[0.16em] font-bold py-3 px-5 rounded transition-all">
            Request Memorandum
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="xl:hidden p-2 text-gray-300">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed top-[118px] left-0 right-0 z-[999] bg-[#0B251E]/98 border-b border-[#c5a059]/30 p-6 xl:hidden">
          <div className="flex flex-col gap-4 text-xs uppercase tracking-[0.2em] font-bold">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="border-b border-white/10 pb-3 text-gray-200">
                {item.label}
              </a>
            ))}
            <button onClick={openInquiry} className="bg-[#c5a059] text-[#0B251E] py-3 rounded uppercase tracking-widest font-bold">
              Request Memorandum
            </button>
          </div>
        </div>
      )}

      <main className="pt-[118px]">
        <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-16">
          {/* ── Carousel background ───────────────────────────────────── */}
          <div className="absolute inset-0 bg-[#0a1a14]">
            {heroSlides.map((slide, idx) => {
              const isCurrent = idx === heroIndex;
              const isPrev    = idx === heroPrev;
              const isLoaded  = loadedImages.has(idx);
              return (
                <div
                  key={idx}
                  className="absolute inset-0"
                  style={{
                    opacity: isCurrent && isLoaded ? 1 : isPrev && isLoaded ? 0 : 0,
                    zIndex: isCurrent ? 2 : isPrev ? 1 : 0,
                    transition: 'opacity 1600ms ease-in-out',
                  }}
                >
                  <img
                    src={slide.img}
                    alt={slide.label}
                    referrerPolicy="no-referrer"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    onLoad={() => markLoaded(idx)}
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'brightness(0.58)',
                      transform: isCurrent ? 'scale(1.06)' : 'scale(1.0)',
                      transition: 'transform 7s ease-out',
                    }}
                  />
                </div>
              );
            })}
            {/* Subtle gradient — only darkens bottom 35% for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B251E] via-[#0B251E]/40 to-transparent z-10" />
            {/* Light vignette on edges only */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(5,19,16,0.65)_100%)] z-10" />
          </div>

          {/* ── Carousel controls ─────────────────────────────────────── */}
          {/* Prev / Next arrows */}
          <button
            onClick={() => advanceHero(-1)}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#051310]/70 hover:bg-[#c5a059]/80 border border-[#c5a059]/30 hover:border-transparent flex items-center justify-center transition-all group backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <svg className="w-4 h-4 text-[#c5a059] group-hover:text-[#0B251E]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={() => advanceHero(1)}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#051310]/70 hover:bg-[#c5a059]/80 border border-[#c5a059]/30 hover:border-transparent flex items-center justify-center transition-all group backdrop-blur-sm"
            aria-label="Next slide"
          >
            <svg className="w-4 h-4 text-[#c5a059] group-hover:text-[#0B251E]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>

          {/* Slide caption — bottom left */}
          <div className="absolute bottom-24 sm:bottom-10 left-0 right-0 z-30 flex flex-col items-center gap-4">
            <div className="inline-flex flex-col items-center gap-1 bg-[#051310]/60 backdrop-blur-sm border border-[#c5a059]/20 rounded-xl px-5 py-2.5">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#c5a059] font-mono font-bold">{heroSlides[heroIndex].label}</span>
              <span className="text-[9px] text-gray-400 tracking-widest uppercase font-mono">{heroSlides[heroIndex].sub}</span>
            </div>
            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setHeroPrev(heroIndex); setHeroIndex(idx); }}
                  className={`rounded-full transition-all duration-300 ${
                    idx === heroIndex
                      ? 'w-6 h-2 bg-[#c5a059]'
                      : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#051310]/90 border border-[#c5a059]/40 rounded-full">
              <Lock className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold text-[#ebd49b]">
                Brand confidential • Property & location disclosed
              </span>
            </div>

            <div className="space-y-5">
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif text-white uppercase tracking-[0.07em] font-bold leading-tight">
                Strategic Hospitality Asset Opportunity in Wayanad, Kerala
              </h1>
              <p className="text-gray-200 text-base md:text-xl max-w-4xl mx-auto leading-relaxed font-light">
                A premium 43-key hospitality asset positioned for strategic capital, operating partnership, majority investment, or full acquisition discussions. Designed for family offices, hotel groups, HNWIs, hospitality operators and institutional buyers.
              </p>
            </div>

            <div id="asset-overview" className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 max-w-6xl mx-auto pt-4">
              {assetSnapshot.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-[#051310]/90 border border-[#c5a059]/20 rounded-xl p-4 md:p-5 hover:border-[#c5a059]/55 transition-colors">
                    <Icon className="w-5 h-5 text-[#ebd49b] mx-auto mb-3" />
                    <h3 className="text-[11px] md:text-xs uppercase tracking-wider text-[#ebd49b] font-serif font-bold leading-tight">{item.title}</h3>
                    <p className="text-[10px] md:text-[11px] text-gray-400 mt-2 leading-relaxed">{item.detail}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button onClick={openInquiry} className="w-full sm:w-auto bg-[#c5a059] hover:bg-[#a98041] text-[#0B251E] font-bold tracking-[0.18em] uppercase py-4 px-8 rounded inline-flex items-center justify-center gap-2 transition-all">
                Request Strategic Memorandum <ArrowRight className="w-4 h-4" />
              </button>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto border border-[#c5a059] hover:bg-[#c5a059]/10 text-[#ebd49b] font-bold tracking-[0.18em] uppercase py-4 px-8 rounded inline-flex items-center justify-center gap-2 transition-all">
                WhatsApp Discussion
              </a>
            </div>
          </div>
        </section>

        <section id="opportunity" className="bg-[#051310] border-y border-[#c5a059]/25 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader
              eyebrow="Strategic Opportunity Overview"
              title="Built for Large-Ticket Discussions"
              desc="This page is intentionally not positioned for small-ticket participation, crowdfunding, or retail investment. It is built for strategic investors and acquisition-level conversations."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attentionCards.map(([title, desc]) => (
                <div key={title} className="bg-[#0B251E] border border-[#c5a059]/15 rounded-xl p-7 hover:border-[#c5a059]/45 transition-all group">
                  <div className="w-11 h-11 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/20 flex items-center justify-center mb-5 group-hover:bg-[#c5a059] group-hover:text-[#0B251E] transition-all">
                    <Crown className="w-5 h-5 text-[#ebd49b] group-hover:text-[#0B251E]" />
                  </div>
                  <h3 className="text-lg font-serif text-[#ebd49b] uppercase font-bold tracking-wide mb-3">{title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed font-light">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cinematic Media Showcase Section */}
        <section id="media-center" className="bg-[#0B251E] py-20 border-b border-[#c5a059]/20">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader
              eyebrow="Investor Preview"
              title="Cinematic Media Center"
              desc="Select a video segment to audit the completed structure, drone aerial contours, highway access frontage, and wellness resort facilities."
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
              {/* Left Column: Interactive Playlist (5 cols) — Rendered second on mobile */}
              <div className="lg:col-span-4 bg-[#051310] border border-[#c5a059]/20 rounded-2xl p-5 md:p-6 flex flex-col justify-between order-2 lg:order-1">
                <div className="space-y-4">
                  <div className="border-b border-[#c5a059]/15 pb-3">
                    <span className="text-[10px] tracking-widest font-mono text-[#c5a059] uppercase block font-bold">Confidential Video Audit</span>
                    <h4 className="text-white text-base font-serif uppercase mt-1">Property Reels &amp; Drone</h4>
                  </div>
                  
                  <div className="flex flex-col gap-2.5 max-h-[360px] overflow-y-auto pr-1">
                    {bRollClips.map((clip) => {
                      const isSelected = activeVideoId === clip.id;
                      return (
                        <button
                          key={clip.id}
                          onClick={() => { setActiveVideoId(clip.id); setVideoLoaded(false); }}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                            isSelected
                              ? 'bg-[#c5a059] text-[#0B251E] font-bold border-transparent shadow-lg scale-[1.01]'
                              : 'bg-[#0B251E] text-gray-300 border-[#c5a059]/10 hover:border-[#c5a059]/30 hover:text-white'
                          }`}
                        >
                          <Play className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-[#0B251E] fill-current' : 'text-[#c5a059]'}`} />
                          <div>
                            <span className={`text-[9px] uppercase tracking-wider block font-bold ${isSelected ? 'text-[#0B251E]/80' : 'text-[#c5a059]'}`}>
                              {clip.category}
                            </span>
                            <h5 className="text-[11px] font-serif font-bold tracking-wide uppercase leading-tight mt-0.5">{clip.title}</h5>
                            <p className={`text-[10px] leading-relaxed mt-1 font-light ${isSelected ? 'text-[#0B251E]/90' : 'text-gray-400'}`}>
                              {clip.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-[#c5a059]/15 pt-5 mt-6 space-y-2">
                  <p className="text-[10px] text-gray-400 leading-relaxed font-light">
                    Physical site audits, title directories, and license logs are available under strict NDA protocol.
                  </p>
                  <button 
                    onClick={openInquiry} 
                    className="w-full bg-[#c5a059]/10 hover:bg-[#c5a059] text-[#c5a059] hover:text-[#0B251E] text-[10px] uppercase font-bold tracking-widest py-3.5 rounded border border-[#c5a059]/25 hover:border-transparent transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Video className="w-4 h-4" /> Request Site Inspection Tour
                  </button>
                </div>
              </div>

              {/* Right Column: Featured Video Viewport (8 cols) — Rendered first on mobile for optimal UX */}
              <div className="lg:col-span-8 flex flex-col justify-center order-1 lg:order-2">
                <div className="relative w-full rounded-2xl overflow-hidden border border-[#c5a059]/30 shadow-2xl bg-[#051310] flex flex-col">
                  
                  {/* Aspect Ratio container for video frame — sized responsibly on mobile */}
                  <div className="w-full relative bg-[#030f0c] aspect-video">
                    {!videoLoaded ? (
                      /* Click-to-play overlay — avoids Drive's autoplay block */
                      <button
                        onClick={() => setVideoLoaded(true)}
                        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-5 group cursor-pointer bg-[#030f0c] hover:bg-[#051310] transition-colors"
                        aria-label="Play video"
                      >
                        {/* Beautiful fallback-safe high-res preview thumbnail */}
                        <img
                          src={bRollClips.find(c => c.id === activeVideoId)?.thumbnail ?? `https://lh3.googleusercontent.com/d/${activeVideoId}`}
                          alt="Video thumbnail"
                          className="absolute inset-0 w-full h-full object-contain object-center opacity-40 group-hover:opacity-60 transition-opacity"
                          referrerPolicy="no-referrer"
                          onError={(e) => { (e.target as HTMLImageElement).src = `https://lh3.googleusercontent.com/d/${activeVideoId}`; }}
                        />
                        {/* Play button circle */}
                        <div className="relative z-10 w-20 h-20 rounded-full bg-[#c5a059] group-hover:bg-[#a98041] group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-2xl shadow-[#c5a059]/30">
                          <Play className="w-8 h-8 text-[#0B251E] fill-current ml-1" />
                        </div>
                        <div className="relative z-10 text-center space-y-2 px-6">
                          <p className="text-white font-serif text-sm sm:text-base uppercase tracking-widest font-bold">
                            {bRollClips.find(c => c.id === activeVideoId)?.title ?? 'Play Video'}
                          </p>
                          <p className="text-[#c5a059] text-[10px] sm:text-xs uppercase tracking-widest font-mono font-semibold">
                            Click to Stream Confidential Audit Video
                          </p>
                        </div>
                      </button>
                    ) : (
                      /* Actual iframe — only mounts after user clicks */
                      <iframe
                        key={activeVideoId}
                        src={`https://drive.google.com/file/d/${activeVideoId}/preview`}
                        allow="autoplay; fullscreen; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen
                        referrerPolicy="no-referrer"
                        title="Wayanad premium hospitality asset video audit"
                        className="w-full h-full border-0 absolute inset-0"
                      />
                    )}
                  </div>

                  {/* Elegant Dashboard Info & Native Player Control Bar */}
                  <div className="bg-[#051310] border-t border-[#c5a059]/20 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-20">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-wider text-[#c5a059] font-mono font-bold block">
                        {bRollClips.find(c => c.id === activeVideoId)?.category ?? 'Cinematic Showcase'}
                      </span>
                      <h4 className="text-xs sm:text-sm font-serif font-bold uppercase tracking-wide text-white leading-tight">
                        {bRollClips.find(c => c.id === activeVideoId)?.title ?? 'Video Audit'}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-light leading-relaxed max-w-md">
                        {bRollClips.find(c => c.id === activeVideoId)?.desc ?? ''}
                      </p>
                    </div>

                    <div className="flex flex-col items-stretch sm:items-end gap-1.5 w-full sm:w-auto shrink-0">
                      <a
                        href={`https://drive.google.com/file/d/${activeVideoId}/view`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto bg-[#c5a059]/10 hover:bg-[#c5a059] text-[#c5a059] hover:text-[#0B251E] text-[10px] uppercase tracking-widest font-bold px-4 py-2.5 rounded border border-[#c5a059]/30 hover:border-transparent transition-all flex items-center justify-center gap-1.5"
                      >
                        <Play className="w-3 h-3 fill-current" /> Open in Native Player
                      </a>
                      <span className="text-[9px] text-gray-500 text-center sm:text-right font-light leading-snug max-w-xs block sm:inline">
                        *Tip: For immediate high-speed stream &amp; full screen, click above.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pitch Deck Preview Console */}
        <PitchDeckViewer onOpenInquiry={handleSlideInquiry} />


        <section className="bg-[#FDFBF7] text-[#2A2D34] py-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-4 border border-[#c5a059]/40 -translate-x-3 -translate-y-3" />
                <img src={media.landscape} alt="Wayanad tourism landscape" className="relative rounded shadow-2xl aspect-[4/5] object-cover w-full" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-bold font-mono">Location Advantage</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold uppercase tracking-wide">Why Wayanad Hospitality Matters</h2>
              <div className="w-20 h-1 bg-[#c5a059]" />
              <p className="text-gray-700 text-base leading-relaxed font-light">
                Wayanad combines Kerala’s destination appeal with nature-led hospitality demand, weekend leisure movement, NRI emotional connection and limited availability of premium developed resort assets. For strategic buyers, the location gives both tourism relevance and long-term land-backed value.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {['Growing tourism demand', 'Rising luxury travel segment', 'Limited premium inventory', 'Long-term land-backed appreciation'].map((text) => (
                  <div key={text} className="bg-white border border-[#c5a059]/25 rounded-lg p-4 flex gap-3 items-start shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#c5a059] shrink-0" />
                    <span className="font-bold text-sm uppercase tracking-wide">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="asset-gallery" className="bg-[#051310] py-20 border-y border-[#c5a059]/20">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader
              eyebrow="Asset Gallery"
              title="Visual Evidence of Scale & Quality"
              desc="Images are organized to support investor evaluation: property scale, infrastructure, accommodation quality, recreation assets and destination context."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item, index) => (
                <div key={item.title} className={`${index === 0 ? 'lg:col-span-2' : ''} bg-[#0B251E] border border-[#c5a059]/15 rounded-xl overflow-hidden group`}>
                  <div className="h-72 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-5 border-t border-[#c5a059]/15">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a059] font-mono font-bold">{item.label}</span>
                    <h3 className="text-xl font-serif text-white uppercase font-bold mt-2">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Financial Modeling Suite Section */}
        <section id="financial-suite" className="bg-[#051310] py-20 border-y border-[#c5a059]/20">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader
              eyebrow="Financial Underpinnings"
              title="Capital &amp; Returns Projection Suite"
              desc="Simulate the direct equity allotment based on investment tranches, room pricing (ADR) targets, year-round occupancy, and EBITDA yields."
            />

            {/* Tab Navigation buttons */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-[#0B251E] border border-[#c5a059]/30 rounded-xl p-1.5 shadow-lg">
                <button
                  onClick={() => setActiveFinTab('roi')}
                  className={`px-6 py-3 rounded-lg text-xs uppercase font-mono tracking-widest font-bold transition-all cursor-pointer ${
                    activeFinTab === 'roi'
                      ? 'bg-[#c5a059] text-[#0B251E] shadow-md'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Interactive Yield Model
                </button>
                <button
                  onClick={() => setActiveFinTab('appreciation')}
                  className={`px-6 py-3 rounded-lg text-xs uppercase font-mono tracking-widest font-bold transition-all cursor-pointer ${
                    activeFinTab === 'appreciation'
                      ? 'bg-[#c5a059] text-[#0B251E] shadow-md'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  20-Year Asset Appreciation
                </button>
              </div>
            </div>

            {/* Dynamic Tab Content rendering */}
            <div className="max-w-5xl mx-auto">
              {activeFinTab === 'roi' ? (
                <ROICalculator onInvestClicked={handleInvestClicked} />
              ) : (
                <AppreciationChart />
              )}
            </div>
          </div>
        </section>

        <section className="bg-[#0B251E] py-20 border-b border-[#c5a059]/20">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader
              eyebrow="Transaction Structures"
              title="Flexible Strategic Deal Pathways"
              desc="The opportunity is framed for serious discussions, not retail participation. Final structure can be evaluated after qualification and due diligence."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {transactionStructures.map((item) => (
                <div key={item} className="bg-[#051310] border border-[#c5a059]/20 rounded-xl p-6 flex items-center gap-4">
                  <Landmark className="w-6 h-6 text-[#ebd49b] shrink-0" />
                  <span className="font-serif uppercase tracking-wide text-[#ebd49b] font-bold">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 bg-[#051310] border border-red-400/25 rounded-xl p-6 text-center">
              <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                <strong className="text-[#ebd49b]">Not intended for:</strong> crowdfunding, small-ticket investment schemes, retail investment plans, or stay-perk-led participation. This is intended for qualified strategic investors and acquisition prospects.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#FDFBF7] text-[#2A2D34] py-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-bold font-mono">Growth Vision</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold uppercase tracking-wide">Strategic Growth Vision</h2>
              <div className="w-20 h-1 bg-[#c5a059]" />
              <p className="text-gray-700 leading-relaxed font-light">
                The asset can be evaluated as a platform for premium hospitality expansion, operator-led repositioning, brand collaboration, MICE growth, wellness-led revenue enhancement and destination-based long-term value creation.
              </p>
              <div className="space-y-3">
                {['Capacity and experience enhancement', 'Premium hospitality repositioning', 'Wellness and MICE revenue expansion', 'Long-term asset value creation'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide">
                    <TrendingUp className="w-5 h-5 text-[#c5a059]" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <img src={media.pool} alt="Pool and recreation infrastructure" className="rounded shadow-2xl aspect-[4/3] object-cover w-full" referrerPolicy="no-referrer" />
          </div>
        </section>

        <section className="bg-[#051310] py-20 border-y border-[#c5a059]/20">
          <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
            <SectionHeader
              eyebrow="Private Disclosure Protocol"
              title="Brand Confidentiality, Asset Transparency"
              desc="The property and location can be discussed with qualified prospects. The brand identity, documents, financials, title materials and sensitive commercial data are controlled through a private disclosure process."
            />
            <div className="bg-[#0B251E] border border-[#c5a059]/30 rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                ['Initial Qualification', 'Investor type, discussion structure and capital capability are reviewed first.'],
                ['Private Memorandum', 'Qualified prospects receive asset details, strategic context and next-step process.'],
                ['Due Diligence Access', 'Site visit, documents and deeper financial review can follow under controlled disclosure.'],
              ].map(([title, desc]) => (
                <div key={title} className="space-y-3">
                  <FileText className="w-7 h-7 text-[#ebd49b]" />
                  <h3 className="font-serif text-[#ebd49b] uppercase font-bold">{title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img src={media.exterior} alt="Premium hospitality asset exterior" className="w-full h-full object-cover brightness-[0.25]" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-[#051310]/80" />
          </div>
          <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-bold font-mono">Qualified Enquiry</span>
              <h2 className="text-3xl md:text-5xl font-serif uppercase tracking-wide font-bold">Request Strategic Memorandum</h2>
              <p className="text-gray-300 leading-relaxed font-light">
                Submit a serious enquiry for strategic investment, operator partnership, majority investment or acquisition discussion. This form intentionally filters out small-ticket retail enquiries.
              </p>
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-widest font-bold text-[#ebd49b]">
                <span className="border border-[#c5a059]/30 rounded-full px-4 py-2">Family Offices</span>
                <span className="border border-[#c5a059]/30 rounded-full px-4 py-2">Hotel Groups</span>
                <span className="border border-[#c5a059]/30 rounded-full px-4 py-2">HNWI Buyers</span>
                <span className="border border-[#c5a059]/30 rounded-full px-4 py-2">PE / Operators</span>
              </div>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex bg-[#c5a059] hover:bg-[#a98041] text-[#0B251E] font-bold uppercase tracking-[0.18em] px-7 py-4 rounded items-center gap-2">
                Get Investor Deck on WhatsApp <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <form onSubmit={handleInlineSubmit} className="bg-[#0B251E]/95 border border-[#c5a059]/30 rounded-2xl p-6 md:p-8 space-y-5 shadow-2xl">
              {inlineSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <CheckCircle2 className="w-14 h-14 text-[#c5a059] mx-auto" />
                  <h3 className="text-2xl font-serif uppercase text-[#ebd49b] font-bold">Request Received</h3>
                  <p className="text-gray-300 text-sm">Our team will review the enquiry and follow up for private discussion.</p>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="text-2xl font-serif uppercase text-white font-bold">Access Request</h3>
                    <p className="text-xs text-gray-400 mt-2">For qualified strategic investors and acquisition partners only.</p>
                  </div>
                  <input value={inlineName} onChange={(e) => setInlineName(e.target.value)} required placeholder="Full Name" className="w-full bg-[#051310] border border-[#c5a059]/20 rounded px-4 py-3 text-sm outline-none focus:border-[#c5a059]" />
                  <input value={inlineCountry} onChange={(e) => setInlineCountry(e.target.value)} required placeholder="Country" className="w-full bg-[#051310] border border-[#c5a059]/20 rounded px-4 py-3 text-sm outline-none focus:border-[#c5a059]" />
                  <input value={inlinePhone} onChange={(e) => setInlinePhone(e.target.value)} required placeholder="WhatsApp Number" className="w-full bg-[#051310] border border-[#c5a059]/20 rounded px-4 py-3 text-sm outline-none focus:border-[#c5a059]" />
                  <select value={inlineInvestorType} onChange={(e) => setInlineInvestorType(e.target.value)} className="w-full bg-[#051310] border border-[#c5a059]/20 rounded px-4 py-3 text-sm outline-none focus:border-[#c5a059]">
                    {['Family Office', 'Hospitality Group', 'Hotel Operator', 'Strategic Investor', 'Private Equity / Investment Firm', 'HNWI Private Investor', 'Acquisition Prospect'].map((item) => <option key={item}>{item}</option>)}
                  </select>
                  <select value={inlineDiscussion} onChange={(e) => setInlineDiscussion(e.target.value)} className="w-full bg-[#051310] border border-[#c5a059]/20 rounded px-4 py-3 text-sm outline-none focus:border-[#c5a059]">
                    {transactionStructures.map((item) => <option key={item}>{item}</option>)}
                  </select>
                  <select value={inlineCapital} onChange={(e) => setInlineCapital(e.target.value)} className="w-full bg-[#051310] border border-[#c5a059]/20 rounded px-4 py-3 text-sm outline-none focus:border-[#c5a059]">
                    {['1/3rd Strategic Partnership Block (33.3% Equity)', 'Full Buyout / Asset Acquisition (100% Equity)', 'Other Strategic / Joint Venture Structure'].map((item) => <option key={item}>{item}</option>)}
                  </select>
                  <button disabled={inlineSubmitting} className="w-full bg-[#c5a059] hover:bg-[#a98041] disabled:opacity-60 text-[#0B251E] font-bold uppercase tracking-[0.18em] py-4 rounded">
                    {inlineSubmitting ? 'Submitting...' : 'Request Private Access'}
                  </button>
                </>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#051310] border-t border-[#c5a059]/20 py-8 text-center px-6 pb-8">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
          Confidential Strategic Hospitality Asset Opportunity • Brand Identity Protected • Wayanad, Kerala
        </p>
      </footer>

      <div className="max-w-6xl mx-auto px-6 pb-24 md:pb-12">
        <LeadHistory onRefreshTrigger={refreshTrigger} onSelectLead={handleSelectLead} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-[1000] bg-[#051310]/95 backdrop-blur-md border-t border-[#c5a059]/30 p-3 md:hidden grid grid-cols-2 gap-3">
        <button onClick={openInquiry} className="bg-[#c5a059] text-[#0B251E] text-[11px] uppercase tracking-widest font-bold py-3 rounded">Investor Deck</button>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="border border-[#c5a059] text-[#ebd49b] text-[11px] uppercase tracking-widest font-bold py-3 rounded text-center">WhatsApp</a>
      </div>

      <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} defaultDiscussionType={selectedDealType} onSuccess={handleLeadSuccess} />
    </div>
  );
}
