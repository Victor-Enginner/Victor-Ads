import { useState } from 'react';
import { useDocuments } from '../hooks/useDocuments';
import { DocumentsSkeleton } from '../components/Skeletons';
import { Plus, FileText, Trash2, Search, Upload, Globe } from 'lucide-react';

export default function KnowledgeBasePage() {
  const { documents, loading, uploadDocument, deleteDocument } = useDocuments();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    sourceType: 'manual',
    sourceUrl: '',
  });

  const filtered = documents.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase())
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await uploadDocument({
        title: formData.title,
        content: formData.content,
        sourceType: formData.sourceType,
        sourceUrl: formData.sourceUrl || undefined,
      });
      setFormData({ title: '', content: '', sourceType: 'manual', sourceUrl: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to upload document', error);
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-xl font-semibold">Knowledge Base</h1>
          <p className="text-white/40 text-sm mt-1">
            Upload documents to train your AI assistant
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-white/90 transition-colors"
        >
          <Plus size={16} />
          New Document
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Search documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-white/30 outline-none focus:border-white/20 transition-colors"
        />
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-white text-sm font-medium mb-4">New Document</h3>
          <div className="grid gap-3">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 outline-none focus:border-white/20"
              required
            />
            <textarea
              placeholder="Content (paste text, FAQ, manuals, etc.)"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 outline-none focus:border-white/20 h-32"
              required
            />
            <select
              value={formData.sourceType}
              onChange={(e) => setFormData({ ...formData, sourceType: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-white/20"
            >
              <option value="manual">Manual Entry</option>
              <option value="faq">FAQ</option>
              <option value="manual_file">Manual / PDF</option>
              <option value="website">Website URL</option>
            </select>
            {formData.sourceType === 'website' && (
              <input
                type="url"
                placeholder="https://example.com/page"
                value={formData.sourceUrl}
                onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 outline-none focus:border-white/20"
              />
            )}
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-white text-black py-2 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors"
              >
                Upload
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-white/10 text-white py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* List */}
      {loading ? (
        <DocumentsSkeleton />
      ) : (
        <div className="grid gap-3">
          {filtered.map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <FileText size={18} className="text-white/40" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-sm font-medium">{doc.title}</h3>
                    <p className="text-white/40 text-xs mt-1 line-clamp-2">
                      {doc.content.substring(0, 150)}...
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-white/30 text-[10px]">
                        <Globe size={10} />
                        {doc.sourceType}
                      </span>
                      {doc.chunkCount > 0 && (
                        <span className="text-white/30 text-[10px]">
                          {doc.chunkCount} chunks
                        </span>
                      )}
                      {doc.lastIndexedAt && (
                        <span className="text-white/30 text-[10px]">
                          Indexed {new Date(doc.lastIndexedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteDocument(doc.id)}
                  className="p-2 rounded-lg text-white/20 hover:text-red-400 hover:bg-white/5 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}