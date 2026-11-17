import React, { useState } from 'react';
import {
  Layers,
  CheckSquare,
  Square,
  Landmark,
  TrendingUp,
  Filter,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { RecommendedScheme, SebiRiskometerLevel } from '../types';
import { SEBI_RISKOMETER_MAP } from '../utils/sebiRiskometer';

interface FundComparisonTableProps {
  schemes: RecommendedScheme[];
  onToggleScheme: (id: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  platform: 'NJ Wealth' | 'AssetPlus' | 'Direct / BSE StAR / MFU';
}

export const FundComparisonTable: React.FC<FundComparisonTableProps> = ({
  schemes,
  onToggleScheme,
  onSelectAll,
  onDeselectAll,
  platform,
}) => {
  const [platformFilter, setPlatformFilter] = useState<'All' | 'NJ Wealth' | 'AssetPlus' | 'AMFI'>('All');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Equity' | 'Hybrid' | 'Debt' | 'Tax Saving'>('All');

  const filteredSchemes = schemes.filter((s) => {
    if (platformFilter !== 'All') {
      if (!s.platforms.includes(platformFilter as any)) return false;
    }
    if (categoryFilter !== 'All') {
      if (!s.category.toLowerCase().includes(categoryFilter.toLowerCase())) return false;
    }
    return true;
  });

  const selectedCount = schemes.filter((s) => s.isSelected).length;

  // Compute average returns of selected schemes
  const selectedSchemes = schemes.filter((s) => s.isSelected);
  const avg3Y = selectedSchemes.length
    ? (selectedSchemes.reduce((acc, s) => acc + s.return3Y, 0) / selectedSchemes.length).toFixed(1)
    : '0';
  const avg5Y = selectedSchemes.length
    ? (selectedSchemes.reduce((acc, s) => acc + s.return5Y, 0) / selectedSchemes.length).toFixed(1)
    : '0';

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              Recommended Scheme Comparison Table
            </h2>
            <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-200">
              Cross-Platform (NJ Wealth • AssetPlus • AMFI)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Compare past returns (1Y, 3Y, 5Y), inception dates, and SEBI Riskometer tags. Checkmark schemes to include in proposal & cart.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onSelectAll}
            className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
          >
            Select All
          </button>
          <button
            type="button"
            onClick={onDeselectAll}
            className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
          >
            Clear
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>{selectedCount} Selected for Proposal</span>
          </div>
        </div>
      </div>

      {/* Filter Chips & Performance Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200">
        {/* Platform Filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Platform:
          </span>
          {(['All', 'NJ Wealth', 'AssetPlus', 'AMFI'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlatformFilter(p)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                platformFilter === p
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Selected Portfolio Averages */}
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <span className="text-[10px] font-bold uppercase text-slate-400">Basket Return:</span>
          <span>
            Avg 3Y: <strong className="text-emerald-700 font-mono">{avg3Y}%</strong>
          </span>
          <span className="text-slate-300">|</span>
          <span>
            Avg 5Y: <strong className="text-indigo-700 font-mono">{avg5Y}%</strong>
          </span>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <th className="py-3 px-3 text-center w-10">Select</th>
              <th className="py-3 px-3">Scheme Name & AMC</th>
              <th className="py-3 px-3">SEBI Category</th>
              <th className="py-3 px-3">SEBI Riskometer</th>
              <th className="py-3 px-3 text-center">Platforms</th>
              <th className="py-3 px-3 text-right">1Y Return</th>
              <th className="py-3 px-3 text-right">3Y CAGR</th>
              <th className="py-3 px-3 text-right">5Y CAGR</th>
              <th className="py-3 px-3 text-center">Inception Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredSchemes.map((s) => {
              const riskMeta = SEBI_RISKOMETER_MAP[s.sebiRiskometer] || SEBI_RISKOMETER_MAP.Moderate;

              return (
                <tr
                  key={s.id}
                  className={`transition-colors ${
                    s.isSelected ? 'bg-indigo-50/30 hover:bg-indigo-50/50' : 'hover:bg-slate-50'
                  }`}
                >
                  {/* Selection Checkbox */}
                  <td className="py-3 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => onToggleScheme(s.id)}
                      className="cursor-pointer text-slate-700 hover:text-indigo-600 transition-colors inline-flex items-center justify-center"
                      title={s.isSelected ? 'Remove from proposal' : 'Include in proposal'}
                    >
                      {s.isSelected ? (
                        <CheckSquare className="w-4 h-4 text-indigo-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300" />
                      )}
                    </button>
                  </td>

                  {/* Scheme Name & AMC */}
                  <td className="py-3 px-3 max-w-xs">
                    <div className="font-bold text-slate-900 leading-snug">
                      {s.name}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-slate-400">
                      <span className="font-medium text-slate-600">{s.fundHouse}</span>
                      <span>•</span>
                      <span className="font-mono">AMFI: {s.amfiCode}</span>
                    </div>
                  </td>

                  {/* SEBI Category */}
                  <td className="py-3 px-3">
                    <span className="text-slate-800 font-medium block">
                      {s.sebiCategory.replace('SEBI: ', '')}
                    </span>
                    <span className="text-[10px] text-slate-400">{s.category}</span>
                  </td>

                  {/* SEBI Riskometer Tag */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${riskMeta.colorClass.bg} ${riskMeta.colorClass.text} ${riskMeta.colorClass.border}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${riskMeta.colorClass.dot}`} />
                      {s.sebiRiskometer}
                    </span>
                  </td>

                  {/* Platforms */}
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1">
                      {s.platforms.map((p) => (
                        <span
                          key={p}
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                            p === platform
                              ? 'bg-indigo-600 text-white border-indigo-700'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {p === 'NJ Wealth' ? 'NJ' : p === 'AssetPlus' ? 'AP' : 'AMFI'}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* 1Y Return */}
                  <td className="py-3 px-3 text-right font-mono font-semibold text-slate-700">
                    {s.return1Y > 0 ? `+${s.return1Y}%` : `${s.return1Y}%`}
                  </td>

                  {/* 3Y CAGR */}
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    <span className="inline-block bg-slate-100 px-1.5 py-0.5 rounded text-emerald-800 font-semibold">
                      +{s.return3Y}%
                    </span>
                  </td>

                  {/* 5Y CAGR */}
                  <td className="py-3 px-3 text-right font-mono font-bold text-indigo-900">
                    +{s.return5Y}%
                  </td>

                  {/* Inception Date */}
                  <td className="py-3 px-3 text-center font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {s.inceptionDate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <div className="mt-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-slate-400 gap-2">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
          Past performance is not indicative of future returns. Returns are CAGR as of latest AMFI NAV disclosures.
        </span>
        <span className="font-semibold text-slate-600">
          Ready for {platform} Cart Dispatch
        </span>
      </div>
    </div>
  );
};
