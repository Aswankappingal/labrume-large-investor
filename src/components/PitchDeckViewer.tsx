import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Play, Award, CheckCircle2 } from 'lucide-react';

interface Slide {
  step: string;
  badge: string;
  title: string;
  subtitle: string;
  content: string[];
  visualMetric?: {
    value: string;
    label: string;
    sublabel?: string;
  };
  ctaText?: string;
}

interface PitchDeckViewerProps {
  onOpenInquiry: (dealType: string) => void;
}

export default function PitchDeckViewer({ onOpenInquiry }: PitchDeckViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      step: "01 / 07",
      badge: "THE INVESTMENT THESIS",
      title: "Immediate Operational Cashflows with Zero Gestation",
      subtitle: "Acquire pre-vetted real asset equity in an already constructed, premium 43-key hospitality development yielding instant dividends.",
      content: [
        "Unlocking pure equity participation inside a high-altitude boutique leisure resort in Wayanad, Kerala.",
        "Completely immune to construction delays, raw material inflation, or developmental regulatory hurdles.",
        "Fully outfitted with operational licenses, seasoned staff, and premium international wellness facility partners."
      ],
      visualMetric: {
        value: "1/3 or 100%",
        label: "Acquisition Tiers",
        sublabel: "Available as a 1/3rd strategic partnership or full asset buyout."
      },
      ctaText: "REQUEST PRIVATE MEMORANDUM"
    },
    {
      step: "02 / 07",
      badge: "THE MACRO CONTEXT",
      title: "Kerala Luxury Tourism Boom & High-Season Tariffs",
      subtitle: "Position your capital in India's high-barrier leisure destination capturing premium domestic and NRI leisure traffic.",
      content: [
        "Wayanad consistently records 80%+ occupancies fueled by premium domestic and international weekend escapes.",
        "Minimal supply of institutional Grade-A hotels ensures premium pricing dominance.",
        "Excellent high-altitude weather year-round, rendering operations immune to off-season regional monsoon drops."
      ],
      visualMetric: {
        value: "₹ 8,000+",
        label: "Target ADR Tariffs",
        sublabel: "Commanded room pricing backed by premium executive suites."
      },
      ctaText: "REQUEST DESTINATION REPORT"
    },
    {
      step: "03 / 07",
      badge: "TANGIBLE SPECIFICATIONS",
      title: "Premium 43-Key G+6 Asset & Clear Dry Title",
      subtitle: "Uncompromising physical infrastructure built to high engineering specifications with absolute clear titles.",
      content: [
        "Total Built-up Area: 46,500 Sq. Ft. of top high-specification RCC framing with thermal efficient glazing.",
        "Inventory Breakdown: 36 Executive Suites, 6 Duplex Grand Luxury Suites, 1 Special Needs Accessible Suite.",
        "Dry land with prominent direct frontage along the National Highway corridor."
      ],
      visualMetric: {
        value: "46,500",
        label: "Total Built-Up Sq. Ft.",
        sublabel: "Features scenic rooftop banquet deck."
      },
      ctaText: "DOWNLOAD APPROVED SITE ARCHITECTURE"
    },
    {
      step: "04 / 07",
      badge: "FINANCIAL SUSTAINABILITY",
      title: "Strong Operational Projections & Asset Appreciation",
      subtitle: "Vetted operational cashflow models with a target baseline of 22.8% internal rate of return (IRR).",
      content: [
        "Core Revenue Streams: Room Tariff income (68%), Spa & Wellness Wing (12%), Dining & Brew Cafe (18%).",
        "Conservative entry-level ADR modeling with a solid 72% annualized occupancy benchmark.",
        "Low operation costs assisted by energy-efficient heat exchanges and high solar offset arrays."
      ],
      visualMetric: {
        value: "22.8% IRR",
        label: "Projected IRR Target",
        sublabel: "Robust 10-year holding term calculations."
      },
      ctaText: "INSPECT AUDITED FINANCIAL MODEL"
    },
    {
      step: "05 / 07",
      badge: "CAPITAL PLACEMENT TIERS",
      title: "Bespoke Strategic Block Allotments",
      subtitle: "Choose between a majority partnership block or full buyout pathway.",
      content: [
        "1/3rd Strategic Block: 33.3% equity allotment open for direct family office or corporate hospitality investor.",
        "Full Buyout Pathway: 100% direct asset acquisition with complete transfer of land registries and operational assets.",
        "Bespoke Stay Privileges: Fully transferable luxury stay allocations in premium suites."
      ],
      visualMetric: {
        value: "Strategic",
        label: "Block Access",
        sublabel: "Curated for family offices and buyout groups."
      },
      ctaText: "SELECT CO-INVESTMENT TIER"
    },
    {
      step: "06 / 07",
      badge: "REGULATORY & CORPORATE ALIGNMENT",
      title: "Strict Compliance, Title Clearance, & Vetted Ledgers",
      subtitle: "Maximum structural and legal safety shields provided to protect institutional partner allocations.",
      content: [
        "100% encumbrance-free title clearance certs vetted by high-court legacy attorneys.",
        "Annual financial audits and tax filing structures prepared by national accounting advisors.",
        "Secure digital ledger records reflecting physical share allocations under the Indian Companies Act."
      ],
      visualMetric: {
        value: "100%",
        label: "Title Safe Score",
        sublabel: "Fully approved licenses & local panchayat NOCs."
      },
      ctaText: "REQUEST COMPLIANCE DIRECTORY"
    },
    {
      step: "07 / 07",
      badge: "THE NEXT STEPS",
      title: "Unlock Private Placement Memorandum & Arrange Site Visit",
      subtitle: "Secure high-priority ingress to our physical site, meet the promoters, and audit documents under NDA.",
      content: [
        "Submit a Private Lead Handshake below to receive the secure physical site coordinates and download keys.",
        "A private executive advisor will be assigned to guide due diligence, answer questions, and arrange flight/stay.",
        "Immediate distribution of dividends begins from the immediate next fiscal quarter after registration."
      ],
      visualMetric: {
        value: "Immediate",
        label: "Allocation Activation",
        sublabel: "Pending due-diligence credential clearance."
      },
      ctaText: "UNLOCK PROSPECTUS PORTFOLIO NOW"
    }
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const active = slides[currentSlide];

  const handleCTAClick = () => {
    let dealType = 'Other Strategic / Joint Venture Structure';
    if (active.badge === 'CAPITAL PLACEMENT TIERS') {
      dealType = '1/3rd Strategic Partnership Block (33.3% Equity)';
    } else if (currentSlide === 0) {
      dealType = '1/3rd Strategic Partnership Block (33.3% Equity)';
    }
    onOpenInquiry(dealType);
  };

  return (
    <section id="pitchdeck" className="bg-[#051310] text-white py-20 border-t border-[#c5a059]/20 relative overflow-hidden font-sans">
      {/* Absolute decorative gradient highlights */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#c5a059]/5 rounded-full filter blur-3xl pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-[60px] relative z-10 w-full">
        
        {/* Header Block inline with pitch thesis */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold font-mono px-3 py-1 bg-[#0B251E] border border-[#c5a059]/20 rounded-full inline-block">
              ★ MAIN PITCH DECK PREVIEW
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white font-bold leading-tight">
              Executive Investment Slides
            </h2>
            <p className="text-gray-400 text-sm max-w-2xl leading-relaxed font-light">
              Interact with our official 7-slide pitch deck teaser. Read key economic theses, location contexts, spec data, and next steps curated for qualified sovereign funds and private investors.
            </p>
          </div>
          
          {/* Quick Stats for pitch */}
          <div className="flex items-center gap-3 bg-[#0B251E] p-3 rounded border border-[#c5a059]/15 font-mono text-[10px] text-[#c5a059] uppercase tracking-widest shrink-0 self-start md:self-end">
            <Award className="w-4 h-4 text-[#c5a059]" />
            <span>SEBI / COMPANIES ACT ALIGNED</span>
          </div>
        </div>

        {/* Dynamic Premium Presentation Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#0B251E] border border-[#c5a059]/30 rounded-xl overflow-hidden shadow-2xl">
          
          {/* Left Navigation & Slide Selectors Column (4 cols) */}
          <div className="lg:col-span-4 bg-[#051310] p-6 md:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#c5a059]/20">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-[#c5a059]/15 pb-4">
                <span className="font-mono text-xs text-gold-400 tracking-wider">SELECT SLIDE INDEX</span>
                <span className="font-mono font-bold text-xs text-white bg-[#0B251E] px-2 py-0.5 rounded border border-[#c5a059]/30">Active Slide</span>
              </div>
              
              <div className="flex flex-col gap-2">
                {slides.map((slide, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-full text-left p-3.5 rounded text-xs transition-all flex items-center justify-between border ${
                      currentSlide === idx
                        ? 'bg-[#c5a059] text-[#0B251E] font-bold border-transparent shadow-lg scale-[1.02]'
                        : 'bg-[#0B251E] text-gray-400 border-[#c5a059]/10 hover:border-[#c5a059]/40 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="font-mono text-[10px] opacity-75">{slide.step.split(" ")[0]}</span>
                      <span className="uppercase tracking-wider truncate text-[11px]">{slide.badge}</span>
                    </div>
                    {currentSlide === idx && <Play className="w-3 h-3 shrink-0 text-[#0B251E] fill-current" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Downloader CTA inside slide catalog */}
            <div className="mt-8 pt-6 border-t border-[#c5a059]/15 space-y-3">
              <p className="text-[10px] text-gray-400 leading-relaxed font-light">
                Securely register to unlock the full information memorandum deck with detailed civil designs and legal title certification transcripts.
              </p>
              <button
                onClick={handleCTAClick}
                className="w-full bg-[#c5a059]/10 hover:bg-[#c5a059] text-[#c5a059] hover:text-[#0B251E] text-[10px] uppercase font-bold tracking-widest py-3 rounded border border-[#c5a059]/30 hover:border-transparent transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Get Investor Deck</span>
              </button>
            </div>
          </div>

          {/* Main Visual Active Slide Screen Column (8 cols) */}
          <div className="lg:col-span-8 p-6 md:p-10 flex flex-col justify-between space-y-8 relative">
            
            {/* Slide Header area */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-mono tracking-[0.2em] text-[#c5a059] uppercase font-bold bg-[#051310] border border-[#c5a059]/25 py-1 px-3.5 rounded-full">
                  ★ {active.badge}
                </span>
                <span className="text-xs font-mono font-bold text-gray-400 bg-white/5 py-1 px-2.5 rounded">
                  {active.step}
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3.5xl font-serif text-white font-bold leading-tight uppercase tracking-wide">
                {active.title}
              </h3>
              
              <p className="text-gray-300 text-sm font-light leading-relaxed border-l-2 border-[#c5a059] pl-3">
                {active.subtitle}
              </p>
            </div>

            {/* Content & High Impact metric split block */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-[#c5a059]/15">
              
              {/* Core slide statements list (7 cols) */}
              <div className="md:col-span-7 space-y-3 text-xs text-gray-300 leading-relaxed">
                {active.content.map((bullet, k) => (
                  <div key={k} className="flex gap-2.5 items-start">
                    <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Outstanding high-resolution callout visual metric card (5 cols) */}
              {active.visualMetric && (
                <div className="md:col-span-5 bg-[#051310] border border-[#c5a059]/30 rounded-lg p-5 flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-[#c5a059]/10 to-transparent pointer-events-none rounded-full"></div>
                  <span className="text-2xl sm:text-3xl font-serif text-[#c5a059] font-extrabold tracking-wide block">
                    {active.visualMetric.value}
                  </span>
                  <span className="text-[10px] font-mono text-white tracking-widest uppercase block mt-1 font-bold">
                    {active.visualMetric.label}
                  </span>
                  {active.visualMetric.sublabel && (
                    <span className="text-[9px] text-gray-400 block mt-2 font-light leading-snug">
                      {active.visualMetric.sublabel}
                    </span>
                  )}
                </div>
              )}

            </div>

            {/* Slide Navigation and Instant Booking Form Link footer */}
            <div className="pt-6 border-t border-[#c5a059]/15 flex flex-col sm:flex-row justify-between items-center gap-4">
              
              {/* Stepper Buttons */}
              <div className="flex items-center gap-2 order-2 sm:order-1">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded bg-[#051310] hover:bg-[#c5a059]/20 border border-[#c5a059]/30 hover:border-[#c5a059]/60 text-white hover:text-white transition-all flex items-center justify-center cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <span className="text-xs font-mono text-gray-400 font-bold px-3 py-1 select-none">
                  {currentSlide + 1} of {slides.length}
                </span>

                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded bg-[#051310] hover:bg-[#c5a059]/20 border border-[#c5a059]/30 hover:border-[#c5a059]/60 text-white hover:text-white transition-all flex items-center justify-center cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Dynamic Instant Prospectus Modal Opener Button */}
              <button
                onClick={handleCTAClick}
                className="w-full sm:w-auto order-1 sm:order-2 bg-[#c5a059] hover:bg-[#a98041] hover:scale-[1.02] text-[#0B251E] font-extrabold text-[10px] sm:text-xs uppercase tracking-widest py-3.5 px-6 rounded transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(197,160,89,0.3)] cursor-pointer text-center"
              >
                {active.ctaText || "UNLOCK THIS SLIDE DATA"}
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
