import React from 'react';
import { TrendingUp, ShieldCheck, Printer, FileText } from 'lucide-react';

interface HeaderProps {
  onPrint: () => void;
  onReset: () => void;
  hasResult: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onPrint, onReset, hasResult }) => {
  return (
    <header className="flex items-center justify-between bg-white px-4 sm:px-8 py-4 border-b border-slate-200 shadow-xs sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-xs shrink-0">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
              ArthaWealth Co-Pilot
            </h1>
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-100">
              <ShieldCheck className="w-3 h-3" />
              SEBI & AMFI Compliant
            </span>
          </div>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
            Advisor Workflow Engine • NJ Wealth & AssetPlus
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {hasResult && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="btn-print-dossier"
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Print or Save as PDF Proposal"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Print Proposal</span>
            </button>
            <button
              type="button"
              id="btn-reset-workflow"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>New Notes</span>
            </button>
          </div>
        )}
        <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100 hidden sm:inline-block">
          INR (₹) Advisory Active
        </span>
      </div>
    </header>
  );
};

