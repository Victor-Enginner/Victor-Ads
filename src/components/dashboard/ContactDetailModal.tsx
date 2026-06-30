import { X, Phone, Mail, Tag, Calendar, MessageSquare, Clock } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  channel: 'whatsapp' | 'web' | 'instagram' | 'telegram';
  tags: string[];
  lastContactAt: string;
  createdAt: string;
  totalMessages: number;
  totalAppointments: number;
}

interface ContactDetailModalProps {
  contact: Contact;
  onClose: () => void;
}

const mockHistory = [
  { id: '1', type: 'message', content: 'Olá, gostaria de agendar uma limpeza', time: '2 dias atrás', from: 'user' },
  { id: '2', type: 'message', content: 'Olá Maria! Temos disponibilidade esta semana.', time: '2 dias atrás', from: 'assistant' },
  { id: '3', type: 'message', content: 'Quinta-feira às 14h, por favor', time: '2 dias atrás', from: 'user' },
  { id: '4', type: 'appointment', content: 'Agendamento confirmado: Limpeza - Quinta 20/06 14:00', time: '2 dias atrás', from: 'system' },
  { id: '5', type: 'message', content: 'Perfeito! Enviamos confirmação por WhatsApp.', time: '2 dias atrás', from: 'assistant' },
  { id: '6', type: 'message', content: 'Lembrete: sua consulta é amanhã às 14:00', time: '1 dia atrás', from: 'system' },
  { id: '7', type: 'message', content: 'Confirmado, estarei lá!', time: '1 dia atrás', from: 'user' },
];

const channelColors: Record<string, string> = {
  whatsapp: 'bg-green-500/20 text-green-400',
  web: 'bg-blue-500/20 text-blue-400',
  instagram: 'bg-pink-500/20 text-pink-400',
  telegram: 'bg-sky-500/20 text-sky-400',
};

export default function ContactDetailModal({ contact, onClose }: ContactDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {contact.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </span>
            </div>
            <div>
              <h3 className="text-white text-sm font-medium">{contact.name}</h3>
              <div className="flex items-center gap-2">
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${channelColors[contact.channel]}`}>
                  {contact.channel}
                </span>
                <span className="text-white/20 text-[10px]">·</span>
                <span className="text-white/30 text-[10px]">Since {contact.createdAt}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-3 gap-4 p-5 border-b border-white/5">
            {/* Info card */}
            <div className="col-span-1 space-y-4">
              <div className="flex items-center gap-2 text-white/40">
                <Phone size={12} />
                <span className="text-xs">{contact.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-white/40">
                <Mail size={12} />
                <span className="text-xs">{contact.email || 'No email'}</span>
              </div>
              <div className="flex items-center gap-2 text-white/40">
                <MessageSquare size={12} />
                <span className="text-xs">{contact.totalMessages} messages</span>
              </div>
              <div className="flex items-center gap-2 text-white/40">
                <Calendar size={12} />
                <span className="text-xs">{contact.totalAppointments} appointments</span>
              </div>

              {/* Tags */}
              <div className="pt-2 border-t border-white/5">
                <div className="flex items-center gap-1.5 mb-2">
                  <Tag size={10} className="text-white/20" />
                  <span className="text-white/20 text-[10px]">Tags</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {contact.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* History */}
            <div className="col-span-2">
              <div className="flex items-center gap-1.5 mb-3">
                <Clock size={12} className="text-white/20" />
                <span className="text-white/20 text-[10px]">Recent Activity</span>
              </div>
              <div className="space-y-2">
                {mockHistory.map((item) => (
                  <div key={item.id} className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 mt-1.5 shrink-0" />
                    <div>
                      <p className={`text-xs ${item.from === 'system' ? 'text-white/30 italic' : 'text-white/60'}`}>
                        {item.content}
                      </p>
                      <span className="text-white/15 text-[9px]">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-white/5">
          <button className="text-red-400 text-xs hover:text-red-300 transition-colors">
            Delete contact
          </button>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-white/5 text-white/40 text-xs hover:bg-white/10 transition-colors">
              Send message
            </button>
            <button className="px-4 py-2 rounded-xl bg-white text-black text-xs font-medium hover:bg-white/90 transition-colors">
              Edit contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
