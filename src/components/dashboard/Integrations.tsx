import { CheckCircle, XCircle, ExternalLink, MessageSquare, Calendar, Bot } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: typeof MessageSquare;
  connected: boolean;
  status: string;
}

const integrations: Integration[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    description: 'Receive and send messages via WhatsApp Cloud API',
    icon: MessageSquare,
    connected: false,
    status: 'Not connected',
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Sync appointments with your Google Calendar',
    icon: Calendar,
    connected: false,
    status: 'Not connected',
  },
  {
    id: 'openrouter',
    name: 'OpenRouter AI',
    description: 'Power your chatbot with GPT-4o-mini or other models',
    icon: Bot,
    connected: true,
    status: 'Connected',
  },
];

export default function Integrations() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <h4 className="text-white text-sm font-medium">Integrations</h4>
      </div>

      <div className="space-y-3">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="flex items-center gap-4 bg-white/5 rounded-xl p-4"
          >
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <integration.icon size={18} className="text-white/60" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-white text-xs font-medium">{integration.name}</p>
                {integration.connected ? (
                  <CheckCircle size={12} className="text-green-400" />
                ) : (
                  <XCircle size={12} className="text-white/20" />
                )}
              </div>
              <p className="text-white/30 text-[10px] mt-0.5">{integration.description}</p>
            </div>

            {/* Status / Action */}
            <div className="shrink-0">
              {integration.connected ? (
                <span className="text-green-400 text-[10px] bg-green-400/10 px-2 py-1 rounded-full">
                  Active
                </span>
              ) : (
                <button className="flex items-center gap-1 text-[10px] text-white/50 hover:text-white/80 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors">
                  Connect
                  <ExternalLink size={10} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Help text */}
      <p className="text-white/15 text-[10px] mt-4">
        Connect WhatsApp to start receiving messages from your patients automatically.
      </p>
    </div>
  );
}
