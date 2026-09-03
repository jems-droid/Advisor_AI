import React from 'react';
import { Info } from 'lucide-react';

export const RegulatoryBanner: React.FC = () => {
  return (
    <div className="rounded-xl bg-indigo-50/60 border border-indigo-100 p-3.5 text-xs text-indigo-950 flex items-start gap-2.5 shadow-2xs">
      <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
      <div className="leading-relaxed">
        <strong className="font-bold text-indigo-900 uppercase tracking-wider text-[11px] mr-1">
          Regulatory & Platform Framework (AMFI / SEBI Compliance):
        </strong>
        This co-pilot assists registered MFDs in structuring client needs, demystifying fund concepts, and mapping suitability across SEBI mutual fund categories (NJ Wealth, AssetPlus, BSE StAR MF). Mutual fund investments are subject to market risks. All scheme recommendations should be verified with the client&apos;s Risk-O-Meter and latest Scheme Information Document (SID/KIM).
      </div>
    </div>
  );
};

