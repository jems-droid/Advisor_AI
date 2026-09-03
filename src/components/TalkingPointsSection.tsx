import React, { useState } from 'react';
import { MessageSquareQuote, Check, Copy, HelpCircle, Volume2 } from 'lucide-react';
import { TalkingPoint } from '../types';

interface TalkingPointsSectionProps {
  talkingPoints: TalkingPoint[];
}

export const TalkingPointsSection: React.FC<TalkingPointsSectionProps> = ({ talkingPoints }) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopyScript = (script: string, idx: number) => {
    navigator.clipboard.writeText(script);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="bg-indigo-900 text-white p-5 sm:p-6 rounded-2xl shadow-lg relative overflow-hidden">
      {/* Background ambient decorative glow */}
      <div className="absolute bottom-[-30px] right-[-30px] w-48 h-48 bg-indigo-800/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[-20px] left-[-20px] w-36 h-36 bg-indigo-700/30 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-indigo-800/80">
          <h2 className="text-xs font-bold text-indigo-300 uppercase tracking-widest flex items-center gap-2">
            <MessageSquareQuote className="w-3.5 h-3.5 text-indigo-300" />
            Advisory Concepts & In-Meeting Talk-Tracks
          </h2>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-800 text-indigo-200 px-2.5 py-1 rounded-full border border-indigo-700">
            Jargon Demystified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {talkingPoints.map((tp, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-4 rounded-xl bg-indigo-950/60 border border-indigo-800/90 hover:border-indigo-600 transition-all group"
            >
              <div>
                {/* Header title */}
                <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                  {tp.title}
                </h3>

                {/* Jargon Demystification Pill */}
                {tp.jargonDemystified && (
                  <div className="mb-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-900 text-indigo-200 border border-indigo-700/80 text-[10px] font-semibold">
                    <HelpCircle className="w-3 h-3 text-indigo-300 shrink-0" />
                    <span>Demystifying: {tp.jargonDemystified}</span>
                  </div>
                )}

                {/* Plain English explanation */}
                <p className="text-xs text-indigo-100/90 leading-relaxed mb-3.5">
                  {tp.plainEnglishExplanation}
                </p>

                {/* Advisor in-meeting script box */}
                <div className="p-3 rounded-lg bg-indigo-900/90 border border-indigo-700/60 shadow-inner">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1">
                    <Volume2 className="w-3 h-3" />
                    Advisor In-Meeting Script:
                  </div>
                  <p className="text-xs text-white italic leading-relaxed">
                    &ldquo;{tp.advisorScript}&rdquo;
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-indigo-800/80 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleCopyScript(tp.advisorScript, idx)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-200 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedIdx === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Script Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Script</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

