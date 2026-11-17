import React from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Clock,
  User,
  IndianRupee,
  Layers,
  FileCheck,
  Calendar,
  Briefcase,
  AlertTriangle,
} from 'lucide-react';
import { AdvisorAnalysisResult, RecommendedScheme } from '../types';
import { SEBI_RISKOMETER_MAP, ALL_SEBI_RISKOMETER_LEVELS } from '../utils/sebiRiskometer';
import { formatInr, calculateWealthMetrics, parseSurplusAndLumpsum, parseHorizonYears } from '../utils/wealthCalculator';

interface PrintProposalDocumentProps {
  result: AdvisorAnalysisResult;
  selectedSchemes: RecommendedScheme[];
  platform: 'NJ Wealth' | 'AssetPlus' | 'Direct / BSE StAR / MFU';
}

export const PrintProposalDocument: React.FC<PrintProposalDocumentProps> = ({
  result,
  selectedSchemes,
  platform,
}) => {
  const profile = result.clientProfile;
  const allocation = result.assetAllocation;

  // Sebi Riskometer meta
  const riskLevel = profile.sebiRiskometer || 'Moderately High';
  const riskMeta = SEBI_RISKOMETER_MAP[riskLevel] || SEBI_RISKOMETER_MAP.Moderate;

  // Wealth Metrics calculation
  const parsedSurplus = parseSurplusAndLumpsum(profile.monthlySurplusOrLumpsum);
  const parsedHorizon = parseHorizonYears(profile.investmentHorizon);
  const blendedCagr = Number(((allocation.equityTotal * 13.5 + allocation.debtHybridTotal * 7.5) / 100).toFixed(1));
  const wealthMetrics = calculateWealthMetrics(
    parsedSurplus.monthlySip,
    parsedSurplus.lumpsum,
    parsedHorizon,
    blendedCagr
  );

  const displaySchemes = selectedSchemes.length > 0 ? selectedSchemes : (result.recommendedSchemes || []);

  return (
    <div className="hidden print:block text-slate-900 bg-white font-sans text-xs">
      {/* ================= PAGE 1 ================= */}
      <div className="page-break-after-always min-h-[270mm] flex flex-col justify-between p-6">
        <div>
          {/* Document Header */}
          <div className="border-b-2 border-indigo-600 pb-3 mb-4 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  WealthWise Portfolio Proposal
                </h1>
                <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
                  SEBI & AMFI Registered
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Tailored Mutual Fund Advisory & Strategic Asset Allocation Dossier
              </p>
            </div>
            <div className="text-right text-[11px] text-slate-500">
              <p className="font-bold text-slate-800">Date: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
              <p>Platform Architecture: <strong className="text-indigo-600">{platform}</strong></p>
              <p className="text-[10px] text-slate-400">Ref: WW-PROP-{Date.now().toString().slice(-6)}</p>
            </div>
          </div>

          {/* Section 1: Client Profile & Economic Background */}
          <div className="mb-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50/60 px-2.5 py-1 rounded border border-indigo-100 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <User className="w-3 h-3 text-indigo-600" /> 1. Client Profiling & Financial Parameters
              </span>
              <span className="text-slate-600">CONFIDENTIAL</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-[11px] border border-slate-200 rounded-lg p-2.5 bg-slate-50/50">
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Client Name</span>
                <strong className="text-slate-900 text-xs">{profile.clientName}</strong>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Age & Profession</span>
                <span className="text-slate-800 font-medium">{profile.age || '34 Yrs'} • {profile.occupation}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Annual Income / Cashflow</span>
                <span className="text-slate-800 font-medium font-mono">{profile.annualIncome}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Family Dependents</span>
                <span className="text-slate-800 font-medium">{profile.familyDependents}</span>
              </div>

              <div className="col-span-2 pt-2 border-t border-slate-200">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Surplus & Allocation Capacity</span>
                <strong className="text-indigo-900 font-mono text-xs">{profile.monthlySurplusOrLumpsum}</strong>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-200">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Defined Horizon & Liquidity</span>
                <span className="text-slate-700">{profile.investmentHorizon} | Buffer: {profile.liquidityNeeds}</span>
              </div>
            </div>
          </div>

          {/* Section 2: SEBI Standard 6-Level Riskometer */}
          <div className="mb-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-1 rounded border border-slate-200 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-indigo-600" /> 2. SEBI Standard Riskometer Classification
              </span>
              <span className="font-bold text-slate-800">
                Assessed Profile: {riskLevel}
              </span>
            </div>

            <div className="border border-slate-200 rounded-lg p-3 bg-white">
              {/* 6-Level Bar */}
              <div className="grid grid-cols-6 gap-1 mb-2">
                {ALL_SEBI_RISKOMETER_LEVELS.map((lvl) => {
                  const isMatch = lvl === riskLevel;
                  const m = SEBI_RISKOMETER_MAP[lvl];
                  return (
                    <div key={lvl} className="text-center">
                      <div
                        className={`h-4 rounded-xs border transition-all ${
                          isMatch
                            ? `${m.colorClass.activeBar} border-slate-900 ring-2 ring-slate-900`
                            : 'bg-slate-100 border-slate-200 opacity-60'
                        }`}
                      />
                      <span className={`text-[8px] font-bold uppercase block mt-1 ${isMatch ? 'text-slate-900 font-black' : 'text-slate-400'}`}>
                        {lvl}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] text-slate-600 leading-snug mt-1">
                <strong>SEBI Risk Definition:</strong> {riskMeta.description}
              </p>
            </div>
          </div>

          {/* Section 3: Recommended Asset Allocation */}
          <div className="mb-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50/60 px-2.5 py-1 rounded border border-indigo-100 mb-2 flex items-center justify-between">
              <span>3. Recommended Asset Allocation Breakdown (SEBI Categories)</span>
              <span className="font-mono text-slate-700">
                Equity: {allocation.equityTotal}% | Debt/Hybrid: {allocation.debtHybridTotal}%
              </span>
            </div>

            <table className="w-full border-collapse border border-slate-200 text-[10px]">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold uppercase text-[9px]">
                  <th className="border border-slate-200 p-1.5 text-left">SEBI Fund Category</th>
                  <th className="border border-slate-200 p-1.5 text-center w-14">Weight</th>
                  <th className="border border-slate-200 p-1.5 text-left">Tenure / Risk</th>
                  <th className="border border-slate-200 p-1.5 text-left">Advisory Rationale</th>
                </tr>
              </thead>
              <tbody>
                {allocation.categories.map((cat, idx) => (
                  <tr key={idx} className="border-b border-slate-200">
                    <td className="border border-slate-200 p-1.5 font-bold text-slate-900">
                      {cat.sebiCategory || cat.subcategory}
                    </td>
                    <td className="border border-slate-200 p-1.5 text-center font-bold text-slate-900 font-mono">
                      {cat.percentage}%
                    </td>
                    <td className="border border-slate-200 p-1.5 text-slate-600">
                      {cat.suggestedTenure} • {cat.sebiRiskometer || cat.riskProfile}
                    </td>
                    <td className="border border-slate-200 p-1.5 text-slate-600 leading-tight">
                      {cat.rationale}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 4: Wealth Creation & Compounding Projections */}
          <div className="mb-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 mb-2 flex items-center justify-between">
              <span>4. Wealth Creation Metrics & Projected Future Value (F.V.)</span>
              <span>Horizon: {parsedHorizon} Years</span>
            </div>

            <div className="grid grid-cols-4 gap-2 border border-slate-200 rounded-lg p-2.5 bg-slate-50/60 text-center">
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Portfolio CAGR Est.</span>
                <strong className="text-indigo-900 text-sm font-mono">~{blendedCagr}%</strong>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Total Investment</span>
                <strong className="text-slate-900 text-sm font-mono">{formatInr(wealthMetrics.totalInvestment, true)}</strong>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-indigo-600 block">Projected F.V.</span>
                <strong className="text-indigo-950 text-sm font-mono">{formatInr(wealthMetrics.projectedFutureValue, true)}</strong>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-emerald-700 block">Net Wealth Created</span>
                <strong className="text-emerald-800 text-sm font-mono">+{formatInr(wealthMetrics.netWealthCreated, true)}</strong>
              </div>
            </div>
            <p className="text-[9px] text-slate-400 italic mt-1 text-center">
              * Compounding simulation based on assumed ~{blendedCagr}% blended CAGR over {parsedHorizon} years. Mutual fund returns are not guaranteed.
            </p>
          </div>
        </div>

        {/* Page 1 Footer */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[9px] text-slate-400">
          <span>WealthWise Portfolio Proposal • Prepared for {profile.clientName}</span>
          <span className="font-bold">Page 1 of 2</span>
        </div>
      </div>

      {/* ================= PAGE 2 ================= */}
      <div className="min-h-[270mm] flex flex-col justify-between p-6">
        <div>
          {/* Page 2 Header */}
          <div className="border-b-2 border-indigo-600 pb-2 mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                WealthWise Portfolio Proposal • Recommended Schemes & Execution Roadmap
              </h2>
              <p className="text-[11px] text-slate-500">
                Scheme Selection across NJ Wealth / AssetPlus / AMFI & Operational Steps
              </p>
            </div>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded">
              Client: {profile.clientName}
            </span>
          </div>

          {/* Section 5: Fund Comparison Table (Selected Schemes) */}
          <div className="mb-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-800 bg-slate-100 px-2.5 py-1 rounded border border-slate-200 mb-2 flex items-center justify-between">
              <span>5. Recommended Schemes Comparison Table ({displaySchemes.length} Schemes Selected)</span>
              <span className="text-[9px] text-slate-500">SEBI Riskometer & AMFI Returns</span>
            </div>

            <table className="w-full border-collapse border border-slate-200 text-[10px]">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold uppercase text-[9px]">
                  <th className="border border-slate-200 p-1.5 text-left">Scheme Name & AMC</th>
                  <th className="border border-slate-200 p-1.5 text-left">SEBI Category</th>
                  <th className="border border-slate-200 p-1.5 text-center">Riskometer</th>
                  <th className="border border-slate-200 p-1.5 text-right">1Y</th>
                  <th className="border border-slate-200 p-1.5 text-right">3Y CAGR</th>
                  <th className="border border-slate-200 p-1.5 text-right">5Y CAGR</th>
                  <th className="border border-slate-200 p-1.5 text-center">Inception</th>
                </tr>
              </thead>
              <tbody>
                {displaySchemes.map((s, idx) => (
                  <tr key={idx} className="border-b border-slate-200">
                    <td className="border border-slate-200 p-1.5 font-bold text-slate-900">
                      {s.name}
                      <span className="block text-[8px] font-normal text-slate-500 font-mono">
                        {s.fundHouse} • AMFI: {s.amfiCode}
                      </span>
                    </td>
                    <td className="border border-slate-200 p-1.5 text-slate-700">
                      {s.sebiCategory.replace('SEBI: ', '')}
                    </td>
                    <td className="border border-slate-200 p-1.5 text-center">
                      <span className="text-[8px] font-bold bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                        {s.sebiRiskometer}
                      </span>
                    </td>
                    <td className="border border-slate-200 p-1.5 text-right font-mono font-medium text-slate-700">
                      {s.return1Y}%
                    </td>
                    <td className="border border-slate-200 p-1.5 text-right font-mono font-bold text-emerald-800">
                      +{s.return3Y}%
                    </td>
                    <td className="border border-slate-200 p-1.5 text-right font-mono font-bold text-indigo-900">
                      +{s.return5Y}%
                    </td>
                    <td className="border border-slate-200 p-1.5 text-center font-mono text-[9px] text-slate-600">
                      {s.inceptionDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[9px] text-amber-800 italic mt-1 bg-amber-50 p-1.5 rounded border border-amber-200">
              * Advisor Rule: Select exact schemes via your {platform} Fund Finder panel based on live portal ratings.
            </p>
          </div>

          {/* Section 6: Key Strategic Rationale (Plain English) */}
          <div className="mb-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50/60 px-2.5 py-1 rounded border border-indigo-100 mb-2">
              6. Strategic Advisory Talking Points & Investor Rationale
            </div>
            <div className="space-y-2 text-[10px]">
              {result.advisoryConcepts.slice(0, 2).map((concept, idx) => (
                <div key={idx} className="border border-slate-200 rounded p-2 bg-slate-50/40">
                  <strong className="text-slate-900 font-bold block mb-0.5">
                    {idx + 1}. {concept.title}
                  </strong>
                  <p className="text-slate-600 leading-snug">{concept.plainEnglishExplanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 7: Platform Execution Roadmap */}
          <div className="mb-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-1 rounded border border-slate-200 mb-2">
              7. Platform Execution Roadmap ({platform})
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="border border-slate-200 rounded p-2 bg-white">
                <span className="font-bold text-slate-800 block mb-1">Execution Steps:</span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                  {result.platformExecutionGuide.executionSteps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>
              <div className="border border-slate-200 rounded p-2 bg-white">
                <span className="font-bold text-slate-800 block mb-1">Mandate & Banking Setup:</span>
                <p className="text-slate-600 leading-snug">
                  {result.platformExecutionGuide.mandateRecommendations}
                </p>
              </div>
            </div>
          </div>

          {/* Regulatory Disclaimer & Signature Block */}
          <div className="border border-slate-300 rounded p-2.5 bg-slate-50 text-[9px] space-y-2">
            <div>
              <strong className="text-slate-800 uppercase block mb-0.5">
                Statutory Regulatory Notice (AMFI / SEBI Regulations):
              </strong>
              <p className="text-slate-500 leading-tight">
                Mutual Fund investments are subject to market risks, read all scheme related documents carefully. Past performance is not an indicator of future returns. This proposal is generated for advisory discussion purposes and does not constitute a guarantee of future returns. NAVs of schemes will fluctuate according to market dynamics.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
              <div>
                <span className="text-[8px] uppercase font-bold text-slate-400 block mb-3">Investor Acceptance & Date</span>
                <div className="border-b border-slate-400 w-48 mb-1" />
                <span className="text-slate-600">{profile.clientName}</span>
              </div>
              <div className="text-right">
                <span className="text-[8px] uppercase font-bold text-slate-400 block mb-3">Authorised Mutual Fund Distributor (ARN)</span>
                <div className="border-b border-slate-400 w-48 ml-auto mb-1" />
                <span className="text-slate-600 font-semibold">WealthWise Advisory • AMFI Registered MFD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page 2 Footer */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[9px] text-slate-400">
          <span>WealthWise Portfolio Proposal • End of Proposal</span>
          <span className="font-bold">Page 2 of 2</span>
        </div>
      </div>
    </div>
  );
};
