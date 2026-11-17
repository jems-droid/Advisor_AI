import { RecommendedScheme, SebiRiskometerLevel } from '../types';

export const MASTER_RECOMMENDED_SCHEMES: RecommendedScheme[] = [
  {
    id: 'ppfc-01',
    name: 'Parag Parikh Flexi Cap Fund - Regular (G)',
    fundHouse: 'PPFAS Mutual Fund',
    category: 'Equity: Flexi Cap',
    sebiCategory: 'SEBI: Equity - Flexi Cap',
    sebiRiskometer: 'Very High',
    platforms: ['NJ Wealth', 'AssetPlus', 'AMFI'],
    amfiCode: '122639',
    return1Y: 26.8,
    return3Y: 21.2,
    return5Y: 22.4,
    inceptionDate: '28 May 2013',
    aumCr: 68450,
    expenseRatio: 1.32,
    isSelected: true,
    recommendedAllocationPercent: 25,
  },
  {
    id: 'hdfc-baf-02',
    name: 'HDFC Balanced Advantage Fund - Regular (G)',
    fundHouse: 'HDFC Mutual Fund',
    category: 'Hybrid: Dynamic Asset Allocation',
    sebiCategory: 'SEBI: Hybrid - Dynamic Asset Allocation',
    sebiRiskometer: 'Moderately High',
    platforms: ['NJ Wealth', 'AssetPlus', 'AMFI'],
    amfiCode: '101614',
    return1Y: 23.4,
    return3Y: 18.7,
    return5Y: 17.6,
    inceptionDate: '01 Feb 1994',
    aumCr: 82100,
    expenseRatio: 1.41,
    isSelected: true,
    recommendedAllocationPercent: 20,
  },
  {
    id: 'icici-blue-03',
    name: 'ICICI Prudential Bluechip Fund - Regular (G)',
    fundHouse: 'ICICI Prudential Mutual Fund',
    category: 'Equity: Large Cap',
    sebiCategory: 'SEBI: Equity - Large Cap',
    sebiRiskometer: 'Very High',
    platforms: ['NJ Wealth', 'AssetPlus', 'AMFI'],
    amfiCode: '108466',
    return1Y: 24.2,
    return3Y: 18.1,
    return5Y: 16.5,
    inceptionDate: '23 May 2008',
    aumCr: 55400,
    expenseRatio: 1.46,
    isSelected: true,
    recommendedAllocationPercent: 20,
  },
  {
    id: 'mirae-lm-04',
    name: 'Mirae Asset Large & Midcap Fund - Regular (G)',
    fundHouse: 'Mirae Asset Mutual Fund',
    category: 'Equity: Large & Mid Cap',
    sebiCategory: 'SEBI: Equity - Large & Mid Cap',
    sebiRiskometer: 'Very High',
    platforms: ['NJ Wealth', 'AssetPlus', 'AMFI'],
    amfiCode: '112984',
    return1Y: 28.6,
    return3Y: 20.4,
    return5Y: 19.8,
    inceptionDate: '04 Apr 2008',
    aumCr: 37800,
    expenseRatio: 1.52,
    isSelected: true,
    recommendedAllocationPercent: 15,
  },
  {
    id: 'hdfc-mid-05',
    name: 'HDFC Mid-Cap Opportunities Fund - Regular (G)',
    fundHouse: 'HDFC Mutual Fund',
    category: 'Equity: Mid Cap',
    sebiCategory: 'SEBI: Equity - Mid Cap',
    sebiRiskometer: 'Very High',
    platforms: ['NJ Wealth', 'AssetPlus', 'AMFI'],
    amfiCode: '105758',
    return1Y: 34.5,
    return3Y: 26.4,
    return5Y: 24.2,
    inceptionDate: '25 Jun 2007',
    aumCr: 69800,
    expenseRatio: 1.49,
    isSelected: false,
    recommendedAllocationPercent: 10,
  },
  {
    id: 'kotak-arb-06',
    name: 'Kotak Equity Arbitrage Fund - Regular (G)',
    fundHouse: 'Kotak Mahindra Mutual Fund',
    category: 'Hybrid: Arbitrage',
    sebiCategory: 'SEBI: Hybrid - Arbitrage',
    sebiRiskometer: 'Low-Moderate',
    platforms: ['NJ Wealth', 'AssetPlus', 'AMFI'],
    amfiCode: '103525',
    return1Y: 7.9,
    return3Y: 6.5,
    return5Y: 6.0,
    inceptionDate: '29 Sep 2005',
    aumCr: 46300,
    expenseRatio: 0.96,
    isSelected: true,
    recommendedAllocationPercent: 15,
  },
  {
    id: 'sbi-liq-07',
    name: 'SBI Liquid Fund - Regular (G)',
    fundHouse: 'SBI Mutual Fund',
    category: 'Debt: Liquid',
    sebiCategory: 'SEBI: Debt - Liquid',
    sebiRiskometer: 'Low',
    platforms: ['NJ Wealth', 'AssetPlus', 'AMFI'],
    amfiCode: '101569',
    return1Y: 7.3,
    return3Y: 6.2,
    return5Y: 5.5,
    inceptionDate: '24 Nov 2003',
    aumCr: 62400,
    expenseRatio: 0.28,
    isSelected: true,
    recommendedAllocationPercent: 10,
  },
  {
    id: 'nippon-small-08',
    name: 'Nippon India Small Cap Fund - Regular (G)',
    fundHouse: 'Nippon India Mutual Fund',
    category: 'Equity: Small Cap',
    sebiCategory: 'SEBI: Equity - Small Cap',
    sebiRiskometer: 'Very High',
    platforms: ['NJ Wealth', 'AssetPlus', 'AMFI'],
    amfiCode: '112938',
    return1Y: 36.8,
    return3Y: 28.2,
    return5Y: 28.9,
    inceptionDate: '16 Sep 2010',
    aumCr: 57200,
    expenseRatio: 1.54,
    isSelected: false,
    recommendedAllocationPercent: 10,
  },
  {
    id: 'mirae-elss-09',
    name: 'Mirae Asset ELSS Tax Saver Fund - Regular (G)',
    fundHouse: 'Mirae Asset Mutual Fund',
    category: 'Tax Saving: ELSS',
    sebiCategory: 'SEBI: Equity - ELSS',
    sebiRiskometer: 'Very High',
    platforms: ['NJ Wealth', 'AssetPlus', 'AMFI'],
    amfiCode: '135781',
    return1Y: 28.1,
    return3Y: 19.3,
    return5Y: 19.5,
    inceptionDate: '28 Dec 2015',
    aumCr: 24600,
    expenseRatio: 1.56,
    isSelected: false,
    recommendedAllocationPercent: 10,
  },
  {
    id: 'icici-hyb-10',
    name: 'ICICI Prudential Equity & Debt Fund - Regular (G)',
    fundHouse: 'ICICI Prudential Mutual Fund',
    category: 'Hybrid: Aggressive Hybrid',
    sebiCategory: 'SEBI: Hybrid - Aggressive Hybrid',
    sebiRiskometer: 'Very High',
    platforms: ['NJ Wealth', 'AssetPlus', 'AMFI'],
    amfiCode: '100033',
    return1Y: 27.2,
    return3Y: 21.6,
    return5Y: 19.9,
    inceptionDate: '03 Nov 1999',
    aumCr: 38900,
    expenseRatio: 1.62,
    isSelected: false,
    recommendedAllocationPercent: 15,
  },
];

/**
 * Filter or tailor schemes matching client's risk and asset allocation
 */
export function getTailoredRecommendedSchemes(
  clientRiskometer: SebiRiskometerLevel,
  platform: 'NJ Wealth' | 'AssetPlus' | 'Direct / BSE StAR / MFU' = 'NJ Wealth'
): RecommendedScheme[] {
  // Deep clone so selections don't mutate master
  const schemes = MASTER_RECOMMENDED_SCHEMES.map((s) => ({
    ...s,
    isSelected: false,
  }));

  // Smart pre-selection based on risk profile:
  if (clientRiskometer === 'Low' || clientRiskometer === 'Low-Moderate') {
    // Select Liquid + Arbitrage + Balanced Advantage
    schemes.forEach((s) => {
      if (s.id === 'sbi-liq-07' || s.id === 'kotak-arb-06' || s.id === 'hdfc-baf-02') {
        s.isSelected = true;
      }
    });
  } else if (clientRiskometer === 'Moderate') {
    // Balanced Advantage + Large Cap + Flexi Cap + Liquid
    schemes.forEach((s) => {
      if (s.id === 'hdfc-baf-02' || s.id === 'icici-blue-03' || s.id === 'ppfc-01' || s.id === 'sbi-liq-07') {
        s.isSelected = true;
      }
    });
  } else {
    // Moderately High or High or Very High
    // Flexi Cap + Large & Mid + Large Cap + Balanced Advantage + Liquid / Arbitrage
    schemes.forEach((s) => {
      if (
        s.id === 'ppfc-01' ||
        s.id === 'mirae-lm-04' ||
        s.id === 'hdfc-baf-02' ||
        s.id === 'icici-blue-03' ||
        s.id === 'kotak-arb-06'
      ) {
        s.isSelected = true;
      }
    });
  }

  return schemes;
}
