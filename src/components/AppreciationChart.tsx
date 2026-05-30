import React, { useState } from 'react';
import { ShieldCheck, Calendar, Map, Award } from 'lucide-react';

interface ChartDataPoint {
  year: number;
  yearLabel: string;
  totalValuationIndex: number;  // Entry year (2025) = 1.0x Base
  landIndex: number;
  buildingIndex: number;
  brandAndLicensingIndex: number;
}

export default function AppreciationChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(19); // Default to Year 20 (2044)

  // Premium 20-year hospitality real estate forecasting model (normalised from 1.0x to 5.3x)
  const chartData: ChartDataPoint[] = [
    { year: 2025, yearLabel: '2025', totalValuationIndex: 1.00, landIndex: 0.30, buildingIndex: 0.56, brandAndLicensingIndex: 0.14 },
    { year: 2026, yearLabel: '2026', totalValuationIndex: 1.09, landIndex: 0.34, buildingIndex: 0.59, brandAndLicensingIndex: 0.16 },
    { year: 2027, yearLabel: '2027', totalValuationIndex: 1.19, landIndex: 0.38, buildingIndex: 0.62, brandAndLicensingIndex: 0.19 },
    { year: 2028, yearLabel: '2028', totalValuationIndex: 1.30, landIndex: 0.42, buildingIndex: 0.65, brandAndLicensingIndex: 0.23 },
    { year: 2029, yearLabel: '2029', totalValuationIndex: 1.41, landIndex: 0.47, buildingIndex: 0.68, brandAndLicensingIndex: 0.26 },
    { year: 2030, yearLabel: '2030', totalValuationIndex: 1.54, landIndex: 0.53, buildingIndex: 0.71, brandAndLicensingIndex: 0.30 },
    { year: 2031, yearLabel: '2031', totalValuationIndex: 1.68, landIndex: 0.59, buildingIndex: 0.74, brandAndLicensingIndex: 0.35 },
    { year: 2032, yearLabel: '2032', totalValuationIndex: 1.83, landIndex: 0.66, buildingIndex: 0.77, brandAndLicensingIndex: 0.40 },
    { year: 2033, yearLabel: '2033', totalValuationIndex: 2.00, landIndex: 0.74, buildingIndex: 0.80, brandAndLicensingIndex: 0.46 },
    { year: 2034, yearLabel: '2034', totalValuationIndex: 2.18, landIndex: 0.83, buildingIndex: 0.83, brandAndLicensingIndex: 0.52 },
    { year: 2035, yearLabel: '2035', totalValuationIndex: 2.37, landIndex: 0.93, buildingIndex: 0.86, brandAndLicensingIndex: 0.58 },
    { year: 2036, yearLabel: '2036', totalValuationIndex: 2.59, landIndex: 1.04, buildingIndex: 0.89, brandAndLicensingIndex: 0.65 },
    { year: 2037, yearLabel: '2037', totalValuationIndex: 2.82, landIndex: 1.16, buildingIndex: 0.93, brandAndLicensingIndex: 0.73 },
    { year: 2038, yearLabel: '2038', totalValuationIndex: 3.07, landIndex: 1.30, buildingIndex: 0.96, brandAndLicensingIndex: 0.81 },
    { year: 2039, yearLabel: '2039', totalValuationIndex: 3.35, landIndex: 1.46, buildingIndex: 0.99, brandAndLicensingIndex: 0.89 },
    { year: 2040, yearLabel: '2040', totalValuationIndex: 3.65, landIndex: 1.64, buildingIndex: 1.03, brandAndLicensingIndex: 0.99 },
    { year: 2041, yearLabel: '2041', totalValuationIndex: 3.98, landIndex: 1.83, buildingIndex: 1.06, brandAndLicensingIndex: 1.08 },
    { year: 2042, yearLabel: '2042', totalValuationIndex: 4.34, landIndex: 2.05, buildingIndex: 1.10, brandAndLicensingIndex: 1.19 },
    { year: 2043, yearLabel: '2043', totalValuationIndex: 4.73, landIndex: 2.30, buildingIndex: 1.13, brandAndLicensingIndex: 1.29 },
    { year: 2044, yearLabel: '2044', totalValuationIndex: 5.00, landIndex: 2.46, buildingIndex: 1.17, brandAndLicensingIndex: 1.37 },
    { year: 2045, yearLabel: '2045', totalValuationIndex: 5.30, landIndex: 2.66, buildingIndex: 1.22, brandAndLicensingIndex: 1.42 }
  ];

  const selectedPoint = hoveredIndex !== null ? chartData[hoveredIndex] : chartData[19];

  // SVG dimensions & coordinate calculators
  const svgWidth = 800;
  const svgHeight = 280;
  const paddingX = 40;
  const paddingY = 30;

  const getCoordinates = () => {
    return chartData.map((d, index) => {
      const x = paddingX + (index * (svgWidth - paddingX * 2)) / (chartData.length - 1);
      // Min val index: 0.5, Max val index: 5.8. Add margin.
      const valMin = 0.5;
      const valMax = 5.8;
      const y = svgHeight - paddingY - ((d.totalValuationIndex - valMin) / (valMax - valMin)) * (svgHeight - paddingY * 2);
      return { x, y };
    });
  };

  const coordinates = getCoordinates();

  // Create SVG path string for custom curve
  const getLinePath = () => {
    let path = `M ${coordinates[0].x} ${coordinates[0].y}`;
    for (let i = 1; i < coordinates.length; i++) {
      const prev = coordinates[i - 1];
      const curr = coordinates[i];
      // Tension/control points for smooth Cubic Bezier interpolation
      const cpX1 = prev.x + (curr.x - prev.x) / 3;
      const cpY1 = prev.y;
      const cpX2 = prev.x + (2 * (curr.x - prev.x)) / 3;
      const cpY2 = curr.y;
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${curr.x} ${curr.y}`;
    }
    return path;
  };

  // Create SVG area path string that closes at the bottom
  const getAreaPath = () => {
    const linePath = getLinePath();
    const bottomY = svgHeight - paddingY;
    const firstX = coordinates[0].x;
    const lastX = coordinates[coordinates.length - 1].x;
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  };

  return (
    <div className="bg-[#051310] border border-[#c5a059]/25 rounded-lg shadow-2xl p-6 lg:p-8 font-sans transition-all duration-300">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#c5a059]/15 pb-5 mb-6 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold font-mono">20-YEAR GROWTH FORECAST</span>
          <h3 className="text-2xl font-serif text-white mt-1">Sustained Hospitality Asset Appreciation</h3>
          <p className="text-gray-300 text-xs mt-1">
            Modeled compounded appreciation index of physical real estate (land, civil structures) and brand operations.
          </p>
        </div>
        
        {/* Dynamic Highlight badge */}
        <div className="bg-[#0B251E] border border-[#c5a059]/30 rounded px-4 py-2 text-center text-xs text-gray-300 font-mono select-none shadow">
          <span className="text-[#c5a059] font-bold block text-sm">{selectedPoint.totalValuationIndex.toFixed(2)}x</span>
          <span>Index {selectedPoint.yearLabel}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Interactive SVG Chart area */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative bg-[#0B251E]/40 border border-[#c5a059]/10 rounded-lg p-3 overflow-hidden">
            
            {/* Legend grids */}
            <div className="absolute top-4 left-6 text-[10px] font-mono text-gray-400 space-y-1 select-none pointer-events-none">
              <div>&bull; Max Target (Year 20): 5.30x Multiplier</div>
              <div>&bull; Baseline Entry (Year 1): 1.00x Base</div>
              <div>&bull; Compound Real Estate CAGR: ~8.7%</div>
            </div>

            {/* Custom SVG line block */}
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible">
              
              {/* Gradients */}
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c5a059" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#c5a059" stopOpacity="0.00" />
                </linearGradient>
                <linearGradient id="glowGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#a98041" />
                  <stop offset="50%" stopColor="#c5a059" />
                  <stop offset="100%" stopColor="#a98041" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="rgba(197, 160, 89, 0.08)" strokeWidth="1" />
              <line x1={paddingX} y1={svgHeight / 2} x2={svgWidth - paddingX} y2={svgHeight / 2} stroke="rgba(197, 160, 89, 0.08)" strokeWidth="1" />
              <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="rgba(197, 160, 89, 0.15)" strokeWidth="1.5" />

              {/* Area path */}
              <path d={getAreaPath()} fill="url(#chartGradient)" />

              {/* Line path */}
              <path d={getLinePath()} fill="none" stroke="url(#glowGradient)" strokeWidth="3" strokeLinecap="round" />

              {/* Interactive nodes */}
              {coordinates.map((coord, idx) => {
                const isActive = hoveredIndex === idx;
                return (
                  <g key={idx} className="cursor-pointer">
                    
                    {/* Hover vertical reference line */}
                    {isActive && (
                      <line 
                        x1={coord.x} 
                        y1={paddingY} 
                        x2={coord.x} 
                        y2={svgHeight - paddingY} 
                        stroke="#c5a059" 
                        strokeWidth="1" 
                        strokeDasharray="3,3" 
                        opacity="0.6" 
                      />
                    )}

                    {/* Invisible fat hit target for easier touch/hover */}
                    <circle 
                      cx={coord.x} 
                      cy={coord.y} 
                      r="16" 
                      fill="transparent" 
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onClick={() => setHoveredIndex(idx)}
                    />

                    {/* Glowing outer ring */}
                    <circle 
                      cx={coord.x} 
                      cy={coord.y} 
                      r={isActive ? "7" : "3.5"} 
                      fill={isActive ? "#051310" : "#c5a059"} 
                      stroke="#c5a059" 
                      strokeWidth={isActive ? "2.5" : "1"}
                      className="transition-all duration-150"
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onClick={() => setHoveredIndex(idx)}
                    />
                  </g>
                );
              })}

              {/* X axis labels for selected marks */}
              <text x={paddingX} y={svgHeight - 10} fill="#8d8d8d" fontSize="9" textAnchor="middle" fontFamily="monospace">2025</text>
              <text x={paddingX + (svgWidth - paddingX * 2) * 0.25} y={svgHeight - 10} fill="#8d8d8d" fontSize="9" textAnchor="middle" fontFamily="monospace">2030</text>
              <text x={paddingX + (svgWidth - paddingX * 2) * 0.5} y={svgHeight - 10} fill="#8d8d8d" fontSize="9" textAnchor="middle" fontFamily="monospace">2035</text>
              <text x={paddingX + (svgWidth - paddingX * 2) * 0.75} y={svgHeight - 10} fill="#8d8d8d" fontSize="9" textAnchor="middle" fontFamily="monospace">2040</text>
              <text x={svgWidth - paddingX} y={svgHeight - 10} fill="#8d8d8d" fontSize="9" textAnchor="middle" fontFamily="monospace">2045</text>

            </svg>
          </div>

          <p className="text-[11px] text-gray-400 italic text-center font-mono select-none">
            &middot; Hover or tap on graph nodes to trace specific year valuation breakups &middot;
          </p>
        </div>

        {/* Dynamic metrics panel based on hover year */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#0B251E] border border-[#c5a059]/20 rounded-lg p-5 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-[#c5a059] uppercase block border-b border-[#c5a059]/15 pb-2">
              {selectedPoint.yearLabel} Multiplier Allocation
            </span>

            {/* Total Valuation Card Component */}
            <div className="space-y-1">
              <span className="text-gray-400 text-[10px] uppercase block">Cumulative Growth Index</span>
              <div className="text-3xl font-serif text-[#c5a059] font-bold">
                {selectedPoint.totalValuationIndex.toFixed(2)}x
              </div>
              <span className="text-[10px] text-white/70 block">
                1/3rd share value: <strong className="text-white">{(selectedPoint.totalValuationIndex * 0.3333).toFixed(2)}x base</strong>
              </span>
            </div>

            {/* Component Progress Bars */}
            <div className="space-y-3 pt-2 text-xs">
              
              {/* Component 1: Land */}
              <div className="space-y-1">
                <div className="flex justify-between text-gray-300 font-mono text-[10px]">
                  <span className="flex items-center gap-1">
                    <Map className="w-3 h-3 text-[#c5a059]" /> Land appreciation index
                  </span>
                  <span className="text-white">{(selectedPoint.landIndex).toFixed(2)}x</span>
                </div>
                <div className="h-1 bg-black/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#c5a059] transition-all duration-300" 
                    style={{ width: `${(selectedPoint.landIndex / selectedPoint.totalValuationIndex) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Component 2: Infrastructure */}
              <div className="space-y-1">
                <div className="flex justify-between text-gray-300 font-mono text-[10px]">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#c5a059]" /> Infrastructure &amp; Civil
                  </span>
                  <span className="text-white">{(selectedPoint.buildingIndex).toFixed(2)}x</span>
                </div>
                <div className="h-1 bg-black/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-slate-300 transition-all duration-300" 
                    style={{ width: `${(selectedPoint.buildingIndex / selectedPoint.totalValuationIndex) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Component 3: Brand Equity */}
              <div className="space-y-1">
                <div className="flex justify-between text-gray-300 font-mono text-[10px]">
                  <span className="flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#c5a059]" /> Brand &amp; Operational IP
                  </span>
                  <span className="text-white">{(selectedPoint.brandAndLicensingIndex).toFixed(2)}x</span>
                </div>
                <div className="h-1 bg-black/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-400 transition-all duration-300" 
                    style={{ width: `${(selectedPoint.brandAndLicensingIndex / selectedPoint.totalValuationIndex) * 100}%` }}
                  ></div>
                </div>
              </div>

            </div>

            {/* Small note */}
            <div className="pt-3 border-t border-[#c5a059]/15 text-[10px] text-gray-400 leading-normal font-sans font-light">
              This structural valuation is modeled on historical 8.5%-9.5% hospitality land appreciation in premium Vythiri zones. Relative indices are shown to preserve asset confidentiality.
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
