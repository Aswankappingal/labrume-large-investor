import React, { useState, useEffect } from 'react';
import { Database, Trash2, ShieldAlert, CheckCircle } from 'lucide-react';
import { Lead } from '../types';

interface LeadHistoryProps {
  onRefreshTrigger?: number;
  onSelectLead: (leadAmountCr: number) => void;
}

export default function LeadHistory({ onRefreshTrigger = 0, onSelectLead }: LeadHistoryProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem('wayanad_leads');
    if (existing) {
      try {
        setLeads(JSON.parse(existing));
      } catch (e) {
        setLeads([]);
      }
    }
  }, [onRefreshTrigger, isOpen]);

  const clearLeads = () => {
    localStorage.removeItem('wayanad_leads');
    setLeads([]);
  };

  return (
    <div className="border border-[#c5a059]/25 rounded bg-[#051310]/95 mt-8 text-xs font-sans overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#0b251e] px-4 py-3 text-gold-500 hover:text-white flex items-center justify-between transition-colors border-b border-[#c5a059]/15"
      >
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-[#c5a059] animate-pulse" />
          <span className="font-semibold text-gray-200">Dev &amp; Reviewer Control: Investor Lead Storage Console ({leads.length} Saved)</span>
        </div>
        <span className="text-[10px] text-[#c5a059] underline uppercase tracking-wider font-mono">
          {isOpen ? 'Close Panel' : 'Inspect Saved leads'}
        </span>
      </button>

      {isOpen && (
        <div className="p-4 space-y-4 animate-in slide-in-from-bottom-2 duration-200 text-xs text-gray-300">
          <div className="flex justify-between items-center bg-[#051310] p-3 rounded border border-[#c5a059]/15">
            <div>
              <p className="font-semibold text-[#c5a059]">Confidential Test Console</p>
              <p className="text-gray-300 text-xs mt-0.5 font-light">
                Every time you submit the prospectus form or direct capital commit, we parse the state and save it temporarily inside browser <code className="bg-[#0b251e] px-1 py-0.5 rounded text-white font-mono text-[10px]">localStorage</code>.
              </p>
            </div>
            {leads.length > 0 && (
              <button
                onClick={clearLeads}
                className="bg-red-950/40 hover:bg-red-900/40 text-red-400 border border-red-900/40 px-3 py-1.5 rounded transition-all flex items-center gap-1 cursor-pointer font-mono"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear Records
              </button>
            )}
          </div>

          {leads.length === 0 ? (
            <div className="text-center py-6 text-gray-500 border border-dashed border-[#c5a059]/15 rounded font-mono">
              No simulated investor contacts currently registered. Try clicking "Download Information Memorandum" or "Submit Deal Selection" to capture a record.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
              {leads.map((lead) => (
                <div 
                  key={lead.id}
                  className="bg-[#0b251e] border border-[#c5a059]/15 rounded p-3 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-bold text-white text-sm">{lead.name}</span>
                      <span className="text-[10px] text-white bg-[#051310] border border-[#c5a059]/30 px-1.5 py-0.5 rounded font-mono font-bold">
                        {lead.investmentAmount}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-300 space-y-0.5 mt-2 font-mono">
                      <p><span className="text-gray-400">Country:</span> {lead.country}</p>
                      <p><span className="text-gray-400">WhatsApp:</span> {lead.phone}</p>
                      {lead.notes && <p><span className="text-gray-400">Interest Details:</span> {lead.notes}</p>}
                    </div>
                  </div>
                  <div className="text-[9px] text-gray-400 font-mono mt-3 border-t border-[#c5a059]/15 pt-2 flex items-center justify-between">
                    <span>ID: {lead.id} | AT: {lead.submittedAt}</span>
                    <span className="text-green-500 flex items-center gap-1 font-semibold lg:text-[10px]">
                      <CheckCircle className="w-3 h-3 text-green-500" /> Active Lead
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
