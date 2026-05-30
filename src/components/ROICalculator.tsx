import React, { useState, useMemo } from 'react';
import { ArrowRight, ShieldCheck, Landmark, TrendingUp, Building2, Info } from 'lucide-react';

interface ROICalculatorProps {
  onInvestClicked: (dealType: string) => void;
}

// ─── Asset constants ──────────────────────────────────────────────
const TOTAL_KEYS = 43;
const ASSET_VALUATION = 500_000_000; // ₹50 Cr (confidential — used for yield basis only)
const LAND_APPRECIATION_CAGR = 0.088; // 8.8% pa — Vythiri zone premium corridor
const BUILDING_DEPRECIATION_NET = 0.005; // net 0.5% pa (maintenance-adjusted)
const BRAND_GROWTH_CAGR = 0.12; // brand/IP growth 12% pa in first decade

export default function ROICalculator({ onInvestClicked }: ROICalculatorProps) {
  const [dealType, setDealType] = useState<'third' | 'buyout'>('third');
  const [adr, setAdr] = useState(5000);
  const [occupancy, setOccupancy] = useState(75);
  const [showMethodology, setShowMethodology] = useState(false);

  const equityShare = dealType === 'third' ? 1 / 3 : 1.0;
  const equitySharePercent = equityShare * 100;

  // ─── Income calculations ──────────────────────────────────────
  const roomRevenueAnnual = TOTAL_KEYS * 365 * (occupancy / 100) * adr;
  const ancillaryRevenue = roomRevenueAnnual * 0.35;         // F&B + Spa + MICE = 35% of room rev
  const totalRevenueAnnual = roomRevenueAnnual + ancillaryRevenue;
  const ebitda = totalRevenueAnnual * 0.38;                  // 38% EBITDA margin (industry standard)
  const investorEbitda = ebitda * equityShare;               // investor's proportional share

  // ─── Capital basis ────────────────────────────────────────────
  const investorCapitalBasis = ASSET_VALUATION * equityShare; // proportional stake value
  const incomeYieldPercent = (investorEbitda / investorCapitalBasis) * 100;
  const paybackYears = 100 / incomeYieldPercent;

  // ─── Asset growth (10-year horizon) ──────────────────────────
  const years10AssetMultiplier = useMemo(() => {
    // Land = 50% of asset value, appreciates at 8.8% pa
    // Building = 40% of asset value, net 0.5% depreciation-adjusted growth
    // Brand/IP = 10% of asset, grows 12% pa
    const landWeight = 0.50;
    const buildingWeight = 0.40;
    const brandWeight = 0.10;
    const landGrowth = Math.pow(1 + LAND_APPRECIATION_CAGR, 10);
    const buildingGrowth = Math.pow(1 + BUILDING_DEPRECIATION_NET, 10);
    const brandGrowth = Math.pow(1 + BRAND_GROWTH_CAGR, 10);
    return landWeight * landGrowth + buildingWeight * buildingGrowth + brandWeight * brandGrowth;
  }, []);

  const assetCapitalGainPercent = (years10AssetMultiplier - 1) * 100;
  const annualizedAssetGrowth = (Math.pow(years10AssetMultiplier, 0.1) - 1) * 100;

  // ─── Combined 10-year total return ───────────────────────────
  const cumulativeIncomeReturn = incomeYieldPercent * 10;       // simple annual income × 10
  const totalReturn10Year = cumulativeIncomeReturn + assetCapitalGainPercent; // income + capital gain
  
  // Simplified IRR approximation (income yield + annualized asset growth)
  const estimatedIRR = incomeYieldPercent + annualizedAssetGrowth;

  // ─── Deal label ───────────────────────────────────────────────
  const dealTypeLabel = dealType === 'third'
    ? '1/3rd Strategic Partnership Block (33.3% Equity)'
    : 'Full Buyout / Asset Acquisition (100% Equity)';

  const fmt = (n: number) => n.toLocaleString('en-IN');

  return (
    <div className="bg-[#051310] border border-[#c5a059]/25 rounded-xl shadow-2xl p-6 lg:p-8 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#c5a059]/15 pb-5 mb-6 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold font-mono">INVESTOR CONSOLE</span>
          <h3 className="text-2xl font-serif text-white mt-1">Interactive Returns Model</h3>
          <p className="text-gray-400 text-xs mt-1">
            Income yield + asset capital appreciation — adjust ADR and occupancy to model your scenario.
          </p>
        </div>
        <button
          onClick={() => setShowMethodology(!showMethodology)}
          className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#c5a059] border border-[#c5a059]/30 px-3 py-1.5 rounded hover:bg-[#c5a059]/10 transition-all cursor-pointer whitespace-nowrap"
        >
          <Info className="w-3 h-3" /> {showMethodology ? 'Hide' : 'How This Is Calculated'}
        </button>
      </div>

      {/* Methodology Transparency Panel */}
      {showMethodology && (
        <div className="mb-6 bg-[#0B251E] border border-[#c5a059]/20 rounded-lg p-5 text-xs font-sans space-y-3 text-gray-300 leading-relaxed">
          <p className="text-[#c5a059] font-bold uppercase tracking-widest text-[10px] font-mono">Calculation Methodology</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-white font-semibold">📊 Income Yield</p>
              <p><span className="text-[#c5a059]">Room Revenue</span> = 43 keys × 365 days × Occupancy% × ADR</p>
              <p><span className="text-[#c5a059]">Ancillary Revenue</span> = 35% of room revenue (F&B, Spa, MICE)</p>
              <p><span className="text-[#c5a059]">EBITDA</span> = 38% of total revenue (industry standard for premium hotels)</p>
              <p><span className="text-[#c5a059]">Investor EBITDA</span> = EBITDA × your equity share (33.3% or 100%)</p>
              <p><span className="text-[#c5a059]">Income Yield%</span> = Investor EBITDA ÷ proportional capital stake</p>
            </div>
            <div className="space-y-2">
              <p className="text-white font-semibold">🏗️ Asset Appreciation (10yr)</p>
              <p><span className="text-[#c5a059]">Land (50% weight)</span> = 8.8% pa CAGR — Vythiri premium corridor benchmark</p>
              <p><span className="text-[#c5a059]">Building (40% weight)</span> = 0.5% pa net growth (maintenance-adjusted)</p>
              <p><span className="text-[#c5a059]">Brand/IP (10% weight)</span> = 12% pa — branded hospitality asset premium</p>
              <p><span className="text-[#c5a059]">Blended 10yr multiplier</span> = weighted average of above three components</p>
              <p><span className="text-[#c5a059]">Total Return</span> = cumulative income over 10 yrs + capital appreciation%</p>
            </div>
          </div>
          <p className="text-gray-500 italic text-[10px]">
            * Capital basis is kept confidential. Yields are shown as % returns on proportional stake. All projections are indicative — not guaranteed returns.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ─── Left: Controls ─────────────────────────────────── */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Deal Type Selector */}
          <div className="space-y-3">
            <span className="text-sm text-gray-300 font-medium block">1. Select Your Participation Structure</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  key: 'third' as const,
                  label: 'Block Partnership',
                  title: '1/3rd Strategic Block',
                  desc: '33.3% equity with land-backed registries, co-operating rights, and proportional dividend entitlement.',
                  icon: Landmark,
                },
                {
                  key: 'buyout' as const,
                  label: '100% Acquisition',
                  title: 'Full Buyout',
                  desc: 'Complete asset acquisition — NH frontage title, G+6 structure, resort licenses, brand IP and operations.',
                  icon: Building2,
                },
              ].map(({ key, label, title, desc, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setDealType(key)}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    dealType === key
                      ? 'bg-[#c5a059]/10 border-[#c5a059] shadow-lg shadow-[#c5a059]/10'
                      : 'bg-[#0B251E]/60 border-[#c5a059]/20 hover:border-[#c5a059]/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] tracking-widest font-mono uppercase text-[#c5a059] font-bold">{label}</span>
                    <Icon className={`w-4 h-4 ${dealType === key ? 'text-[#c5a059]' : 'text-gray-500'}`} />
                  </div>
                  <h4 className="text-sm font-serif font-bold text-white">{title}</h4>
                  <p className="text-[11px] leading-relaxed mt-1.5 text-gray-400 font-light">{desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* ADR Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300 font-medium">2. Average Daily Rate (ADR)</span>
              <span className="text-white font-bold font-mono">₹ {fmt(adr)} / night</span>
            </div>
            <input
              type="range" min="4000" max="8000" step="100" value={adr}
              onChange={(e) => setAdr(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#0b251e] rounded-lg appearance-none cursor-pointer accent-[#c5a059]"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>Conservative ₹4,000</span>
              <span>Market Avg ₹5,000</span>
              <span>Peak Season ₹8,000</span>
            </div>
          </div>

          {/* Occupancy Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300 font-medium">3. Forecasted Year-Round Occupancy</span>
              <span className="text-white font-bold font-mono">{occupancy}%</span>
            </div>
            <input
              type="range" min="55" max="90" step="2" value={occupancy}
              onChange={(e) => setOccupancy(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#0b251e] rounded-lg appearance-none cursor-pointer accent-[#c5a059]"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>Base 55%</span>
              <span>Wayanad Avg 75%</span>
              <span>Peak 90%</span>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="bg-[#0b251e]/60 border border-[#c5a059]/15 rounded-lg p-4 space-y-2.5 text-xs">
            <p className="text-[#c5a059] font-bold font-mono uppercase tracking-widest text-[10px]">Revenue Projection (Annual)</p>
            <div className="flex justify-between text-gray-300">
              <span>Room Revenue ({TOTAL_KEYS} keys × {occupancy}% occ × ₹{fmt(adr)}/night × 365)</span>
              <span className="font-mono text-white font-semibold">₹{(roomRevenueAnnual / 1_00_00_000).toFixed(2)}Cr</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>F&B + Spa + MICE (35% of room revenue)</span>
              <span className="font-mono text-white font-semibold">₹{(ancillaryRevenue / 1_00_00_000).toFixed(2)}Cr</span>
            </div>
            <div className="flex justify-between text-gray-300 border-t border-[#c5a059]/10 pt-2">
              <span>EBITDA @ 38% margin</span>
              <span className="font-mono text-[#c5a059] font-bold">₹{(ebitda / 1_00_00_000).toFixed(2)}Cr</span>
            </div>
            {dealType === 'third' && (
              <div className="flex justify-between text-gray-300">
                <span>Your 33.3% share of EBITDA</span>
                <span className="font-mono text-white font-bold">₹{(investorEbitda / 1_00_00_000).toFixed(2)}Cr</span>
              </div>
            )}
          </div>

        </div>

        {/* ─── Right: Output metrics ───────────────────────────── */}
        <div className="lg:col-span-5 flex flex-col gap-4">

          {/* Primary metrics */}
          <div className="bg-[#0b251e] border border-[#c5a059]/25 rounded-xl p-5 space-y-4">
            <div className="text-center pb-3 border-b border-[#c5a059]/15">
              <span className="text-[10px] tracking-widest uppercase text-gray-400 font-mono">Your Equity Stake</span>
              <div className="text-4xl font-serif text-[#c5a059] font-bold mt-1">{equitySharePercent.toFixed(1)}%</div>
              <p className="text-[10px] text-gray-400 mt-1">Proportional to physical land registries & asset title</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#051310] border border-[#c5a059]/15 rounded-lg p-3 text-center">
                <span className="text-[9px] text-gray-400 tracking-wider block font-mono uppercase">Annual Income Yield</span>
                <span className="text-xl font-mono font-bold text-white block mt-1">{incomeYieldPercent.toFixed(1)}%</span>
                <span className="text-[9px] text-gray-500 font-mono">On your capital stake</span>
              </div>
              <div className="bg-[#051310] border border-[#c5a059]/15 rounded-lg p-3 text-center">
                <span className="text-[9px] text-gray-400 tracking-wider block font-mono uppercase">Payback Period</span>
                <span className="text-xl font-mono font-bold text-[#c5a059] block mt-1">{paybackYears.toFixed(1)} yrs</span>
                <span className="text-[9px] text-gray-500 font-mono">Income recovery</span>
              </div>
            </div>

            {/* Asset appreciation row */}
            <div className="bg-[#051310] border border-emerald-500/20 rounded-lg p-3.5 space-y-2.5">
              <div className="flex items-center gap-2 border-b border-emerald-500/10 pb-2">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">10-Year Asset Appreciation</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-gray-400">Capital gain (10yr)</span>
                <span className="text-emerald-400 font-bold font-mono">+{assetCapitalGainPercent.toFixed(0)}%</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-gray-400">Asset growth (CAGR)</span>
                <span className="text-emerald-400 font-bold font-mono">{annualizedAssetGrowth.toFixed(1)}% pa</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-gray-400">Asset multiplier at 10yr</span>
                <span className="text-white font-bold font-mono">{years10AssetMultiplier.toFixed(2)}x</span>
              </div>
            </div>

            {/* Total return & IRR banner */}
            <div className="bg-gradient-to-r from-[#c5a059]/10 to-[#051310] border border-[#c5a059]/30 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-widest text-[#c5a059]">Combined 10-Year Total Return</p>
                  <p className="text-[9px] text-gray-500">(Income yield × 10yrs) + Capital appreciation</p>
                </div>
                <span className="text-2xl font-serif font-bold text-[#c5a059]">{totalReturn10Year.toFixed(0)}%</span>
              </div>
              <div className="flex justify-between border-t border-[#c5a059]/15 pt-2 text-[11px]">
                <span className="text-gray-400">Estimated blended IRR</span>
                <span className="text-white font-bold font-mono">~{estimatedIRR.toFixed(1)}% pa</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onInvestClicked(dealTypeLabel)}
            className="w-full bg-[#c5a059] hover:bg-[#a98041] hover:scale-[1.02] text-[#0B251E] font-bold text-xs tracking-widest uppercase py-4 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#c5a059]/20"
          >
            <span>Submit Deal Enquiry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-center text-[10px] text-gray-500 font-mono flex items-center justify-center gap-1.5 -mt-2">
            <ShieldCheck className="w-3 h-3 text-[#c5a059]" /> Projections are indicative. Not financial advice.
          </p>
        </div>

      </div>
    </div>
  );
}
