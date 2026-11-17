import { SebiRiskometerLevel } from '../types';

export interface SebiRiskometerMeta {
  level: SebiRiskometerLevel;
  numericRank: number; // 1 to 6
  label: string;
  description: string;
  colorClass: {
    bg: string;
    text: string;
    border: string;
    activeBar: string;
    dot: string;
  };
  suitableCategoryExamples: string[];
}

export const SEBI_RISKOMETER_MAP: Record<SebiRiskometerLevel, SebiRiskometerMeta> = {
  Low: {
    level: 'Low',
    numericRank: 1,
    label: 'Low Risk',
    description: 'Investors understand that their principal will be at low risk. Suited for capital preservation & ultra-short parking.',
    colorClass: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-300',
      activeBar: 'bg-emerald-500',
      dot: 'bg-emerald-600',
    },
    suitableCategoryExamples: ['Liquid Funds', 'Overnight Funds', 'Ultra Short Duration Funds'],
  },
  'Low-Moderate': {
    level: 'Low-Moderate',
    numericRank: 2,
    label: 'Low to Moderate Risk',
    description: 'Investors understand that their principal will be at low to moderate risk. Aimed at stability with minimal volatility.',
    colorClass: {
      bg: 'bg-teal-50',
      text: 'text-teal-800',
      border: 'border-teal-300',
      activeBar: 'bg-teal-500',
      dot: 'bg-teal-600',
    },
    suitableCategoryExamples: ['Money Market Funds', 'Arbitrage Funds', 'Short Duration Debt Funds'],
  },
  Moderate: {
    level: 'Moderate',
    numericRank: 3,
    label: 'Moderate Risk',
    description: 'Investors understand that their principal will be at moderate risk. Suited for conservative growth with regular yield.',
    colorClass: {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-300',
      activeBar: 'bg-amber-500',
      dot: 'bg-amber-600',
    },
    suitableCategoryExamples: ['Corporate Bond Funds', 'Conservative Hybrid Funds', 'Equity Savings Funds'],
  },
  'Moderately High': {
    level: 'Moderately High',
    numericRank: 4,
    label: 'Moderately High Risk',
    description: 'Investors understand that their principal will be at moderately high risk. Suitable for balanced equity and asset-allocation strategies.',
    colorClass: {
      bg: 'bg-orange-50',
      text: 'text-orange-800',
      border: 'border-orange-300',
      activeBar: 'bg-orange-500',
      dot: 'bg-orange-600',
    },
    suitableCategoryExamples: ['Balanced Advantage Funds (BAF)', 'Large Cap Equity', 'Multi-Asset Allocation'],
  },
  High: {
    level: 'High',
    numericRank: 5,
    label: 'High Risk',
    description: 'Investors understand that their principal will be at high risk. Suited for aggressive long-term wealth building with standard market swings.',
    colorClass: {
      bg: 'bg-rose-50',
      text: 'text-rose-800',
      border: 'border-rose-300',
      activeBar: 'bg-rose-500',
      dot: 'bg-rose-600',
    },
    suitableCategoryExamples: ['Large & Mid Cap Funds', 'Flexi Cap Funds', 'Aggressive Hybrid Funds'],
  },
  'Very High': {
    level: 'Very High',
    numericRank: 6,
    label: 'Very High Risk',
    description: 'Investors understand that their principal will be at very high risk. Suited for aggressive capital appreciation over 7+ years, able to withstand significant drawdowns.',
    colorClass: {
      bg: 'bg-red-50',
      text: 'text-red-900',
      border: 'border-red-400',
      activeBar: 'bg-red-600',
      dot: 'bg-red-700',
    },
    suitableCategoryExamples: ['Small Cap Funds', 'Mid Cap Funds', 'Sectoral/Thematic Funds', 'ELSS Tax Savers'],
  },
};

export const ALL_SEBI_RISKOMETER_LEVELS: SebiRiskometerLevel[] = [
  'Low',
  'Low-Moderate',
  'Moderate',
  'Moderately High',
  'High',
  'Very High',
];

/**
 * Maps risk scale (1-5), risk tolerance string, or category into official 6-tier SEBI Riskometer tag
 */
export function mapToSebiRiskometer(
  riskScale?: number,
  riskTolerance?: string,
  categoryName?: string
): SebiRiskometerLevel {
  // If specific category is given, map per SEBI product labeling
  if (categoryName) {
    const cat = categoryName.toLowerCase();
    if (cat.includes('liquid') || cat.includes('overnight')) return 'Low';
    if (cat.includes('arbitrage') || cat.includes('money market') || cat.includes('ultra short')) return 'Low-Moderate';
    if (cat.includes('corporate bond') || cat.includes('conservative hybrid') || cat.includes('equity savings')) return 'Moderate';
    if (cat.includes('balanced advantage') || cat.includes('baf') || cat.includes('dynamic asset') || cat.includes('large cap')) return 'Moderately High';
    if (cat.includes('large & mid') || cat.includes('aggressive hybrid')) return 'High';
    if (cat.includes('small cap') || cat.includes('mid cap') || cat.includes('flexi cap') || cat.includes('elss') || cat.includes('sector') || cat.includes('thematic')) return 'Very High';
  }

  // If risk scale is provided (1 to 5)
  if (riskScale !== undefined && riskScale !== null) {
    switch (riskScale) {
      case 1:
        return 'Low';
      case 2:
        return 'Low-Moderate';
      case 3:
        return 'Moderate';
      case 4:
        return 'Moderately High';
      case 5:
        return 'Very High';
    }
  }

  // Match from tolerance string
  const r = (riskTolerance || '').toLowerCase();
  if (r.includes('very high')) return 'Very High';
  if (r.includes('aggressive') && !r.includes('moderate')) return 'Very High';
  if (r.includes('moderately aggressive')) return 'Moderately High';
  if (r.includes('moderately conservative')) return 'Low-Moderate';
  if (r.includes('conservative')) return 'Low';
  if (r.includes('low-moderate') || r.includes('low to moderate')) return 'Low-Moderate';
  if (r.includes('high')) return 'High';

  return 'Moderate';
}
