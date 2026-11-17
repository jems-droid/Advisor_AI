import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { NotesInputSection } from './components/NotesInputSection';
import { ProfileCard } from './components/ProfileCard';
import { TalkingPointsSection } from './components/TalkingPointsSection';
import { AssetAllocationSection } from './components/AssetAllocationSection';
import { WealthCreationSection } from './components/WealthCreationSection';
import { FundComparisonTable } from './components/FundComparisonTable';
import { FollowUpDraftSection } from './components/FollowUpDraftSection';
import { MarkdownReportView } from './components/MarkdownReportView';
import { RegulatoryBanner } from './components/RegulatoryBanner';
import { PrintProposalDocument } from './components/PrintProposalDocument';
import { AdvisorAnalysisResult, RecommendedScheme } from './types';
import { SAMPLE_MEETING_NOTES } from './data/sampleNotes';
import { LayoutDashboard, FileText, AlertCircle, History, Printer, Sparkles, Check } from 'lucide-react';

export default function App() {
  const [notes, setNotes] = useState<string>(SAMPLE_MEETING_NOTES[0].rawText);
  const [platform, setPlatform] = useState<'NJ Wealth' | 'AssetPlus' | 'Direct / BSE StAR / MFU'>('NJ Wealth');
  const [customInstructions, setCustomInstructions] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AdvisorAnalysisResult | null>(null);
  const [schemes, setSchemes] = useState<RecommendedScheme[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'markdown'>('dashboard');
  const [history, setHistory] = useState<Array<{ id: string; clientName: string; time: string; result: AdvisorAnalysisResult }>>([]);

  // Sync recommended schemes when result updates
  useEffect(() => {
    if (result?.recommendedSchemes) {
      setSchemes(result.recommendedSchemes);
    }
  }, [result]);

  const handleToggleScheme = (id: string) => {
    setSchemes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isSelected: !s.isSelected } : s))
    );
  };

  const handleSelectAllSchemes = () => {
    setSchemes((prev) => prev.map((s) => ({ ...s, isSelected: true })));
  };

  const handleDeselectAllSchemes = () => {
    setSchemes((prev) => prev.map((s) => ({ ...s, isSelected: false })));
  };

  // Load recent history from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mfd_advisor_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleSynthesize = async () => {
    if (!notes.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze-notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notes,
          platform,
          customInstructions,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error (${response.status})`);
      }

      const data: AdvisorAnalysisResult = await response.json();
      setResult(data);
      if (data.recommendedSchemes) {
        setSchemes(data.recommendedSchemes);
      }

      // Save to recent advisor dossiers
      const newHistoryItem = {
        id: Date.now().toString(),
        clientName: data.clientProfile?.clientName || 'Client Proposal',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        result: data,
      };

      const updatedHistory = [newHistoryItem, ...history.slice(0, 4)];
      setHistory(updatedHistory);
      try {
        localStorage.setItem('mfd_advisor_history', JSON.stringify(updatedHistory));
      } catch {
        // Ignore
      }

      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById('advisory-results-view')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error('Failed to analyze advisor notes:', err);
      setError(err.message || 'An unexpected error occurred while processing meeting notes.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setNotes('');
    setCustomInstructions('');
    setResult(null);
    setError(null);
    setSchemes([]);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-800 font-sans flex flex-col antialiased">
      {/* Top Header */}
      <Header onPrint={handlePrint} onReset={handleReset} hasResult={Boolean(result)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Meeting Notes Input Section */}
        <section className="print:hidden">
          <NotesInputSection
            notes={notes}
            setNotes={setNotes}
            platform={platform}
            setPlatform={setPlatform}
            customInstructions={customInstructions}
            setCustomInstructions={setCustomInstructions}
            onSubmit={handleSynthesize}
            isLoading={isLoading}
          />
        </section>

        {/* History bar if saved sessions exist */}
        {history.length > 0 && !result && (
          <div className="print:hidden flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-500">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 shrink-0">
              <History className="w-3.5 h-3.5" /> Recent Dossiers:
            </span>
            {history.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => setResult(h.result)}
                className="bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1 rounded-xl text-slate-700 font-medium shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <span className="font-semibold text-xs text-slate-900">{h.clientName}</span>
                <span className="text-[10px] text-slate-400 font-mono">({h.time})</span>
              </button>
            ))}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block mb-0.5 uppercase tracking-wider text-[10px]">Synthesis Notice:</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Synthesis Output / Advisory Dossier */}
        {result && (
          <div id="advisory-results-view" className="space-y-6">
            {/* View Switcher Tabs & Meta Bar */}
            <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  id="tab-interactive-dashboard"
                  onClick={() => setActiveTab('dashboard')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'dashboard'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Interactive Advisory Suite</span>
                </button>
                <button
                  type="button"
                  id="tab-markdown-dossier"
                  onClick={() => setActiveTab('markdown')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'markdown'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Full Markdown Dossier</span>
                </button>
              </div>

              <div className="flex items-center gap-3 px-2 text-xs text-slate-500 self-end sm:self-auto flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Client:</span>
                  <strong className="text-slate-800">{result.clientProfile.clientName || 'Investor'}</strong>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Platform:</span>
                  <strong className="text-indigo-600">{platform}</strong>
                </div>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  title="Print official 2-page client proposal"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print 2-Page Proposal</span>
                </button>
              </div>
            </div>

            {/* Screen View */}
            <div className="print:hidden space-y-6">
              {activeTab === 'dashboard' ? (
                <div className="space-y-6">
                  {/* 1. Profile Extraction with SEBI Riskometer */}
                  <ProfileCard profile={result.clientProfile} />

                  {/* 2. Wealth Creation & Compounding Projections */}
                  <WealthCreationSection
                    surplusText={result.clientProfile.monthlySurplusOrLumpsum}
                    horizonText={result.clientProfile.investmentHorizon}
                    equityTotal={result.assetAllocation.equityTotal}
                    debtHybridTotal={result.assetAllocation.debtHybridTotal}
                    initialCagr={result.wealthMetrics?.cagrRate}
                  />

                  {/* 3. Recommended Asset Allocation */}
                  <AssetAllocationSection
                    assetAllocation={result.assetAllocation}
                    platform={platform}
                    platformExecutionGuide={result.platformExecutionGuide}
                  />

                  {/* 4. Fund Comparison Table (Across NJ Wealth / AssetPlus / AMFI) */}
                  <FundComparisonTable
                    schemes={schemes}
                    onToggleScheme={handleToggleScheme}
                    onSelectAll={handleSelectAllSchemes}
                    onDeselectAll={handleDeselectAllSchemes}
                    platform={platform}
                  />

                  {/* 5. Advisory Concepts & Talking Points */}
                  <TalkingPointsSection talkingPoints={result.advisoryConcepts} />

                  {/* 6. Client Follow-Up Draft */}
                  <FollowUpDraftSection
                    drafts={result.clientFollowUpDraft}
                    clientName={result.clientProfile.clientName}
                  />
                </div>
              ) : (
                <MarkdownReportView markdown={result.markdownReport} />
              )}

              {/* Regulatory Disclaimer Banner */}
              <RegulatoryBanner />
            </div>

            {/* Dedicated 2-Page Print Document */}
            <PrintProposalDocument
              result={result}
              selectedSchemes={schemes.filter((s) => s.isSelected)}
              platform={platform}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="print:hidden border-t border-slate-200 bg-white px-4 sm:px-8 py-3.5 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest gap-2">
          <span>MUTUAL FUND DISTRIBUTOR WORKFLOW ENGINE • SEBI & AMFI COMPLIANT</span>
          <div className="flex items-center gap-3">
            <span>PLATFORMS: NJ WEALTH • ASSETPLUS • BSE STAR</span>
            <span className="text-emerald-600 font-semibold">• ADVISORY ACTIVE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
