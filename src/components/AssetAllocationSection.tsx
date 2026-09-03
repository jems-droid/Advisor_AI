import React from 'react';
import { PieChart, TrendingUp, CheckCircle2, Building2, AlertTriangle, Landmark, ShieldCheck } from 'lucide-react';
import { AssetAllocationItem } from '../types';

interface AssetAllocationSectionProps {
  assetAllocation: {
    equityTotal: number;
    debtHybridTotal: number;
    taxSavingTotal: number;
    categories: AssetAllocationItem[];
    strategicRationale: string;
  };
  platform: string;
  platformExecutionGuide?: {
    platform: string;
    executionSteps: string[];
    mandateRecommendations: string;
  };
}

export const AssetAllocationSection: React.FC<AssetAllocationSectionProps> = ({
  assetAllocation,
  platform,
  platformExecutionGuide,
}) => {
  // Calculate indicative 10Y CAGR based on equity weight
  const estimatedCagr = (
    12.0 + (assetAllocation.equityTotal / 100) * 3.2
  ).toFixed(1);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
            <PieChart className="w-4 h-4 text-indigo-600" />
            Proposed Asset Allocation & SEBI Scheme Framework
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            SEBI/AMFI mutual fund categories & generic AMC reference examples aligned with {platform}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-xs bg-indigo-600" />
            <span className="text-xs font-semibold text-slate-700">Equity ({assetAllocation.equityTotal}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-xs bg-slate-300" />
            <span className="text-xs font-semibold text-slate-700">Hybrid/Debt ({assetAllocation.debtHybridTotal}%)</span>
          </div>
          {assetAllocation.taxSavingTotal > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-xs bg-purple-600" />
              <span className="text-xs font-semibold text-slate-700">ELSS ({assetAllocation.taxSavingTotal}%)</span>
            </div>
          )}
        </div>
      </div>

      {/* Mandatory Advisor Action Disclaimer Callout */}
      <div className="mb-6 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/90 text-xs text-amber-900 flex items-start sm:items-center gap-3 shadow-2xs">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1">
          <span className="font-bold uppercase tracking-wider text-[11px] text-amber-950 block sm:inline mr-1.5">
            Advisor Scheme Selection Rule:
          </span>
          <span className="font-medium text-amber-900">
            Select exact schemes via your NJ Wealth / AssetPlus Fund Finder panel based on live portal ratings.
          </span>
        </div>
        <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 border border-amber-200">
          <ShieldCheck className="w-3 h-3 text-amber-700" /> AMFI Compliant
        </span>
      </div>

      {/* Top Allocation Bar & Est CAGR block */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        <div className="lg:col-span-3 flex flex-col justify-center gap-4">
          {/* Multi-shade bar */}
          <div className="h-8 w-full bg-slate-100 rounded-lg overflow-hidden flex shadow-inner">
            <div
              className="h-full bg-indigo-600 transition-all duration-500"
              style={{ width: `${Math.max(15, assetAllocation.equityTotal * 0.55)}%` }}
              title="Core Large & Flexi Cap"
            />
            <div
              className="h-full bg-indigo-500 transition-all duration-500"
              style={{ width: `${Math.max(10, assetAllocation.equityTotal * 0.3)}%` }}
              title="Mid Cap Growth"
            />
            <div
              className="h-full bg-indigo-400 transition-all duration-500"
              style={{ width: `${Math.max(5, assetAllocation.equityTotal * 0.15)}%` }}
              title="Small Cap / Emerging"
            />
            <div
              className="h-full bg-slate-300 transition-all duration-500"
              style={{ width: `${assetAllocation.debtHybridTotal}%` }}
              title="Debt / Hybrid / Arbitrage"
            />
            {assetAllocation.taxSavingTotal > 0 && (
              <div
                className="h-full bg-purple-600 transition-all duration-500"
                style={{ width: `${assetAllocation.taxSavingTotal}%` }}
                title="80C ELSS"
              />
            )}
          </div>

          {/* Subcategory split list */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {assetAllocation.categories.slice(0, 4).map((c, i) => (
              <div key={i} className="flex justify-between border-b border-slate-100 pb-1 text-xs">
                <span className="text-slate-500 truncate font-medium">
                  {c.sebiCategory || c.subcategory}
                </span>
                <span className="font-bold text-slate-800 font-mono">{c.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight Projection Metric Card */}
        <div className="lg:col-span-2 bg-slate-50 rounded-xl p-5 flex flex-col justify-center items-center border border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Est. 10Y Target Portfolio CAGR
          </p>
          <p className="text-3xl font-black text-indigo-600 mt-1 font-mono tracking-tight">
            ~{estimatedCagr}%
          </p>
          <p className="text-[10px] text-slate-400 mt-1 italic">
            (Simulated across {assetAllocation.equityTotal}% equity & {assetAllocation.debtHybridTotal}% debt allocation mix)
          </p>
        </div>
      </div>

      {/* Strategic Rationale */}
      {assetAllocation.strategicRationale && (
        <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5">
          <TrendingUp className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 font-bold block mb-0.5 uppercase tracking-wider text-[11px]">
              Strategic Portfolio Rationale:
            </strong>
            <p>{assetAllocation.strategicRationale}</p>
          </div>
        </div>
      )}

      {/* Categories Matrix Table with SEBI Categories and Generic Fund Houses */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 bg-slate-50 font-bold text-[10px] uppercase tracking-widest">
              <th className="py-2.5 px-3">SEBI Defined Fund Category</th>
              <th className="py-2.5 px-3 text-center">Weight</th>
              <th className="py-2.5 px-3">Horizon / Risk</th>
              <th className="py-2.5 px-3">Advisory Rationale</th>
              <th className="py-2.5 px-3">Generic Reference AMCs & Schemes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {assetAllocation.categories.map((item, index) => {
              const isEquity = item.category.toLowerCase().includes('equity');
              const isTax = item.category.toLowerCase().includes('tax') || item.category.toLowerCase().includes('elss');
              const badgeClass = isEquity
                ? 'bg-indigo-50 text-indigo-700 border-indigo-100'
                : isTax
                ? 'bg-purple-50 text-purple-700 border-purple-100'
                : 'bg-slate-100 text-slate-700 border-slate-200';

              const fundHouses = item.sampleFundHouses && item.sampleFundHouses.length > 0
                ? item.sampleFundHouses
                : ['HDFC Mutual Fund', 'ICICI Prudential Mutual Fund', 'SBI Mutual Fund'];

              return (
                <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border ${badgeClass} mb-1 uppercase tracking-wider`}>
                      {item.category}
                    </span>
                    <div className="text-xs font-bold text-slate-900">
                      {item.sebiCategory || item.subcategory}
                    </div>
                    {item.sebiCategory && item.subcategory !== item.sebiCategory && (
                      <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                        {item.subcategory}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-slate-900 text-sm">
                    <span className="inline-block bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 font-mono">
                      {item.percentage}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-700">
                    <div className="font-semibold text-slate-900">{item.suggestedTenure}</div>
                    <span className="text-[10px] text-slate-400 font-medium">Risk: {item.riskProfile}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-600 max-w-xs leading-relaxed">
                    {item.rationale}
                  </td>
                  <td className="py-3 px-3 text-slate-600 max-w-xs">
                    {/* Recognized Fund Houses */}
                    <div className="mb-2">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                        <Landmark className="w-2.5 h-2.5 text-indigo-500" /> Reference AMCs:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {fundHouses.map((amc, aIdx) => (
                          <span
                            key={aIdx}
                            className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-xs border border-slate-200"
                          >
                            {amc.replace(' Mutual Fund', '')}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Generic Sample Scheme Examples */}
                    {item.sampleSchemes && item.sampleSchemes.length > 0 && (
                      <div className="space-y-0.5 pt-1 border-t border-slate-100">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                          Example Category Schemes:
                        </span>
                        {item.sampleSchemes.slice(0, 2).map((scheme, sIdx) => (
                          <div key={sIdx} className="text-[11px] font-medium text-slate-700 flex items-center gap-1 truncate" title={scheme}>
                            <span className="w-1 h-1 rounded-full bg-indigo-500 shrink-0" />
                            <span className="truncate">{scheme}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Advisory Scheme Selection Footer Note */}
      <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 flex items-center justify-between">
        <span className="italic">
          * Reference schemes and AMCs are for indicative asset allocation illustration on {platform}. Final scheme selection rests with the advisor following client suitability analysis.
        </span>
        <span className="text-slate-400 font-mono text-[10px] shrink-0 ml-2 hidden sm:inline">
          AMFI Code of Conduct
        </span>
      </div>

      {/* Platform Execution Guide */}
      {platformExecutionGuide && (
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200/80">
            <Building2 className="w-4 h-4 text-indigo-600" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
              {platformExecutionGuide.platform} Execution Workflow
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-bold text-slate-700 block mb-1 text-[11px] uppercase tracking-wider">
                Transaction Steps:
              </span>
              <ul className="space-y-1.5 text-slate-600 text-[11px]">
                {platformExecutionGuide.executionSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-bold text-slate-700 block mb-1 text-[11px] uppercase tracking-wider">
                Mandate & Banking Guidance:
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                {platformExecutionGuide.mandateRecommendations}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


