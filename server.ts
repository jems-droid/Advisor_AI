import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { synthesizeAdvisorDossierFallback } from "./src/server/advisorEngine.ts";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Helper to get Gemini client
function getGenAIClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set. Please check Settings > Secrets.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Primary Endpoint: Process Advisor Meeting Notes
app.post("/api/analyze-notes", async (req, res) => {
  try {
    const { notes, platform = "NJ Wealth", customInstructions } = req.body;

    if (!notes || typeof notes !== "string" || !notes.trim()) {
      return res.status(400).json({ error: "Please provide meeting notes to analyze." });
    }

    const ai = getGenAIClient();

    const systemPrompt = `You are an expert Indian Mutual Fund Distributor (MFD) Assistant and Senior Financial Co-Pilot embedded within a premier Indian wealth advisory workflow platform (specifically aligned with NJ Wealth, AssetPlus, BSE StAR MF, and AMFI/SEBI Mutual Fund regulations).

Your task is to take short, informal, messy, or semi-vague post-meeting notes written by an MFD and transform them into a comprehensive, SEBI-compliant advisory dossier for a retail or HNI client in India.

Selected Platform Workflow Context: "${platform}".

### CORE TASKS:
1. EXPANDED CLIENT PROFILE EXTRACTION:
   - Extract/infer:
     * Client Name
     * Age (e.g., "34 Years" or infer from career stage if not explicit)
     * Occupation (e.g., "Senior Software Architect", "Business Owner", "PSU Executive")
     * Annual Income (e.g., "₹25 Lakhs p.a." or estimated from monthly cashflows)
     * Family Dependents (e.g., "Spouse + 1 Child (Age 7) + Dependent Parents")
     * Investment Horizon: Clearly defined with specific tenure & milestone (e.g., "8-10 Years (Child Overseas Education & Retirement)")
     * Risk Assessment: Granular scale from 1 to 5:
       - 1: Very Conservative / Capital Preservation
       - 2: Moderately Conservative
       - 3: Moderate / Balanced
       - 4: Moderately Aggressive / Growth
       - 5: Aggressive / High Growth Alpha
     * Risk Scale Number (1-5) and Risk Scale Label (e.g. "Level 4 / 5 (Moderately Aggressive)")
     * Monthly Surplus or Lumpsum figure
     * Specific Financial Goals: structured breakdown (e.g. Retirement corpus, Child's higher education, Buying a house, Emergency liquidity reserve)
     * Liquidity Needs: Clearly defined requirements (e.g. "6 months household expenses (~₹4 Lakhs) earmarked in Liquid/Arbitrage funds for contingency")
     * Tax Needs (Section 80C ELSS old tax regime vs new regime, LTCG exemption planning)

2. ADVISORY CONCEPTS & TALKING POINTS:
   - Provide 2-3 brief, plain-English talking points explaining *why* the strategy fits their scenario.
   - Demystify financial jargon into simple, trust-building explanations the advisor can read aloud or adapt during a meeting (e.g., Rupee Cost Averaging, Flexi Cap vs Multi Cap, Asset Allocation as a shock absorber, debt vs equity taxation, Dynamic Asset Allocation / BAF).

3. RECOMMENDED ASSET ALLOCATION & SCHEME RECOMMENDATION RULE:
   - Suggest a realistic percentage allocation across SEBI-defined mutual fund categories totaling 100%:
     * Equity: Large Cap, Flexi Cap, Mid Cap, Small Cap, Sectoral/Thematic
     * Debt / Hybrid: Aggressive Hybrid, Balanced Advantage (BAF), Multi Asset Allocation, Arbitrage, Liquid / Overnight
     * Tax Saving: ELSS (if applicable)
   - SCHEME RECOMMENDATION RULE:
     * Focus primarily on SEBI Fund Categories (e.g., Flexi Cap, Large Cap, Balanced Advantage, Liquid).
     * Recommend 2-3 widely recognized Indian Fund Houses (e.g., HDFC Mutual Fund, ICICI Prudential Mutual Fund, SBI Mutual Fund, Parag Parikh Mutual Fund, Nippon India Mutual Fund) as generic reference examples available on platforms like NJ Wealth and AssetPlus.
     * Always include the clear disclaimer for the advisor: "Select exact schemes via your NJ Wealth / AssetPlus Fund Finder panel based on live portal ratings."

4. PLATFORM EXECUTION GUIDE:
   - Actionable operational recommendations for ${platform} (e.g. creating e-Wealth SIP basket, OTM / e-NACH mandate setup, STP from Liquid to Equity, or AssetPlus Cart & Client Link dispatch).

5. CLIENT FOLLOW-UP DRAFT:
   - Formulate a warm, encouraging, polite 3-4 sentence summary in warm Indian professional advisor tone.
   - Provide both a WhatsApp ready draft (with friendly emoji, bold highlights, ready to send) and an Email format.

6. FULL MARKDOWN ADVISORY DOSSIER:
   - Produce a beautiful, clean Markdown dossier with structured headers (##, ###), bullet points, client profile table, and clean tables for asset allocation with SEBI categories, reference fund houses, and advisor disclaimer.
   - Warm, trust-building, jargon-free plain English explanations.

Ensure response is valid JSON matching this schema:
{
  "clientProfile": {
    "clientName": "string",
    "age": "string",
    "occupation": "string",
    "annualIncome": "string",
    "familyDependents": "string",
    "demographicsAndStatus": "string",
    "investmentHorizon": "string",
    "riskTolerance": "string",
    "riskScale": 1 | 2 | 3 | 4 | 5,
    "riskScaleLabel": "string",
    "monthlySurplusOrLumpsum": "string",
    "primaryGoals": ["string"],
    "structuredGoals": [
      {
        "title": "string",
        "category": "Retirement | Child Education | Home Purchase | Emergency Buffer | Wealth Creation | Other",
        "targetTimeline": "string",
        "targetCorpus": "string"
      }
    ],
    "liquidityNeeds": "string",
    "taxNeeds": "string"
  },
  "advisoryConcepts": [
    {
      "title": "string",
      "plainEnglishExplanation": "string",
      "advisorScript": "string",
      "jargonDemystified": "string"
    }
  ],
  "assetAllocation": {
    "equityTotal": number,
    "debtHybridTotal": number,
    "taxSavingTotal": number,
    "categories": [
      {
        "category": "Equity | Debt/Hybrid | Tax Saving",
        "subcategory": "string",
        "sebiCategory": "string",
        "percentage": number,
        "rationale": "string",
        "suggestedTenure": "string",
        "riskProfile": "Low | Moderate | High | Very High",
        "sampleFundHouses": ["string"],
        "sampleSchemes": ["string"]
      }
    ],
    "strategicRationale": "string"
  },
  "platformExecutionGuide": {
    "platform": "${platform}",
    "executionSteps": ["string"],
    "mandateRecommendations": "string"
  },
  "clientFollowUpDraft": {
    "whatsappFormat": "string",
    "emailFormat": "string"
  },
  "markdownReport": "string"
}`;

    const prompt = `Here are the advisor's raw meeting notes:
"""
${notes}
"""

${customInstructions ? `Additional Advisor Preferences: ${customInstructions}\n` : ""}

Generate the structured advisor dossier adhering strictly to Indian SEBI/AMFI mutual fund regulations and ${platform} execution conventions. Return only pure JSON.`;

    const modelsToTry = ["gemini-3.8-flash", "gemini-flash-latest"];
    let rawText = "";

    const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
      return Promise.race([
        promise,
        new Promise<T>((_, reject) => setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)),
      ]);
    };

    for (const modelName of modelsToTry) {
      try {
        const response = await withTimeout(
          ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              systemInstruction: systemPrompt,
              responseMimeType: "application/json",
              temperature: 0.3,
            },
          }),
          5000
        );
        if (response.text) {
          rawText = response.text;
          break;
        }
      } catch (err: any) {
        console.warn(`Model ${modelName} notice:`, err?.message || err);
      }
    }

    if (!rawText) {
      console.log("Using deterministic SEBI/AMFI advisor synthesis engine fallback.");
      const fallbackResult = synthesizeAdvisorDossierFallback(notes, platform, customInstructions);
      return res.json(fallbackResult);
    }

    let parsedData;
    try {
      parsedData = JSON.parse(rawText);
    } catch {
      // Fallback if markdown fence was included
      const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
      try {
        parsedData = JSON.parse(cleaned);
      } catch {
        parsedData = synthesizeAdvisorDossierFallback(notes, platform, customInstructions);
      }
    }

    parsedData.timestamp = new Date().toISOString();

    res.json(parsedData);
  } catch (err: any) {
    console.error("Error in /api/analyze-notes, falling back to expert synthesis:", err?.message || err);
    try {
      const fallbackResult = synthesizeAdvisorDossierFallback(req.body?.notes || "", req.body?.platform || "NJ Wealth", req.body?.customInstructions);
      return res.json(fallbackResult);
    } catch (fallbackErr) {
      res.status(500).json({
        error: err?.message || "Failed to analyze advisor notes. Please try again.",
      });
    }
  }
});

// Vite middleware & Static serving
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MFD Advisor Co-Pilot server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
