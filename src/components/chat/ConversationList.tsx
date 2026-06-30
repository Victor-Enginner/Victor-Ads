import { Search, Plus } from 'lucide-react';

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  channel: 'whatsapp' | 'web' | 'instagram';
  online: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Maria Silva',
    lastMessage: 'Olá, gostaria de agendar uma limpeza',
    time: '2min',
    unread: 2,
    channel: 'whatsapp',
    online: true,
  },
  {
    id: '2',
    name: 'João Santos',
    lastMessage: 'Qual o valor do clareamento?',
    time: '15min',
    unread: 0,
    channel: 'whatsapp',
    online: false,
  },
  {
    id: '3',
    name: 'Ana Costa',
    lastMessage: 'Obrigada pela informação!',
    time: '1h',
    unread: 0,
    channel: 'web',
    online: true,
  },
  {
    id: '4',
    name: 'Pedro Lima',
    lastMessage: 'Preciso remarcar minha consulta',
    time: '3h',
    unread: 1,
    channel: 'whatsapp',
    online: false,
  },
  {
    id: '5',
    name: 'Carla Souza',
    lastMessage: 'Vocês atendem sábado?',
    time: '5h',
    unread: 0,
    channel: 'instagram',
    online: false,
  },
];

const channelColors: Record<string, string> = {
  whatsapp: 'bg-green-500/20 text-green-400',
  web: 'bg-blue-500/20 text-blue-400',
  instagram: 'bg-pink-500/20 text-pink-400',
};

const channelIcons: Record<string, string> = {
  whatsapp: 'W',
  web: 'W',
  instagram: 'I',
};

export default function ConversationList() {
  return (
    <div className="w-80 border-r border-white/5 flex flex-col bg-[#0d0d0d]">
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-sm font-medium">Conversations</h3>
          <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors">
            <Plus size={14} />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full bg-white/5 border border-white/5 rounded-xl pl-9 pr-3 py-2 text-white text-xs placeholder:text-white/20 outline-none focus:border-white/15 transition-colors"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-auto">
        {mockConversations.map((conv) => (
          <button
            key={conv.id}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 text-left"
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {conv.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </span>
              </div>
              {conv.online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0d0d0d]" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white text-xs font-medium truncate">{conv.name}</span>
                <span className="text-white/20 text-[10px] shrink-0 ml-2">{conv.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-white/40 text-[11px] truncate">{conv.lastMessage}</p>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${channelColors[conv.channel]}`}>
                    {channelIcons[conv.channel]}
                  </span>
                  {conv.unread > 0 && (
                    <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[9px] text-white font-medium">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
