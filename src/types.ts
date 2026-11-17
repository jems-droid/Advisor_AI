export type SebiRiskometerLevel =
  | 'Low'
  | 'Low-Moderate'
  | 'Moderate'
  | 'Moderately High'
  | 'High'
  | 'Very High';

export interface AssetAllocationItem {
  category: string;
  subcategory: string; // e.g. "Flexi Cap Fund", "Large Cap Fund", "Balanced Advantage Fund (BAF)", "Liquid Fund"
  sebiCategory?: string; // e.g. "SEBI: Equity - Flexi Cap"
  percentage: number;
  rationale: string;
  suggestedTenure: string;
  riskProfile: 'Low' | 'Moderate' | 'High' | 'Very High';
  sebiRiskometer?: SebiRiskometerLevel; // SEBI standard 6-level Riskometer
  sampleFundHouses?: string[]; // 2-3 widely recognized Indian Fund Houses (e.g. HDFC, ICICI Prudential, SBI, Parag Parikh, Nippon India)
  sampleSchemes?: string[]; // Generic reference examples available on platforms like NJ Wealth / AssetPlus
}

export interface ClientGoal {
  title: string;
  category: 'Retirement' | "Child Education" | 'Home Purchase' | 'Emergency Buffer' | 'Wealth Creation' | 'Other';
  targetTimeline?: string;
  targetCorpus?: string;
}

export interface ClientProfile {
  clientName: string;
  age: string; // e.g. "28 Years"
  occupation: string; // e.g. "Senior Software Engineer"
  annualIncome: string; // e.g. "₹22 Lakhs p.a."
  familyDependents: string; // e.g. "Spouse & 1 Child (Age 10)"
  demographicsAndStatus: string;
  investmentHorizon: string; // Clearly defined horizon e.g. "7-8 Years (Medium-to-Long Term)"
  riskTolerance: string; // e.g. "Moderately Aggressive"
  riskScale: number; // 1 to 5 granular scale (1: Conservative, 5: Aggressive)
  riskScaleLabel: string; // e.g. "Level 4 / 5 (Moderately Aggressive)"
  sebiRiskometer: SebiRiskometerLevel; // SEBI Standard 6-level Riskometer Tag
  monthlySurplusOrLumpsum: string;
  primaryGoals: string[];
  structuredGoals?: ClientGoal[];
  liquidityNeeds: string; // Clearly defined liquidity needs & buffer
  taxNeeds: string;
}

export interface RecommendedScheme {
  id: string;
  name: string;
  fundHouse: string;
  category: string;
  sebiCategory: string;
  sebiRiskometer: SebiRiskometerLevel;
  platforms: Array<'NJ Wealth' | 'AssetPlus' | 'AMFI'>;
  amfiCode: string;
  return1Y: number;
  return3Y: number;
  return5Y: number;
  inceptionDate: string;
  aumCr?: number;
  expenseRatio?: number;
  isSelected: boolean;
  recommendedAllocationPercent?: number;
}

export interface WealthCreationMetrics {
  totalInvestment: number;
  projectedFutureValue: number;
  netWealthCreated: number;
  cagrRate: number;
  investmentHorizonYears: number;
  monthlySip: number;
  lumpsumAmount: number;
  wealthMultiplier: number;
}

export interface TalkingPoint {
  title: string;
  plainEnglishExplanation: string;
  advisorScript: string;
  jargonDemystified: string;
}

export interface AdvisorAnalysisResult {
  clientProfile: ClientProfile;
  advisoryConcepts: TalkingPoint[];
  assetAllocation: {
    equityTotal: number;
    debtHybridTotal: number;
    taxSavingTotal: number;
    categories: AssetAllocationItem[];
    strategicRationale: string;
  };
  wealthMetrics?: WealthCreationMetrics;
  recommendedSchemes?: RecommendedScheme[];
  platformExecutionGuide: {
    platform: 'NJ Wealth' | 'AssetPlus' | 'Direct / BSE StAR / MFU';
    executionSteps: string[];
    mandateRecommendations: string;
  };
  clientFollowUpDraft: {
    whatsappFormat: string;
    emailFormat: string;
  };
  markdownReport: string;
  timestamp: string;
}

export interface SampleNote {
  id: string;
  title: string;
  badge: string;
  rawText: string;
}
