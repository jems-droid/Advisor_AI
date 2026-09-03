import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, FileText } from 'lucide-react';

interface MarkdownReportViewProps {
  markdown: string;
}

export const MarkdownReportView: React.FC<MarkdownReportViewProps> = ({ markdown }) => {
  const [viewMode, setViewMode] = useState<'formatted' | 'raw'>('formatted');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
        <div>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-600" />
            Advisory Dossier Markdown
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Structured report with headings, bullet points, and tables ready for print, client email, or CRM storage
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* View toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              id="btn-view-formatted"
              onClick={() => setViewMode('formatted')}
              className={`text-xs px-3 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                viewMode === 'formatted'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Formatted
            </button>
            <button
              type="button"
              id="btn-view-raw"
              onClick={() => setViewMode('raw')}
              className={`text-xs px-3 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                viewMode === 'raw'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Raw Markdown
            </button>
          </div>

          <button
            type="button"
            id="btn-copy-full-markdown"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors shadow-2xs cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Markdown</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="pt-4">
        {viewMode === 'raw' ? (
          <textarea
            readOnly
            value={markdown}
            rows={18}
            className="w-full text-xs font-mono bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 focus:outline-hidden leading-relaxed shadow-inner"
          />
        ) : (
          <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed 
            [&>h1]:text-lg [&>h1]:font-bold [&>h1]:text-slate-950 [&>h1]:border-b [&>h1]:border-slate-200 [&>h1]:pb-2 [&>h1]:mb-3
            [&>h2]:text-base [&>h2]:font-bold [&>h2]:text-indigo-900 [&>h2]:mt-5 [&>h2]:mb-2
            [&>h3]:text-sm [&>h3]:font-bold [&>h3]:text-slate-800 [&>h3]:mt-4 [&>h3]:mb-1.5
            [&>p]:text-slate-700 [&>p]:mb-3 [&>p]:leading-relaxed
            [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1.5 [&>ul]:mb-3 [&>ul]:text-slate-700
            [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1.5 [&>ol]:mb-3 [&>ol]:text-slate-700
            [&>table]:w-full [&>table]:border-collapse [&>table]:my-4 [&>table]:text-xs
            [&>table_th]:border [&>table_th]:border-slate-300 [&>table_th]:p-2.5 [&>table_th]:bg-slate-50 [&>table_th]:font-bold [&>table_th]:text-slate-900 [&>table_th]:text-left
            [&>table_td]:border [&>table_td]:border-slate-200 [&>table_td]:p-2.5 [&>table_td]:text-slate-700
            [&>blockquote]:border-l-4 [&>blockquote]:border-indigo-500 [&>blockquote]:pl-3.5 [&>blockquote]:italic [&>blockquote]:text-slate-600 [&>blockquote]:my-3
            [&>hr]:border-slate-200 [&>hr]:my-4"
          >
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

