import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { SebiRiskometerLevel } from '../types';
import { SEBI_RISKOMETER_MAP, ALL_SEBI_RISKOMETER_LEVELS } from '../utils/sebiRiskometer';

interface SebiRiskometerGaugeProps {
  currentLevel: SebiRiskometerLevel;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  className?: string;
  schemeOrPortfolioName?: string;
}

export const SebiRiskometerGauge: React.FC<SebiRiskometerGaugeProps> = ({
  currentLevel,
  size = 'md',
  showDetails = true,
  className = '',
  schemeOrPortfolioName,
}) => {
  const meta = SEBI_RISKOMETER_MAP[currentLevel] || SEBI_RISKOMETER_MAP.Moderate;

  // Colors for each segment in the SEBI Riskometer
  const segmentColors = [
    { bg: 'bg-emerald-500', border: 'border-emerald-600', text: 'Low' },
    { bg: 'bg-teal-500', border: 'border-teal-600', text: 'Low-Mod' },
    { bg: 'bg-amber-400', border: 'border-amber-500', text: 'Moderate' },
    { bg: 'bg-orange-500', border: 'border-orange-600', text: 'Mod High' },
    { bg: 'bg-rose-500', border: 'border-rose-600', text: 'High' },
    { bg: 'bg-red-700', border: 'border-red-800', text: 'Very High' },
  ];

  return (
    <div className={`bg-white rounded-xl border border-slate-200 p-3.5 sm:p-4 shadow-2xs ${className}`}>
      {/* Riskometer Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-[10px]">
            §
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                SEBI Standard Riskometer
              </span>
              <span className="text-[9px] font-semibold bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">
                AMFI Circular
              </span>
            </div>
            {schemeOrPortfolioName && (
              <p className="text-xs font-bold text-slate-800 truncate max-w-[240px]">
                {schemeOrPortfolioName}
              </p>
            )}
          </div>
        </div>

        {/* Current Level Pill */}
        <div className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 shadow-2xs ${meta.colorClass.bg} ${meta.colorClass.text} ${meta.colorClass.border}`}>
          <span className={`w-2 h-2 rounded-full ${meta.colorClass.dot} animate-pulse`} />
          <span>{meta.level}</span>
        </div>
      </div>

      {/* 6-Level Segmented Riskometer Bar */}
      <div className="space-y-1.5">
        <div className="grid grid-cols-6 gap-1 sm:gap-1.5">
          {ALL_SEBI_RISKOMETER_LEVELS.map((level, idx) => {
            const isTarget = level === currentLevel;
            const seg = segmentColors[idx];

            return (
              <div key={level} className="relative flex flex-col items-center">
                <div
                  className={`w-full h-3 sm:h-3.5 rounded-sm transition-all duration-300 ${
                    isTarget
                      ? `${seg.bg} ring-2 ring-slate-900 ring-offset-1 shadow-xs scale-y-110 z-10`
                      : 'bg-slate-200 opacity-60'
                  }`}
                  title={`${level}: ${SEBI_RISKOMETER_MAP[level].label}`}
                />
                <span
                  className={`text-[9px] sm:text-[10px] mt-1 text-center font-bold truncate w-full ${
                    isTarget ? 'text-slate-900 font-black' : 'text-slate-400 font-medium'
                  }`}
                >
                  {seg.text}
                </span>
                {isTarget && (
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-0.5" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Description & Suitability */}
      {showDetails && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-600">
          <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong className="text-slate-800 font-semibold">{meta.label}:</strong>{' '}
            {meta.description}
          </p>
        </div>
      )}
    </div>
  );
};
