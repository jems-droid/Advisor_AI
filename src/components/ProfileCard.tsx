import React from 'react';
import {
  User,
  Clock,
  Target,
  Droplets,
  IndianRupee,
  Shield,
  Briefcase,
  Users,
  Calendar,
  Compass,
  CheckCircle,
  GraduationCap,
  Home,
  PiggyBank,
  Sparkles,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { ClientProfile, ClientGoal, SebiRiskometerLevel } from '../types';
import { SebiRiskometerGauge } from './SebiRiskometerGauge';
import { mapToSebiRiskometer, SEBI_RISKOMETER_MAP } from '../utils/sebiRiskometer';

interface ProfileCardProps {
  profile: ClientProfile;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  // Granular Risk scale (1 to 5)
  const scale = profile.riskScale || (
    profile.riskTolerance?.toLowerCase().includes('conservative') && !profile.riskTolerance?.toLowerCase().includes('moderately')
      ? 1
      : profile.riskTolerance?.toLowerCase().includes('moderately conservative')
      ? 2
      : profile.riskTolerance?.toLowerCase().includes('moderately aggressive')
      ? 4
      : profile.riskTolerance?.toLowerCase().includes('aggressive')
      ? 5
      : 3
  );

  // SEBI Standard 6-Level Riskometer Tag
  const sebiRiskLevel: SebiRiskometerLevel =
    profile.sebiRiskometer || mapToSebiRiskometer(scale, profile.riskTolerance);
  const sebiMeta = SEBI_RISKOMETER_MAP[sebiRiskLevel] || SEBI_RISKOMETER_MAP.Moderate;

  const getRiskLabel = (s: number) => {
    switch (s) {
      case 1:
        return '1 / 5 - Low / Capital Preservation';
      case 2:
        return '2 / 5 - Moderately Conservative';
      case 3:
        return '3 / 5 - Moderate / Balanced Growth';
      case 4:
        return '4 / 5 - Moderately Aggressive';
      case 5:
        return '5 / 5 - High / Aggressive Alpha';
      default:
        return `${s} / 5 - Moderate`;
    }
  };

  const getRiskColor = (s: number) => {
    if (s <= 2) {
      return {
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        bar: 'bg-emerald-500',
        activePill: 'bg-emerald-600 text-white',
        text: 'text-emerald-700',
      };
    }
    if (s === 3) {
      return {
        badge: 'bg-amber-50 text-amber-800 border-amber-200',
        bar: 'bg-amber-500',
        activePill: 'bg-amber-600 text-white',
        text: 'text-amber-800',
      };
    }
    return {
      badge: 'bg-rose-50 text-rose-700 border-rose-200',
      bar: 'bg-rose-500',
      activePill: 'bg-rose-600 text-white',
      text: 'text-rose-700',
    };
  };

  const riskColor = getRiskColor(scale);

  // Helper for Goal Icons
  const getGoalIcon = (category?: string) => {
    switch (category) {
      case 'Child Education':
        return <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />;
      case 'Home Purchase':
        return <Home className="w-3.5 h-3.5 text-indigo-600" />;
      case 'Retirement':
        return <PiggyBank className="w-3.5 h-3.5 text-indigo-600" />;
      case 'Emergency Buffer':
        return <Droplets className="w-3.5 h-3.5 text-indigo-600" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-indigo-600" />;
    }
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-indigo-600" />
            Expanded Client Profiling & Risk Assessment
          </h2>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              {profile.clientName || 'Valued Investor'}
            </span>
            {profile.age && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200">
                <Calendar className="w-3 h-3 text-slate-500" />
                {profile.age}
              </span>
            )}
          </div>
        </div>

        {/* Granular Risk & SEBI Riskometer Badges */}
        <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-2xs ${sebiMeta.colorClass.bg} ${sebiMeta.colorClass.text} ${sebiMeta.colorClass.border}`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            SEBI: {sebiRiskLevel}
          </span>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${riskColor.badge}`}>
            <Shield className="w-3.5 h-3.5" />
            {profile.riskScaleLabel || getRiskLabel(scale)}
          </span>
        </div>
      </div>

      {/* Primary Demographic & Economic Parameters (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {/* Occupation */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex flex-col justify-between">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
            <Briefcase className="w-3 h-3 text-slate-500" /> Occupation
          </p>
          <p className="text-xs font-bold text-slate-800 mt-1.5 line-clamp-2" title={profile.occupation || profile.demographicsAndStatus}>
            {profile.occupation || 'Working Professional'}
          </p>
          <span className="text-[10px] text-slate-400 mt-1">Professional Sector</span>
        </div>

        {/* Annual Income */}
        <div className="bg-indigo-50/60 p-3.5 rounded-xl border border-indigo-100 flex flex-col justify-between">
          <p className="text-[10px] text-indigo-600 uppercase font-bold tracking-wider flex items-center gap-1">
            <IndianRupee className="w-3 h-3 text-indigo-600" /> Annual Income / Cashflow
          </p>
          <p className="text-xs font-bold text-indigo-950 mt-1.5 font-mono truncate" title={profile.annualIncome}>
            {profile.annualIncome || 'Verified via Advisor Notes'}
          </p>
          <span className="text-[10px] text-indigo-500 font-medium mt-1">
            Surplus: {profile.monthlySurplusOrLumpsum}
          </span>
        </div>

        {/* Family Dependents */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex flex-col justify-between">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
            <Users className="w-3 h-3 text-slate-500" /> Family Dependents
          </p>
          <p className="text-xs font-bold text-slate-800 mt-1.5 line-clamp-2" title={profile.familyDependents}>
            {profile.familyDependents || 'Family Investor'}
          </p>
          <span className="text-[10px] text-slate-400 mt-1">Household Composition</span>
        </div>

        {/* Investment Horizon */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex flex-col justify-between">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-500" /> Investment Horizon
          </p>
          <p className="text-xs font-bold text-slate-800 mt-1.5 line-clamp-2" title={profile.investmentHorizon}>
            {profile.investmentHorizon}
          </p>
          <span className="text-[10px] text-slate-400 mt-1">Milestone Timeline</span>
        </div>
      </div>

      {/* Granular 1-5 Risk Assessment Scale Meter */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Granular Risk Assessment Scale (1 - 5)
            </span>
          </div>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${riskColor.text} bg-white border border-slate-200 shadow-2xs`}>
            {profile.riskScaleLabel || `Assessed Rating: ${getRiskLabel(scale)}`}
          </span>
        </div>

        {/* 5-Segment Visual Rating Bar */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {[1, 2, 3, 4, 5].map((level) => {
            const isSelected = level === scale;
            const isBelowOrEqual = level <= scale;
            const levelLabel =
              level === 1
                ? 'Conservative'
                : level === 2
                ? 'Mod. Conservative'
                : level === 3
                ? 'Moderate'
                : level === 4
                ? 'Mod. Aggressive'
                : 'Aggressive';

            return (
              <div key={level} className="flex flex-col items-center">
                <div
                  className={`w-full h-2.5 rounded-sm transition-all duration-300 ${
                    isSelected
                      ? level <= 2
                        ? 'bg-emerald-500 shadow-sm ring-2 ring-emerald-300'
                        : level === 3
                        ? 'bg-amber-500 shadow-sm ring-2 ring-amber-300'
                        : 'bg-rose-500 shadow-sm ring-2 ring-rose-300'
                      : isBelowOrEqual
                      ? 'bg-slate-300'
                      : 'bg-slate-200/60'
                  }`}
                />
                <span
                  className={`text-[10px] font-bold mt-1.5 text-center truncate w-full ${
                    isSelected ? 'text-slate-900 font-extrabold' : 'text-slate-400'
                  }`}
                >
                  {level}. {levelLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official SEBI 6-Tier Riskometer Gauge */}
      <div className="mb-5">
        <SebiRiskometerGauge
          currentLevel={sebiRiskLevel}
          schemeOrPortfolioName={`${profile.clientName}'s Assessed Portfolio Suitability`}
        />
      </div>

      {/* Specific Financial Goals & Milestones */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-indigo-600" /> Specific Financial Goals & Target Milestones
          </p>
          <span className="text-[10px] font-semibold text-slate-400">
            {profile.structuredGoals?.length || profile.primaryGoals?.length || 0} Target Milestones Mapped
          </span>
        </div>

        {profile.structuredGoals && profile.structuredGoals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {profile.structuredGoals.map((goal, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-col justify-between hover:border-indigo-200 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-indigo-600 shrink-0">
                    {getGoalIcon(goal.category)}
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-xs border border-indigo-100">
                      {goal.category}
                    </span>
                    <p className="text-xs font-bold text-slate-900 mt-1 leading-snug">
                      {goal.title}
                    </p>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> {goal.targetTimeline}
                  </span>
                  {goal.targetCorpus && (
                    <span className="font-semibold text-slate-800 font-mono">
                      {goal.targetCorpus}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {profile.primaryGoals &&
              profile.primaryGoals.map((goal, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg font-medium border border-slate-200 flex items-center gap-1.5"
                >
                  <CheckCircle className="w-3 h-3 text-indigo-600" />
                  {goal}
                </span>
              ))}
          </div>
        )}
      </div>

      {/* Clearly Defined Liquidity & Tax Needs Callout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
        {/* Defined Liquidity Needs */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
          <Droplets className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 block mb-0.5">
              Clearly Defined Liquidity Needs:
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              {profile.liquidityNeeds}
            </p>
          </div>
        </div>

        {/* Tax Optimization Strategy */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
          <Compass className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 block mb-0.5">
              Tax Optimization Strategy (Sec 80C & LTCG):
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              {profile.taxNeeds}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


