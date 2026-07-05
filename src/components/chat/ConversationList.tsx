import { useState } from 'react';
import { Search, Plus, MessageCircle } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { ChatSkeleton } from '../Skeletons';

interface Conversation {
  id: string;
  contactId: string;
  status: string;
  intent?: string;
  assignedTo?: string;
  startedAt: string;
  endedAt?: string;
  contactName?: string;
  contactPhone?: string;
  messageCount?: number;
}

const channelColors: Record<string, string> = {
  whatsapp: 'bg-green-500/20 text-green-400',
  web: 'bg-blue-500/20 text-blue-400',
  instagram: 'bg-pink-500/20 text-pink-400',
};

export default function ConversationList({
  onSelect,
  selectedId,
}: {
  onSelect: (conv: Conversation) => void;
  selectedId?: string;
}) {
  const { conversations, loading, fetchConversations } = useChat();
  const [search, setSearch] = useState('');

  const filtered = conversations.filter((c) =>
    c.contactName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-80 border-r border-white/5 flex flex-col bg-[#0d0d0d]">
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-sm font-medium">Conversations</h3>
          <button
            onClick={fetchConversations}
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-xl pl-9 pr-3 py-2 text-white text-xs placeholder:text-white/20 outline-none focus:border-white/15 transition-colors"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <ChatSkeleton />
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-white/30 text-sm">
            No conversations yet
          </div>
        ) : (
          filtered.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelect(conv as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 text-left ${
                selectedId === conv.id ? 'bg-white/10' : ''
              }`}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {conv.contactName
                      ?.split(' ')
                      .map((n) => n[0])
                      .join('')
                      .substring(0, 2) || '?'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-xs font-medium truncate">
                    {conv.contactName || 'Unknown'}
                  </span>
                  <span className="text-white/20 text-[10px] shrink-0 ml-2">
                    {new Date(conv.startedAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-white/40 text-[11px] truncate">
                    {conv.status === 'active'
                      ? 'Active conversation'
                      : `Status: ${conv.status}`}
                  </p>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                      channelColors[conv.contactPhone ? 'whatsapp' : 'web']
                    }`}
                  >
                    {conv.contactPhone ? 'W' : 'W'}
                  </span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}