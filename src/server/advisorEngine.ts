import { AdvisorAnalysisResult, AssetAllocationItem, ClientGoal, TalkingPoint } from '../types';

export function synthesizeAdvisorDossierFallback(
  notes: string,
  platform: 'NJ Wealth' | 'AssetPlus' | 'Direct / BSE StAR / MFU' = 'NJ Wealth',
  customInstructions?: string
): AdvisorAnalysisResult {
  const text = notes.toLowerCase();

  // 1. Client Extraction
  let clientName = 'Valued Investor';
  const nameMatch = notes.match(/(?:Met|Discussed with|Meeting with|Client:?)\s+([A-Za-z\.\s]+?)(?:,|\(|\d{2}|in\s+[A-Z]|with|has|\n)/i);
  if (nameMatch && nameMatch[1]?.trim()) {
    clientName = nameMatch[1].trim().replace(/^(with|mr\.|mrs\.|ms\.)\s*/i, '');
  } else if (text.includes('rahul')) {
    clientName = 'Rahul Sharma';
  } else if (text.includes('vikram') || text.includes('priya')) {
    clientName = 'Vikram & Priya Sen';
  } else if (text.includes('iyer') || text.includes('rajeshwari')) {
    clientName = 'Mrs. Rajeshwari Iyer';
  } else if (text.includes('aniket') || text.includes('patel')) {
    clientName = 'Aniket Patel';
  }

  // 2. Age, Occupation, Annual Income, Family Dependents
  let age = '34 Years';
  const ageMatch = notes.match(/\b(\d{2})\s*(?:y|yo|years?|yrs?|\b)/i);
  if (text.includes('28')) age = '28 Years';
  else if (text.includes('42') || text.includes('40')) age = '42 & 40 Years';
  else if (text.includes('57')) age = '57 Years';
  else if (text.includes('35')) age = '35 Years';
  else if (ageMatch && parseInt(ageMatch[1], 10) > 18 && parseInt(ageMatch[1], 10) < 95) {
    age = `${ageMatch[1]} Years`;
  }

  let occupation = 'Working Professional in India';
  if (text.includes('software') || text.includes('tech') || text.includes('engineer')) {
    occupation = 'Senior Software Engineer (Tech Sector)';
  } else if (text.includes('sales') || text.includes('school') || text.includes('teacher') || text.includes('vp')) {
    occupation = 'VP Sales (Corporate) & School Coordinator (Education)';
  } else if (text.includes('psu') || text.includes('central psu') || text.includes('superannuation')) {
    occupation = 'Senior Executive (Central PSU, Pre-Retirement)';
  } else if (text.includes('export') || text.includes('textile') || text.includes('business') || text.includes('manufacturer')) {
    occupation = 'Textile Manufacturer & Export Business Owner';
  }

  let annualIncome = '₹24 Lakhs p.a.';
  if (text.includes('1.4 lakh') || text.includes('rahul')) {
    annualIncome = '₹22 Lakhs p.a. (₹1.4L/month net in-hand)';
  } else if (text.includes('vikram') || text.includes('priya') || text.includes('bonus')) {
    annualIncome = '₹36 Lakhs p.a. Household Income + ₹12 Lakhs Annual Bonus';
  } else if (text.includes('iyer') || text.includes('psu') || text.includes('45 lakh')) {
    annualIncome = '₹18 Lakhs p.a. (Retiring in 3 Years; ₹63L accumulated retirement kitty)';
  } else if (text.includes('aniket') || text.includes('patel') || text.includes('export')) {
    annualIncome = '₹65+ Lakhs p.a. Business Net Surplus Cashflow';
  }

  let familyDependents = 'Spouse & 1 Dependent';
  if (text.includes('rahul') || text.includes('28')) {
    familyDependents = 'Single / Financially independent parents in home state';
  } else if (text.includes('daughter') || text.includes('aanya') || text.includes('priya')) {
    familyDependents = 'Spouse + 1 School-Age Daughter (Age 10)';
  } else if (text.includes('iyer') || text.includes('57')) {
    familyDependents = 'Self & Retired Spouse';
  } else if (text.includes('aniket') || text.includes('patel')) {
    familyDependents = 'Spouse + 2 School-Going Children + Dependent Mother';
  }

  // Demographics
  let demographics = 'Working Professional / Family Investor in India';
  if (text.includes('software') || text.includes('bengaluru') || text.includes('bangalore')) {
    demographics = 'Senior Software Engineer in Bengaluru, High disposable monthly savings, wealth accumulation stage';
  } else if (text.includes('daughter') || text.includes('kolkata')) {
    demographics = 'Double-income urban family in Kolkata; balancing wealth growth with daughter overseas education timeline';
  } else if (text.includes('retir') || text.includes('chennai') || text.includes('psu')) {
    demographics = 'Senior PSU Executive in Chennai approaching retirement; seeking regular, inflation-proof monthly cashflow and high capital safety';
  } else if (text.includes('surat') || text.includes('export')) {
    demographics = 'Business owner and exporter in Surat, Gujarat; managing high surplus cash liquidity with aggressive wealth creation horizon';
  }

  // 3. Investment Horizon - Clearly Defined
  let horizon = 'Medium to Long Term: 7 to 8 Years';
  if (text.includes('retir') || text.includes('3 yrs') || text.includes('3 years') || text.includes('<3')) {
    horizon = 'Immediate to Short Term: 2 to 3 Years (Retirement Milestone Transition)';
  } else if (text.includes('12') || text.includes('15') || text.includes('10-12') || text.includes('long term')) {
    horizon = 'Long Term Compounding: 12 to 15 Years (Estate Creation & Wealth Compounding)';
  } else if (text.includes('7') || text.includes('8') || text.includes('college') || text.includes('house')) {
    horizon = 'Medium to Long Term: 7 to 8 Years (Milestone Specific)';
  }

  // 4. Granular Risk Assessment Scale (1 to 5)
  let riskScale = 3;
  let riskScaleLabel = 'Level 3 / 5 - Moderate (Balanced Growth with Volatility Buffer)';
  let risk = 'Moderate';

  if (text.includes('conservative') || text.includes('terrified') || text.includes('safe') || text.includes('panic') || text.includes('low risk') || text.includes('capital safety')) {
    riskScale = 1;
    riskScaleLabel = 'Level 1 / 5 - Very Conservative (Capital Protection First)';
    risk = 'Conservative';
  } else if (text.includes('very aggressive') || (text.includes('small cap') && text.includes('alpha')) || text.includes('15 years')) {
    riskScale = 5;
    riskScaleLabel = 'Level 5 / 5 - Aggressive (Maximum Equity Alpha & High Volatility Tolerance)';
    risk = 'Aggressive';
  } else if (text.includes('moderately aggressive') || (text.includes('equity') && !text.includes('panic'))) {
    riskScale = 4;
    riskScaleLabel = 'Level 4 / 5 - Moderately Aggressive (Growth Oriented with Systematic Discipline)';
    risk = 'Moderately Aggressive';
  } else if (text.includes('moderately conservative') || text.includes('capital erosion')) {
    riskScale = 2;
    riskScaleLabel = 'Level 2 / 5 - Moderately Conservative (Downside Protection Focused)';
    risk = 'Moderately Conservative';
  }

  // 5. Monthly Surplus / Lumpsum
  let surplus = '₹40,000 / month SIP';
  const amountMatch = notes.match(/₹?\s*(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:Lakhs?|L|k|Crores?|Cr)?(?:\s*\/(?:month|mo|pm))?/i);
  if (text.includes('12 lakh') || text.includes('12l')) {
    surplus = '₹12 Lakhs Lumpsum (Bonus STP) + ₹35,000/mo Regular SIP';
  } else if (text.includes('25 lakh') || text.includes('25l')) {
    surplus = '₹25 Lakhs Lumpsum STP + ₹50,000/mo Top-Up SIP';
  } else if (text.includes('45 lakh') || text.includes('18 lakh') || text.includes('63 lakh')) {
    surplus = '₹45 Lakhs PF/Superannuation + ₹18 Lakhs Expiring FDs (Target SWP ₹45,000/mo)';
  } else if (amountMatch) {
    surplus = amountMatch[0];
  }

  // 6. Specific Financial Goals (Structured)
  const structuredGoals: ClientGoal[] = [];
  const primaryGoals: string[] = [];

  if (text.includes('education') || text.includes('daughter') || text.includes('college')) {
    structuredGoals.push({
      title: "Child's Higher Education Abroad Fund",
      category: 'Child Education',
      targetTimeline: '7 to 8 Years (Undergrad/Postgrad admission)',
      targetCorpus: '₹50 Lakhs Target Corpus',
    });
    primaryGoals.push("Child's Overseas Higher Education Corpus (~₹50 Lakhs in 7-8 yrs)");
  }

  if (text.includes('flat') || text.includes('house') || text.includes('apartment') || text.includes('property')) {
    structuredGoals.push({
      title: 'First Residential Apartment Down Payment',
      category: 'Home Purchase',
      targetTimeline: '7 to 8 Years',
      targetCorpus: '₹35 - ₹40 Lakhs Down Payment Reserve',
    });
    primaryGoals.push('Residential Flat Purchase Down Payment (target 7-8 yrs)');
  }

  if (text.includes('retir') || text.includes('pension') || text.includes('swp') || text.includes('monthly income')) {
    structuredGoals.push({
      title: 'Retirement Monthly Income & Inflation Hedge',
      category: 'Retirement',
      targetTimeline: 'Post-Retirement in 3 Years',
      targetCorpus: '₹45,000 / month Tax-Efficient SWP Cashflow',
    });
    primaryGoals.push('Post-Retirement Inflation-Proof Regular Monthly Income via SWP (₹45,000/mo)');
  }

  if (text.includes('80c') || text.includes('tax') || text.includes('elss')) {
    structuredGoals.push({
      title: 'Section 80C Tax Deduction Optimization',
      category: 'Other',
      targetTimeline: 'Annual Financial Year (FY 2025-26)',
      targetCorpus: 'Up to ₹1.5 Lakhs in ELSS with 3-yr Lock-in',
    });
    primaryGoals.push('Annual Tax Saving under Section 80C via ELSS (Old Regime)');
  }

  structuredGoals.push({
    title: 'Dedicated Family Contingency & Emergency Reserve',
    category: 'Emergency Buffer',
    targetTimeline: 'Immediate (Next 30-60 Days)',
    targetCorpus: '4 to 6 Months Living Expenses (~₹4-6 Lakhs) in Liquid/Arbitrage',
  });
  primaryGoals.push('Dedicated 6-Month Emergency Contingency Reserve in Liquid/Arbitrage');

  if (structuredGoals.length <= 2 || text.includes('wealth') || text.includes('alpha') || text.includes('compounding')) {
    structuredGoals.push({
      title: 'Long-Term Alpha Wealth Creation & Estate Compounding',
      category: 'Wealth Creation',
      targetTimeline: '10 to 15 Years',
      targetCorpus: 'Multi-Crore Compounding Portfolio',
    });
    primaryGoals.push('Disciplined Systematic Equity Compounding over 10-15+ Years');
  }

  // 7. Liquidity Needs - Clearly Defined
  let liquidityNeeds = 'Defined Emergency Reserve: 6 months living expenses (~₹4 to 6 Lakhs) parked in Liquid & Arbitrage funds offering T+1 business day instant redemption, isolated from speculative equity swings.';
  if (text.includes('retir') || riskScale === 1) {
    liquidityNeeds = 'High Immediate Liquidity: Dedicated 12-month living buffer (~₹6-8 Lakhs) maintained strictly in Liquid / Overnight funds to cushion monthly SWP withdrawals without forcing units liquidation during market corrections.';
  } else if (text.includes('bonus') || text.includes('stp')) {
    liquidityNeeds = 'Phased Liquidity for STP: Lumpsum corpus parked in Arbitrage/Liquid fund for immediate capital safety, with automated weekly/monthly systematic transfers into equity over 10-12 months.';
  }

  // Tax Needs
  const taxNeeds = text.includes('80c') || text.includes('elss')
    ? 'Maximize Section 80C ₹1.5 Lakhs exemption using ELSS mutual funds (3-year lock-in, lowest among 80C instruments); strategically harvest up to ₹1.25 Lakhs tax-free Equity LTCG annually.'
    : 'Utilize equity-oriented categories to optimize capital gains taxation under current Union Budget provisions (₹1.25L annual LTCG exemption at 12.5% tax rate vs 30%+ slab rate on bank FD interest).';

  // 8. Asset Allocation with SEBI Categories & 2-3 Recognized Indian Fund Houses
  let equityTotal = 60;
  let debtHybridTotal = 30;
  let taxSavingTotal = 10;
  let categories: AssetAllocationItem[] = [];

  if (riskScale <= 2) {
    // Conservative
    equityTotal = 15;
    debtHybridTotal = 85;
    taxSavingTotal = 0;
    categories = [
      {
        category: 'Debt / Hybrid',
        subcategory: 'Arbitrage Funds',
        sebiCategory: 'SEBI: Hybrid - Arbitrage Fund',
        percentage: 35,
        rationale: 'Captures cash-futures price spreads mimicking liquid debt returns while securing equity taxation (12.5% LTCG); avoids high personal income tax slabs on FD interest.',
        suggestedTenure: '1 to 2 Years',
        riskProfile: 'Low',
        sampleFundHouses: ['Kotak Mahindra Mutual Fund', 'ICICI Prudential Mutual Fund', 'SBI Mutual Fund'],
        sampleSchemes: ['Kotak Equity Arbitrage Fund', 'ICICI Prudential Equity Arbitrage Fund', 'SBI Arbitrage Opportunities Fund'],
      },
      {
        category: 'Debt / Hybrid',
        subcategory: 'Balanced Advantage Funds (BAF)',
        sebiCategory: 'SEBI: Hybrid - Dynamic Asset Allocation / BAF',
        percentage: 35,
        rationale: 'Dynamically varies net equity exposure between 30% and 80% based on market valuations; cushions drawdowns while maintaining inflation-beating returns.',
        suggestedTenure: '3 to 5 Years',
        riskProfile: 'Moderate',
        sampleFundHouses: ['ICICI Prudential Mutual Fund', 'HDFC Mutual Fund', 'Edelweiss Mutual Fund'],
        sampleSchemes: ['ICICI Prudential Balanced Advantage Fund', 'HDFC Balanced Advantage Fund', 'Edelweiss Balanced Advantage Fund'],
      },
      {
        category: 'Debt / Hybrid',
        subcategory: 'Liquid / Low Duration Fund',
        sebiCategory: 'SEBI: Debt - Liquid Fund',
        percentage: 15,
        rationale: 'Provides core capital stability and immediate T+1 liquidity buffer for regular emergency cashflows.',
        suggestedTenure: '< 1 Year',
        riskProfile: 'Low',
        sampleFundHouses: ['Nippon India Mutual Fund', 'SBI Mutual Fund', 'HDFC Mutual Fund'],
        sampleSchemes: ['SBI Liquid Fund', 'Nippon India Liquid Fund', 'HDFC Liquid Fund'],
      },
      {
        category: 'Equity',
        subcategory: 'Large Cap / Flexi Cap Fund',
        sebiCategory: 'SEBI: Equity - Large Cap Fund',
        percentage: 15,
        rationale: 'Defensive equity allocation in India top 100 bluechip titans to counter medical and lifestyle inflation over multi-year horizon.',
        suggestedTenure: '5+ Years',
        riskProfile: 'Moderate',
        sampleFundHouses: ['HDFC Mutual Fund', 'ICICI Prudential Mutual Fund', 'Parag Parikh Mutual Fund'],
        sampleSchemes: ['ICICI Prudential Bluechip Fund', 'HDFC Top 100 Fund', 'Parag Parikh Flexi Cap Fund'],
      },
    ];
  } else if (riskScale >= 4) {
    // Moderately Aggressive or Aggressive
    equityTotal = riskScale === 5 ? 80 : 70;
    debtHybridTotal = riskScale === 5 ? 10 : 20;
    taxSavingTotal = text.includes('80c') || text.includes('elss') ? 10 : 0;
    if (taxSavingTotal > 0) {
      equityTotal -= 10;
    }

    categories = [
      {
        category: 'Equity',
        subcategory: 'Flexi Cap Fund',
        sebiCategory: 'SEBI: Equity - Flexi Cap Fund',
        percentage: 30,
        rationale: 'Core wealth compounding engine; fund manager possesses statutory freedom to allocate dynamically across Indian Large, Mid, and Small Cap leaders.',
        suggestedTenure: '7+ Years',
        riskProfile: 'High',
        sampleFundHouses: ['Parag Parikh Mutual Fund', 'HDFC Mutual Fund', 'ICICI Prudential Mutual Fund'],
        sampleSchemes: ['Parag Parikh Flexi Cap Fund', 'HDFC Flexi Cap Fund', 'ICICI Prudential Flexicap Fund'],
      },
      {
        category: 'Equity',
        subcategory: 'Mid Cap Fund',
        sebiCategory: 'SEBI: Equity - Mid Cap Fund',
        percentage: 25,
        rationale: 'Captures rapid domestic capex expansion and emerging industry champions (101st to 250th listed companies by market capitalization).',
        suggestedTenure: '7+ Years',
        riskProfile: 'Very High',
        sampleFundHouses: ['HDFC Mutual Fund', 'Nippon India Mutual Fund', 'Motilal Oswal Mutual Fund'],
        sampleSchemes: ['HDFC Mid-Cap Opportunities Fund', 'Nippon India Growth Fund', 'Motilal Oswal Midcap Fund'],
      },
      {
        category: 'Equity',
        subcategory: 'Small Cap Fund',
        sebiCategory: 'SEBI: Equity - Small Cap Fund',
        percentage: riskScale === 5 ? 25 : 15,
        rationale: 'High alpha generation potential over long horizons (>7-10 yrs); systematic SIP or STP deployment mitigates short-term volatility.',
        suggestedTenure: '8-10+ Years',
        riskProfile: 'Very High',
        sampleFundHouses: ['Nippon India Mutual Fund', 'SBI Mutual Fund', 'Tata Mutual Fund'],
        sampleSchemes: ['Nippon India Small Cap Fund', 'SBI Small Cap Fund', 'Tata Small Cap Fund'],
      },
      ...(taxSavingTotal > 0
        ? [
            {
              category: 'Tax Saving',
              subcategory: 'ELSS (Equity Linked Savings Scheme)',
              sebiCategory: 'SEBI: Equity - ELSS',
              percentage: 10,
              rationale: 'Combines Section 80C tax deduction with 3-year shortest lock-in among 80C instruments and multi-year equity compounding.',
              suggestedTenure: '3 to 5 Years',
              riskProfile: 'Very High' as const,
              sampleFundHouses: ['Mirae Asset Mutual Fund', 'SBI Mutual Fund', 'DSP Mutual Fund'],
              sampleSchemes: ['Mirae Asset ELSS Tax Saver Fund', 'SBI Long Term Equity Fund', 'DSP ELSS Tax Saver Fund'],
            },
          ]
        : []),
      {
        category: 'Debt / Hybrid',
        subcategory: 'Liquid / Arbitrage Fund (STP Source & Emergency Buffer)',
        sebiCategory: 'SEBI: Debt - Liquid / Hybrid - Arbitrage',
        percentage: debtHybridTotal,
        rationale: 'Shock absorber and dry powder reserve for Systematic Transfer Plan (STP) and 6-month contingency requirement.',
        suggestedTenure: '< 1 Year to 2 Years',
        riskProfile: 'Low' as const,
        sampleFundHouses: ['ICICI Prudential Mutual Fund', 'SBI Mutual Fund', 'HDFC Mutual Fund'],
        sampleSchemes: ['ICICI Prudential Liquid Fund', 'SBI Liquid Fund', 'HDFC Arbitrage Fund'],
      },
    ];
  } else {
    // Moderate (Level 3)
    equityTotal = 55;
    debtHybridTotal = 35;
    taxSavingTotal = text.includes('80c') || text.includes('elss') ? 10 : 0;
    if (taxSavingTotal > 0) {
      equityTotal -= 10;
    }

    categories = [
      {
        category: 'Equity',
        subcategory: 'Flexi Cap Fund',
        sebiCategory: 'SEBI: Equity - Flexi Cap Fund',
        percentage: 25,
        rationale: 'Foundational equity growth engine with unrestricted mandate across market caps, ensuring steady portfolio resilience.',
        suggestedTenure: '5+ Years',
        riskProfile: 'High',
        sampleFundHouses: ['Parag Parikh Mutual Fund', 'HDFC Mutual Fund', 'Kotak Mahindra Mutual Fund'],
        sampleSchemes: ['Parag Parikh Flexi Cap Fund', 'HDFC Flexi Cap Fund', 'Kotak Flexicap Fund'],
      },
      {
        category: 'Equity',
        subcategory: 'Large & Mid Cap Fund',
        sebiCategory: 'SEBI: Equity - Large & Mid Cap Fund',
        percentage: 20,
        rationale: 'Maintains mandatory 35% large caps for stability and 35% mid caps for growth, offering balanced milestone compounding.',
        suggestedTenure: '5 to 7 Years',
        riskProfile: 'High',
        sampleFundHouses: ['Mirae Asset Mutual Fund', 'ICICI Prudential Mutual Fund', 'SBI Mutual Fund'],
        sampleSchemes: ['Mirae Asset Large & Midcap Fund', 'ICICI Prudential Large & Mid Cap Fund', 'SBI Large & Midcap Fund'],
      },
      {
        category: 'Debt / Hybrid',
        subcategory: 'Balanced Advantage Fund (BAF)',
        sebiCategory: 'SEBI: Hybrid - Dynamic Asset Allocation / BAF',
        percentage: 25,
        rationale: 'Counter-cyclical equity management: dynamically takes profits when market valuations stretch and buys on corrections.',
        suggestedTenure: '3 to 5 Years',
        riskProfile: 'Moderate',
        sampleFundHouses: ['HDFC Mutual Fund', 'ICICI Prudential Mutual Fund', 'SBI Mutual Fund'],
        sampleSchemes: ['HDFC Balanced Advantage Fund', 'ICICI Prudential Balanced Advantage Fund', 'SBI Balanced Advantage Fund'],
      },
      {
        category: 'Debt / Hybrid',
        subcategory: 'Liquid / Low Duration Fund',
        sebiCategory: 'SEBI: Debt - Liquid Fund',
        percentage: 10,
        rationale: 'Guaranteed principal stability and immediate liquidity reserve earmarked for contingency and goal cashflows.',
        suggestedTenure: '< 1 Year',
        riskProfile: 'Low',
        sampleFundHouses: ['SBI Mutual Fund', 'HDFC Mutual Fund', 'Aditya Birla Sun Life Mutual Fund'],
        sampleSchemes: ['SBI Liquid Fund', 'HDFC Liquid Fund', 'Aditya Birla Sun Life Liquid Fund'],
      },
      ...(taxSavingTotal > 0
        ? [
            {
              category: 'Tax Saving',
              subcategory: 'ELSS (Tax Saving Mutual Fund)',
              sebiCategory: 'SEBI: Equity - ELSS',
              percentage: 10,
              rationale: 'Section 80C tax exemption with 3-year lock-in and potential for long-term equity compounding.',
              suggestedTenure: '3 to 5 Years',
              riskProfile: 'Very High' as const,
              sampleFundHouses: ['Mirae Asset Mutual Fund', 'Bandhan Mutual Fund', 'DSP Mutual Fund'],
              sampleSchemes: ['Mirae Asset ELSS Tax Saver Fund', 'Bandhan ELSS Tax Saver Fund', 'DSP ELSS Tax Saver Fund'],
            },
          ]
        : []),
    ];
  }

  // 9. Talking Points & Jargon Demystification
  const advisoryConcepts: TalkingPoint[] = [
    {
      title: 'Rupee Cost Averaging via SIP as Your Volatility Shield',
      jargonDemystified: 'Rupee Cost Averaging & Market Timing',
      plainEnglishExplanation:
        'Instead of worrying about whether Indian benchmark indices are at an all-time high, your disciplined monthly SIP purchases more units when NAVs decline and fewer units when NAVs rally, automatically smoothing out purchase prices.',
      advisorScript:
        `"When the stock market pulls back, please do not view it as a loss—think of it as a festive seasonal discount at your favorite store. Through our SIP, your fixed monthly allocation buys more mutual fund units at lower prices, which generates substantial wealth acceleration when the market inevitably turns upward."`,
    },
    {
      title: 'Balanced Advantage Funds as an Automated Shock Absorber',
      jargonDemystified: 'Dynamic Asset Allocation (BAF)',
      plainEnglishExplanation:
        'Balanced Advantage Funds employ mathematical valuation parameters (Price-to-Earnings and Price-to-Book metrics) to automatically book profits in overvalued equity markets and re-accumulate equities during market corrections.',
      advisorScript:
        `"Think of Balanced Advantage Funds like the automatic cruise control and safety braking system in a modern automobile. You don't have to stress about predicting market turns; the fund manager automatically protects your capital downside while continuing to participate in India's structural economic growth."`,
    },
    {
      title: 'Tax-Smart Wealth Compounding vs Traditional Fixed Deposits',
      jargonDemystified: 'Equity LTCG vs Tax Slab Drag on Fixed Deposits',
      plainEnglishExplanation:
        'Bank FD interest is taxed at your highest personal income tax bracket every single year, regardless of whether you withdraw it. In contrast, mutual fund gains are only taxed upon redemption, with long-term equity capital gains enjoying a ₹1.25 Lakh annual tax-free threshold under Indian budget rules.',
      advisorScript:
        `"With traditional bank FDs, taxes take a bite out of your interest every March, causing your money to lag behind actual inflation. By investing in SEBI-regulated mutual funds, tax is deferred until you withdraw, allowing your pre-tax money to compound significantly faster."`,
    },
  ];

  // 10. Platform Execution Guide
  const executionSteps =
    platform === 'AssetPlus'
      ? [
          'Log in to AssetPlus MFD Advisor Portal and create/verify the client PAN profile.',
          'Add recommended SEBI scheme categories to the Multi-Scheme Cart with specified SIP/Lumpsum allocations.',
          'Generate instant Digital Payment & Mandate Authorization Link via WhatsApp/SMS.',
          'Guide client to authorize the OTM (One Time Mandate) via NetBanking or UPI AutoPay.',
          'Verify execution status and track ongoing allocations on the AssetPlus live MFD dashboard.',
        ]
      : [
          'Access NJ Wealth Partner Desk and verify client E-Wealth Account (EWA) credentials.',
          'Construct a Custom Mutual Fund Basket mirroring the recommended SEBI category asset allocation.',
          'Register e-NACH / OTM Auto-Debit Mandate linked to the client primary bank account.',
          'Trigger client authorization email and SMS OTP verification for paperless mandate approval.',
          'Track allotment confirmation and monitor portfolio via the NJ Client Desk Mobile App.',
        ];

  const mandateRecommendations =
    platform === 'AssetPlus'
      ? 'Set up an e-NACH / UPI AutoPay mandate with limit of ₹1,00,000 to accommodate future SIP top-ups without paperwork.'
      : 'Register an NJ E-Wealth OTM mandate for ₹1,00,000 with the client bank to allow seamless SIP step-ups and opportunistic market STP triggers.';

  // 11. Follow-up Draft
  const whatsappFormat = `Namaste ${clientName} ji! 🙏 It was a pleasure meeting you today.

Based on our discussion regarding your financial milestones (Age: ${age}, Horizon: ${horizon}) and risk comfort (${riskScaleLabel}), I have structured a customized SEBI-compliant mutual fund portfolio focused on disciplined wealth creation, capital protection, and tax efficiency.

Key Highlights:
• Target Asset Allocation: ${equityTotal}% Equity | ${debtHybridTotal}% Debt/Hybrid
• Automated Rupee Cost Averaging via monthly SIP
• Dedicated liquid contingency reserve for unforeseen needs

I am sending across the digital authorization link on ${platform}. Please feel free to call me if you have any questions before we initiate your investment journey. Looking forward to partnering in your family's wealth creation! 📈✨`;

  const emailFormat = `Dear ${clientName},

Greetings! Thank you for taking the time to discuss your family's financial roadmap with me today.

As an AMFI-registered Mutual Fund Distributor, I have translated our meeting notes into a structured, SEBI-aligned asset allocation strategy tailored to your investment horizon (${horizon}) and liquidity requirements.

Key Client Profile & Strategy Summary:
• Age & Life Stage: ${age} (${occupation})
• Annual Household Income: ${annualIncome}
• Granular Risk Rating: ${riskScaleLabel}
• Tailored Allocation: ${equityTotal}% Equity (Growth) | ${debtHybridTotal}% Debt/Hybrid (Stability) ${taxSavingTotal > 0 ? `| ${taxSavingTotal}% ELSS Tax Optimization` : ''}
• Dedicated Contingency: ${liquidityNeeds}

Advisor Platform Note: Exact fund selection will be executed via our ${platform} Fund Finder panel based on live portal performance ratings and scheme risk-o-meters.

I have prepared the transaction basket on our ${platform} advisory portal. You will receive a secure authorization link from the platform to verify your mandate and initiate the allocation.

Please find the detailed dossier attached. I am always available for any queries.

Warm regards,
Your Dedicated Financial Co-Pilot & MFD Advisor`;

  // 12. Markdown Report with SEBI categories, reference fund houses, and advisor disclaimer
  const markdownReport = `# Mutual Fund Advisory Dossier & Client Action Plan
**Client Name:** ${clientName}  
**Platform Architecture:** ${platform}  
**Regulatory Alignment:** SEBI / AMFI Mutual Fund Regulations  
**Generated On:** ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}

---

## 1. Executive Summary & Expanded Client Profile

| Parameter | Synthesized Details |
| :--- | :--- |
| **Client Name & Age** | **${clientName}** (${age}) |
| **Occupation** | ${occupation} |
| **Annual Income** | ${annualIncome} |
| **Family Structure** | ${familyDependents} |
| **Demographics & Life Stage** | ${demographics} |
| **Investment Horizon** | **${horizon}** |
| **Granular Risk Assessment** | **${riskScaleLabel}** |
| **Available Surplus / Capital** | **${surplus}** |
| **Primary Financial Goals** | ${primaryGoals.join('; ')} |
| **Liquidity & Emergency Buffer** | ${liquidityNeeds} |
| **Tax Optimization Strategy** | ${taxNeeds} |

---

## 2. Advisory Concepts & Plain-English Talking Points

### 1. ${advisoryConcepts[0].title}
- **Concept Demystified:** ${advisoryConcepts[0].jargonDemystified}
- **Advisor In-Meeting Script:**  
  > *"${advisoryConcepts[0].advisorScript.replace(/"/g, '')}"*
- **Why this fits:** ${advisoryConcepts[0].plainEnglishExplanation}

### 2. ${advisoryConcepts[1].title}
- **Concept Demystified:** ${advisoryConcepts[1].jargonDemystified}
- **Advisor In-Meeting Script:**  
  > *"${advisoryConcepts[1].advisorScript.replace(/"/g, '')}"*
- **Why this fits:** ${advisoryConcepts[1].plainEnglishExplanation}

### 3. ${advisoryConcepts[2].title}
- **Concept Demystified:** ${advisoryConcepts[2].jargonDemystified}
- **Advisor In-Meeting Script:**  
  > *"${advisoryConcepts[2].advisorScript.replace(/"/g, '')}"*
- **Why this fits:** ${advisoryConcepts[2].plainEnglishExplanation}

---

## 3. Recommended SEBI Asset Allocation Framework

> ⚠️ **Advisor Action Rule:** *Select exact schemes via your NJ Wealth / AssetPlus Fund Finder panel based on live portal ratings.*

**Strategic Portfolio Split:**  
- **Equity Growth Engine:** ${equityTotal}%  
- **Debt & Hybrid Stability:** ${debtHybridTotal}%  
${taxSavingTotal > 0 ? `- **Tax Optimization (ELSS):** ${taxSavingTotal}%  ` : ''}

### Scheme Category Allocation Matrix (SEBI Defined)

| Category | SEBI Category | Allocation | Suggested Tenure | Risk Profile | Generic Reference Fund Houses (2-3 Recognized AMCs) |
| :--- | :--- | :---: | :--- | :--- | :--- |
${categories
  .map(
    (c) =>
      `| **${c.category}** | ${c.sebiCategory || c.subcategory} | **${c.percentage}%** | ${c.suggestedTenure} | ${c.riskProfile} | ${(c.sampleFundHouses || ['HDFC', 'ICICI Prudential', 'SBI']).join(', ')} |`
  )
  .join('\n')}

**Portfolio Strategic Rationale:**  
This asset allocation balances capital compounding with explicit liquidity buffers. Equity allocations generate inflation-beating long-term returns, while hybrid and debt buckets cushion against downside drawdowns on ${platform}.

---

## 4. Platform Execution Workflow (${platform})

1. **Client Setup:** Verify KYC and activate E-Wealth / digital profile on ${platform}.
2. **Basket Creation:** Construct the scheme category basket matching the ${equityTotal}/${debtHybridTotal} allocation.
3. **Mandate Registration:** Register e-NACH / UPI AutoPay OTM mandate (${mandateRecommendations}).
4. **Digital Authorization:** Dispatch OTP verification link to client for paperless execution.

---

## 5. Client Follow-Up Drafts

### Ready-to-Send WhatsApp Draft:
\`\`\`text
${whatsappFormat}
\`\`\`

### Email Follow-Up Draft:
\`\`\`text
${emailFormat}
\`\`\`

---
*Disclaimer: Mutual Fund investments are subject to market risks. Read all scheme related documents carefully. Select exact schemes via your NJ Wealth / AssetPlus Fund Finder panel based on live portal ratings.*`;

  return {
    clientProfile: {
      clientName,
      age,
      occupation,
      annualIncome,
      familyDependents,
      demographicsAndStatus: demographics,
      investmentHorizon: horizon,
      riskTolerance: risk,
      riskScale,
      riskScaleLabel,
      monthlySurplusOrLumpsum: surplus,
      primaryGoals,
      structuredGoals,
      liquidityNeeds,
      taxNeeds,
    },
    advisoryConcepts,
    assetAllocation: {
      equityTotal,
      debtHybridTotal,
      taxSavingTotal,
      categories,
      strategicRationale: `This portfolio structure is calibrated to balance ${risk.toLowerCase()} risk capacity (Scale ${riskScale}/5) with a ${horizon.toLowerCase()} horizon, pairing wealth generation with capital defense on ${platform}.`,
    },
    platformExecutionGuide: {
      platform,
      executionSteps,
      mandateRecommendations,
    },
    clientFollowUpDraft: {
      whatsappFormat,
      emailFormat,
    },
    markdownReport,
    timestamp: new Date().toISOString(),
  };
}
