import React, { useState } from 'react';
import { Sparkles, FileEdit, ChevronDown, ChevronUp, Layers, CheckCircle2 } from 'lucide-react';
import { SAMPLE_MEETING_NOTES } from '../data/sampleNotes';

interface NotesInputSectionProps {
  notes: string;
  setNotes: (val: string) => void;
  platform: 'NJ Wealth' | 'AssetPlus' | 'Direct / BSE StAR / MFU';
  setPlatform: (val: 'NJ Wealth' | 'AssetPlus' | 'Direct / BSE StAR / MFU') => void;
  customInstructions: string;
  setCustomInstructions: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const NotesInputSection: React.FC<NotesInputSectionProps> = ({
  notes,
  setNotes,
  platform,
  setPlatform,
  customInstructions,
  setCustomInstructions,
  onSubmit,
  isLoading,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeSampleId, setActiveSampleId] = useState<string | null>(null);

  const handleSelectSample = (sampleId: string) => {
    const found = SAMPLE_MEETING_NOTES.find((s) => s.id === sampleId);
    if (found) {
      setNotes(found.rawText);
      setActiveSampleId(sampleId);
      if (found.rawText.includes('AssetPlus')) {
        setPlatform('AssetPlus');
      } else {
        setPlatform('NJ Wealth');
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
            <FileEdit className="w-4 h-4 text-indigo-600" />
            Advisor Meeting Notes Input
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Paste rough scribbles, WhatsApp chat snippets, or voice transcript notes from your client meeting.
          </p>
        </div>

        {/* Platform execution selector */}
        <div className="flex items-center gap-1 self-start sm:self-auto bg-slate-100 p-1 rounded-xl border border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center gap-1">
            <Layers className="w-3 h-3 text-slate-400" /> Engine:
          </span>
          {(['NJ Wealth', 'AssetPlus', 'Direct / BSE StAR / MFU'] as const).map((p) => (
            <button
              key={p}
              type="button"
              id={`platform-btn-${p.toLowerCase().replace(/[^a-z]/g, '')}`}
              onClick={() => setPlatform(p)}
              className={`text-xs font-bold px-3 py-1 rounded-lg transition-all cursor-pointer ${
                platform === p
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Preset Indian Client Personas */}
      <div className="pt-4 pb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Quick Test Scenarios (Indian Retail & HNI Cases):
          </span>
          {activeSampleId && (
            <button
              type="button"
              onClick={() => {
                setActiveSampleId(null);
                setNotes('');
              }}
              className="text-[11px] text-slate-400 hover:text-rose-600 transition-colors font-medium"
            >
              Clear Notes
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {SAMPLE_MEETING_NOTES.map((sample) => {
            const isSelected = activeSampleId === sample.id;
            return (
              <button
                key={sample.id}
                type="button"
                id={`sample-pill-${sample.id}`}
                onClick={() => handleSelectSample(sample.id)}
                className={`text-left p-3 rounded-xl border transition-all cursor-pointer text-xs ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50/70 text-indigo-950 ring-1 ring-indigo-400'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="font-bold truncate text-xs text-slate-900 flex items-center justify-between gap-1">
                  <span className="truncate">{sample.title.split('-')[0]}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                </div>
                <div className="text-[10px] text-indigo-700 font-semibold mt-1 inline-block bg-indigo-100/70 px-2 py-0.5 rounded-md">
                  {sample.badge}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Textarea for raw notes */}
      <div className="relative mt-2">
        <textarea
          id="raw-notes-input"
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            if (activeSampleId) setActiveSampleId(null);
          }}
          rows={5}
          placeholder="e.g., Met with Ramesh (35, Architect) in Pune. Monthly surplus ~₹60k. Wants child higher education fund in 12 yrs and retirement. Nervous about market corrections, currently holding ₹10L in savings bank. Needs 80C tax planning. Wants SIP plan on NJ Wealth."
          className="w-full text-xs sm:text-sm font-normal text-slate-800 bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder:text-slate-400 transition-all font-mono leading-relaxed"
        />
        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 mt-1 font-mono">
          <span>Accepts rough bullet points, Lakhs/Crores figures, or audio transcript excerpts.</span>
          <span>{notes.trim().length} chars</span>
        </div>
      </div>

      {/* Optional Preferences Accordion */}
      <div className="mt-3 border-t border-slate-100 pt-3">
        <button
          type="button"
          id="btn-toggle-advanced"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          <span>Advisor Strategy Nuances & Constraints (Optional)</span>
        </button>

        {showAdvanced && (
          <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <label htmlFor="custom-instructions" className="block text-[11px] font-semibold text-slate-700 mb-1">
              Specific Advisor Directives (e.g., &quot;Mandate 15% in Multi-Asset&quot;, &quot;Client refuses Small Cap&quot;, &quot;Focus on 80C ELSS&quot;):
            </label>
            <input
              id="custom-instructions"
              type="text"
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              placeholder="e.g. Include 10% in Gold ETF/Multi Asset, or suggest 6-month STP from Liquid to Flexi Cap"
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        )}
      </div>

      {/* Primary Action Button */}
      <div className="mt-5 flex items-center justify-end gap-3">
        <button
          type="button"
          id="btn-synthesize-dossier"
          disabled={!notes.trim() || isLoading}
          onClick={onSubmit}
          className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-xs transition-all cursor-pointer ${
            !notes.trim() || isLoading
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
              : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99]'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Synthesizing Profile & SEBI Allocation...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>Synthesize Advisor Dossier</span>
            </>
          )}
        </button>
      </div>

      {isLoading && (
        <div className="mt-3.5 p-3.5 rounded-xl bg-indigo-50/80 border border-indigo-100 text-xs text-indigo-900 flex items-center gap-3 animate-pulse">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
          <p className="text-[11px] leading-relaxed">
            Parsing demographics, matching AMFI scheme categories, balancing risk capacity with investment horizon, and drafting plain-English advisor talking points...
          </p>
        </div>
      )}
    </div>
  );
};

