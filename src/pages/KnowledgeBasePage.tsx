import { useState } from 'react';
import { Upload, FileText, File, Trash2, CheckCircle2, Loader2, AlertCircle, Search } from 'lucide-react';

interface Doc {
  id: string;
  name: string;
  type: 'pdf' | 'txt' | 'docx';
  size: string;
  chunks: number;
  status: 'ready' | 'processing' | 'error';
  uploadedAt: string;
}

const mockDocs: Doc[] = [
  { id: '1', name: 'Clinic FAQ.pdf', type: 'pdf', size: '240 KB', chunks: 48, status: 'ready', uploadedAt: 'Jun 18, 2026' },
  { id: '2', name: 'Services & Pricing.docx', type: 'docx', size: '88 KB', chunks: 22, status: 'ready', uploadedAt: 'Jun 17, 2026' },
  { id: '3', name: 'Cancellation Policy.txt', type: 'txt', size: '12 KB', chunks: 6, status: 'ready', uploadedAt: 'Jun 15, 2026' },
  { id: '4', name: 'Therapist Bios.pdf', type: 'pdf', size: '1.2 MB', chunks: 0, status: 'processing', uploadedAt: 'Just now' },
  { id: '5', name: 'Old Intake Form.pdf', type: 'pdf', size: '3.4 MB', chunks: 0, status: 'error', uploadedAt: 'Jun 14, 2026' },
];

const statusMap = {
  ready: { label: 'Indexed', icon: CheckCircle2, cls: 'text-brand-green' },
  processing: { label: 'Processing', icon: Loader2, cls: 'text-yellow-400' },
  error: { label: 'Failed', icon: AlertCircle, cls: 'text-red-400' },
};

const typeIcon = { pdf: FileText, docx: File, txt: File };

export default function KnowledgeBasePage() {
  const [search, setSearch] = useState('');
  const filtered = mockDocs.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));
  const totalChunks = mockDocs.reduce((acc, d) => acc + d.chunks, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-askan text-white">Knowledge Base</h1>
        <p className="text-white/40 text-sm mt-1">
          {mockDocs.length} documents · {totalChunks} chunks powering your AI
        </p>
      </div>

      {/* Upload zone */}
      <label className="block group cursor-pointer">
        <input type="file" className="hidden" />
        <div className="border-2 border-dashed border-white/10 group-hover:border-brand-green/40 rounded-2xl py-12 flex flex-col items-center justify-center transition-colors bg-white/[0.02]">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-brand-green/10 transition-colors">
            <Upload size={20} className="text-white/40 group-hover:text-brand-green transition-colors" />
          </div>
          <p className="text-white text-sm font-medium">Drop files or click to upload</p>
          <p className="text-white/30 text-xs mt-1">PDF, DOCX or TXT · up to 10 MB each</p>
        </div>
      </label>

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search documents..."
          className="w-full bg-white/5 border border-white/5 rounded-xl pl-9 pr-3 py-2.5 text-white text-sm placeholder:text-white/20 outline-none focus:border-white/15 transition-colors"
        />
      </div>

      {/* Docs list */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
        {filtered.map((doc) => {
          const Icon = typeIcon[doc.type];
          const st = statusMap[doc.status];
          return (
            <div
              key={doc.id}
              className="flex items-center gap-4 px-5 py-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
            >
              <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-white/40" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate">{doc.name}</p>
                <p className="text-white/30 text-[10px]">
                  {doc.size} · {doc.status === 'ready' ? `${doc.chunks} chunks` : doc.uploadedAt}
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <st.icon size={13} className={`${st.cls} ${doc.status === 'processing' ? 'animate-spin' : ''}`} />
                <span className={`text-[11px] ${st.cls}`}>{st.label}</span>
              </div>
              <button className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                <Trash2 size={13} />
              </button>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
              <FileText size={20} className="text-white/20" />
            </div>
            <p className="text-white/30 text-sm">No documents found</p>
            <p className="text-white/15 text-xs mt-1">Upload files to train your AI assistant</p>
          </div>
        )}
      </div>
    </div>
  );
}
