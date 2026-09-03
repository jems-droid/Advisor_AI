import React, { useState } from 'react';
import { Send, Check, Copy, MessageSquare, Mail, Share2 } from 'lucide-react';

interface FollowUpDraftSectionProps {
  drafts: {
    whatsappFormat: string;
    emailFormat: string;
  };
  clientName: string;
}

export const FollowUpDraftSection: React.FC<FollowUpDraftSectionProps> = ({
  drafts,
  clientName,
}) => {
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'email'>('whatsapp');
  const [copied, setCopied] = useState(false);

  const activeContent = activeTab === 'whatsapp' ? drafts.whatsappFormat : drafts.emailFormat;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(drafts.whatsappFormat);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
            <Send className="w-4 h-4 text-indigo-600" />
            Client Follow-Up Communication
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Polite, reassuring client-ready communication drafted for {clientName || 'the client'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Format Selector Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              id="tab-whatsapp"
              onClick={() => setActiveTab('whatsapp')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'whatsapp'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Format</span>
            </button>
            <button
              type="button"
              id="tab-email"
              onClick={() => setActiveTab('email')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'email'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-indigo-600" />
              <span>Email Format</span>
            </button>
          </div>

          {/* Quick Copy Button */}
          <button
            type="button"
            id="btn-copy-draft"
            onClick={handleCopy}
            className="text-xs bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 cursor-pointer shadow-xs transition-colors shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy {activeTab === 'whatsapp' ? 'Message' : 'Email'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Message Preview Container */}
      <div className="space-y-3">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 relative">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <span>
              {activeTab === 'whatsapp' ? '📱 WhatsApp Chat Draft' : '✉️ Email Draft'}
            </span>
            <span className="text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200 font-medium normal-case">
              Recipient: {clientName || 'Client'}
            </span>
          </div>
          <div className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed font-serif italic selection:bg-indigo-100">
            {activeContent}
          </div>
        </div>

        {activeTab === 'whatsapp' && (
          <div className="flex justify-end pt-1">
            <button
              type="button"
              id="btn-open-whatsapp"
              onClick={handleOpenWhatsApp}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct Share via WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

