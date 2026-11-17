import { WealthCreationMetrics } from '../types';

/**
 * Format currency into Indian Rupees with Lakhs / Crores suffix where appropriate
 */
export function formatInr(amount: number, compact: boolean = false): string {
  if (isNaN(amount) || amount === 0) return '₹0';

  if (compact) {
    if (amount >= 10000000) {
      const cr = amount / 10000000;
      return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      const lk = amount / 100000;
      return `₹${lk % 1 === 0 ? lk.toFixed(0) : lk.toFixed(2)} L`;
    }
    if (amount >= 1000) {
      const k = amount / 1000;
      return `₹${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k`;
    }
  }

  // Full Indian comma formatted
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Parses monthly surplus and lumpsum text into numbers
 */
export function parseSurplusAndLumpsum(text: string = ''): { monthlySip: number; lumpsum: number } {
  let monthlySip = 35000; // default sensible baseline
  let lumpsum = 0;

  const clean = text.toLowerCase();

  // 1. Detect Lumpsum (Lakhs or Cr)
  const lumpsumMatch = clean.match(/(?:lumpsum|bonus|stp|pf|fd|corpus|kitty).*?(\d+(?:\.\d+)?)\s*(?:lakhs?|l|cr|crores?)/i) ||
    clean.match(/(\d+(?:\.\d+)?)\s*(?:lakhs?|l|cr|crores?).*?(?:lumpsum|bonus|stp|pf|fd|corpus|kitty)/i);

  if (lumpsumMatch) {
    const val = parseFloat(lumpsumMatch[1]);
    if (clean.includes('cr') || clean.includes('crore')) {
      lumpsum = Math.round(val * 10000000);
    } else {
      lumpsum = Math.round(val * 100000);
    }
  } else if (clean.includes('12 lakh') || clean.includes('12l')) {
    lumpsum = 1200000;
  } else if (clean.includes('25 lakh') || clean.includes('25l')) {
    lumpsum = 2500000;
  } else if (clean.includes('45 lakh') || clean.includes('63 lakh')) {
    lumpsum = 4500000;
  }

  // 2. Detect Monthly SIP
  const sipMatch = clean.match(/(?:sip|monthly|mo|\/pm|\/month|regular).*?(?:₹|rs\.?)?\s*(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:k|thousand|lakhs?|l)?/i) ||
    clean.match(/(?:₹|rs\.?)?\s*(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:k|thousand|lakhs?|l)?\s*(?:\/mo|\/month|pm|per month|monthly|sip)/i);

  if (sipMatch) {
    const rawVal = sipMatch[1].replace(/,/g, '');
    let val = parseFloat(rawVal);
    if (clean.includes('k') || clean.includes('thousand')) {
      val = val * 1000;
    } else if (clean.includes('lakh') && val < 50) {
      val = val * 100000;
    }
    if (val >= 1000 && val <= 2000000) {
      monthlySip = Math.round(val);
    }
  } else if (clean.includes('35,000') || clean.includes('35000') || clean.includes('35k')) {
    monthlySip = 35000;
  } else if (clean.includes('50,000') || clean.includes('50000') || clean.includes('50k')) {
    monthlySip = 50000;
  } else if (clean.includes('40,000') || clean.includes('40000')) {
    monthlySip = 40000;
  } else if (clean.includes('45,000') || clean.includes('45000')) {
    monthlySip = 45000;
  }

  return { monthlySip, lumpsum };
}

/**
 * Parses tenure / horizon text into integer years
 */
export function parseHorizonYears(horizonText: string = ''): number {
  const match = horizonText.match(/(\d+)\s*(?:to|-)?\s*(\d+)?\s*(?:years?|yrs?)/i);
  if (match) {
    if (match[2]) {
      return parseInt(match[2], 10); // take higher end for wealth creation e.g. 7-8 -> 8
    }
    return parseInt(match[1], 10);
  }
  if (horizonText.toLowerCase().includes('retir') || horizonText.toLowerCase().includes('short')) return 3;
  if (horizonText.toLowerCase().includes('12') || horizonText.toLowerCase().includes('15')) return 12;
  return 7; // default 7 years
}

/**
 * Performs accurate mutual fund compounding calculations
 */
export function calculateWealthMetrics(
  monthlySip: number,
  lumpsum: number,
  horizonYears: number,
  cagrRate: number
): WealthCreationMetrics {
  const years = Math.max(1, horizonYears);
  const months = years * 12;
  const annualRate = cagrRate / 100;
  const monthlyRate = annualRate / 12;

  // 1. SIP compounding: A = P * [ ( (1+i)^n - 1 ) / i ] * (1+i)
  const sipInvestment = monthlySip * months;
  let sipFutureValue = 0;
  if (monthlySip > 0 && monthlyRate > 0) {
    sipFutureValue = monthlySip * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
  } else if (monthlySip > 0) {
    sipFutureValue = sipInvestment;
  }

  // 2. Lumpsum compounding: A = P * (1 + r)^t
  const lumpsumInvestment = lumpsum;
  let lumpsumFutureValue = 0;
  if (lumpsum > 0) {
    lumpsumFutureValue = lumpsum * Math.pow(1 + annualRate, years);
  }

  const totalInvestment = Math.round(sipInvestment + lumpsumInvestment);
  const projectedFutureValue = Math.round(sipFutureValue + lumpsumFutureValue);
  const netWealthCreated = Math.max(0, projectedFutureValue - totalInvestment);
  const wealthMultiplier = totalInvestment > 0 ? Number((projectedFutureValue / totalInvestment).toFixed(2)) : 1;

  return {
    totalInvestment,
    projectedFutureValue,
    netWealthCreated,
    cagrRate,
    investmentHorizonYears: years,
    monthlySip,
    lumpsumAmount: lumpsum,
    wealthMultiplier,
  };
}
