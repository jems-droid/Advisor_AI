import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  IndianRupee,
  Sparkles,
  ArrowUpRight,
  Clock,
  PieChart,
  ShieldAlert,
  Calculator,
  Layers,
} from 'lucide-react';
import { WealthCreationMetrics } from '../types';
import {
  formatInr,
  calculateWealthMetrics,
  parseSurplusAndLumpsum,
  parseHorizonYears,
} from '../utils/wealthCalculator';

interface WealthCreationSectionProps {
  surplusText: string;
  horizonText: string;
  equityTotal: number;
  debtHybridTotal: number;
  initialCagr?: number;
}

export const WealthCreationSection: React.FC<WealthCreationSectionProps> = ({
  surplusText,
  horizonText,
  equityTotal,
  debtHybridTotal,
  initialCagr,
}) => {
  // Compute default blended CAGR
  const computedCagr = useMemo(() => {
    if (initialCagr && initialCagr > 0) return initialCagr;
    const rate = (equityTotal * 13.5 + debtHybridTotal * 7.5) / 100;
    return Number(rate.toFixed(1));
  }, [initialCagr, equityTotal, debtHybridTotal]);

  // Initial parsed parameters
  const parsed = useMemo(() => parseSurplusAndLumpsum(surplusText), [surplusText]);
  const parsedHorizon = useMemo(() => parseHorizonYears(horizonText), [horizonText]);

  // State for interactive advisor adjustments during live meeting
  const [horizonYears, setHorizonYears] = useState<number>(parsedHorizon);
  const [monthlySip, setMonthlySip] = useState<number>(parsed.monthlySip);
  const [lumpsum, setLumpsum] = useState<number>(parsed.lumpsum);
  const [cagrRate, setCagrRate] = useState<number>(computedCagr);
  const [isCustomizing, setIsCustomizing] = useState<boolean>(false);

  // Recalculate metrics
  const metrics: WealthCreationMetrics = useMemo(() => {
    return calculateWealthMetrics(monthlySip, lumpsum, horizonYears, cagrRate);
  }, [monthlySip, lumpsum, horizonYears, cagrRate]);

  // Proportions for visual bar
  const totalFv = metrics.projectedFutureValue || 1;
  const principalPercent = Math.min(100, Math.round((metrics.totalInvestment / totalFv) * 100));
  const wealthPercent = Math.max(0, 100 - principalPercent);

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              Wealth Creation & Compounding Projection
            </h2>
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
              Future Value (F.V.) Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Simulated portfolio compounding based on client cashflows ({surplusText}) over {horizonYears} Years.
          </p>
        </div>

        {/* Toggle Interactive Calibration */}
        <button
          type="button"
          onClick={() => setIsCustomizing(!isCustomizing)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Calculator className="w-3.5 h-3.5 text-indigo-600" />
          <span>{isCustomizing ? 'Hide Controls' : 'Fine-Tune Simulation'}</span>
        </button>
      </div>

      {/* Interactive Sliders / Inputs (Optional Dropdown) */}
      {isCustomizing && (
        <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-4 animate-in fade-in duration-200">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
              Horizon ({horizonYears} Years)
            </label>
            <div className="flex items-center gap-1">
              {[3, 5, 7, 10, 15].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setHorizonYears(yr)}
                  className={`flex-1 py-1 rounded text-xs font-semibold cursor-pointer ${
                    horizonYears === yr
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {yr}Y
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
              Monthly SIP (₹)
            </label>
            <input
              type="number"
              step="5000"
              value={monthlySip}
              onChange={(e) => setMonthlySip(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-mono text-slate-800 font-bold"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
              Lumpsum / STP (₹)
            </label>
            <input
              type="number"
              step="50000"
              value={lumpsum}
              onChange={(e) => setLumpsum(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-mono text-slate-800 font-bold"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
              CAGR Rate (% p.a.)
            </label>
            <input
              type="number"
              step="0.5"
              value={cagrRate}
              onChange={(e) => setCagrRate(parseFloat(e.target.value) || 12)}
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-mono text-slate-800 font-bold"
            />
          </div>
        </div>
      )}

      {/* 4 Essential Wealth Creation Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
        {/* Metric 1: Blended Portfolio CAGR */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
              Blended Portfolio CAGR
            </span>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono mt-1.5">
              ~{cagrRate}%
            </p>
          </div>
          <span className="text-[11px] text-slate-500 mt-2">
            Based on {equityTotal}% Equity / {debtHybridTotal}% Hybrid-Debt allocation
          </span>
        </div>

        {/* Metric 2: Total Investment */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <IndianRupee className="w-3.5 h-3.5 text-slate-500" />
              Total Investment
            </span>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-mono mt-1.5">
              {formatInr(metrics.totalInvestment, true)}
            </p>
          </div>
          <div className="text-[11px] text-slate-500 mt-2 truncate font-mono">
            {lumpsum > 0 ? `${formatInr(lumpsum, true)} Lump + ` : ''}
            {monthlySip > 0 ? `${formatInr(monthlySip)} × ${horizonYears * 12}m` : ''}
          </div>
        </div>

        {/* Metric 3: Projected Future Value (F.V.) */}
        <div className="bg-indigo-50/70 p-4 rounded-xl border border-indigo-200 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Projected Future Value (F.V.)
            </span>
            <p className="text-2xl sm:text-3xl font-black text-indigo-950 font-mono mt-1.5">
              {formatInr(metrics.projectedFutureValue, true)}
            </p>
          </div>
          <span className="text-[11px] text-indigo-700 font-medium mt-2">
            Estimated corpus after {horizonYears} Years
          </span>
        </div>

        {/* Metric 4: Net Wealth Created */}
        <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-200 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
              Net Wealth Created
            </span>
            <p className="text-2xl sm:text-3xl font-black text-emerald-800 font-mono mt-1.5">
              +{formatInr(metrics.netWealthCreated, true)}
            </p>
          </div>
          <div className="flex items-center justify-between text-[11px] font-bold text-emerald-700 mt-2">
            <span>{metrics.wealthMultiplier}x Growth Multiplier</span>
            <span>+{Math.round((metrics.netWealthCreated / Math.max(metrics.totalInvestment, 1)) * 100)}% Gain</span>
          </div>
        </div>
      </div>

      {/* Visual Stacked Wealth Bar & Comparison Ratio */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
        <div className="flex items-center justify-between text-xs font-bold mb-2">
          <span className="text-slate-700 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-400 inline-block" />
            Capital Invested: {formatInr(metrics.totalInvestment)} ({principalPercent}%)
          </span>
          <span className="text-emerald-700 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />
            Wealth Gain (Compounding): +{formatInr(metrics.netWealthCreated)} ({wealthPercent}%)
          </span>
        </div>

        {/* Bar */}
        <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
          <div
            style={{ width: `${principalPercent}%` }}
            className="h-full bg-slate-400 transition-all duration-500"
            title={`Invested: ${formatInr(metrics.totalInvestment)}`}
          />
          <div
            style={{ width: `${wealthPercent}%` }}
            className="h-full bg-emerald-500 transition-all duration-500"
            title={`Net Wealth Created: ${formatInr(metrics.netWealthCreated)}`}
          />
        </div>

        {/* Milestone compounding footnote */}
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 gap-1.5 pt-2 border-t border-slate-200/60">
          <span className="italic">
            * Assumptions: Compounded annually at assumed ~{cagrRate}% CAGR over {horizonYears} years. Mutual funds do not offer assured returns.
          </span>
          <span className="font-mono text-[10px] text-slate-400">
            Rule of 72 Doubling Time: ~{(72 / cagrRate).toFixed(1)} Years
          </span>
        </div>
      </div>
    </div>
  );
};
