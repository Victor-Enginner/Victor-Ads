import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import ChatInput from './ChatInput';
import { Phone, Video, MoreVertical, Bot, User } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { ChatSkeleton } from '../Skeletons';

interface Conversation {
  id: string;
  contactId: string;
  status: string;
  contactName?: string;
  contactPhone?: string;
}

export default function ChatWindow({
  conversation,
}: {
  conversation?: Conversation;
}) {
  const { messages, loading, sending, sendMessage, sendAIRequest } = useChat();
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Carrega mensagens quando a conversa muda
  useEffect(() => {
    if (conversation?.id) {
      // fetchMessages será chamado pelo hook quando a conversa for setada
    }
  }, [conversation?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  async function handleSend(content: string) {
    if (!conversation?.id || sending) return;

    // Envia mensagem do usuário
    await sendMessage(conversation.id, content);

    // Simula AI thinking
    setIsTyping(true);

    try {
      const response = await sendAIRequest(content, conversation.id);
      // A mensagem da AI já foi adicionada pelo hook quando salvamos a mensagem
      // Aqui apenas removemos o typing indicator
    } catch {
      // Erro já tratado no hook
    } finally {
      setIsTyping(false);
    }
  }

  const contactName = conversation?.contactName || 'Conversation';
  const contactPhone = conversation?.contactPhone;

  return (
    <div className="flex-1 flex flex-col bg-[#0a0a0a]">
      {/* Header */}
      <div className="h-16 border-b border-white/5 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-white text-xs font-medium">
                {contactName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .substring(0, 2)}
              </span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#0a0a0a]" />
          </div>
          <div>
            <p className="text-white text-sm font-medium">{contactName}</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span className="text-white/30 text-[10px]">
                Online · {contactPhone ? 'WhatsApp' : 'Web'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors">
            <Bot size={16} />
          </button>
          <button className="p-2 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors">
            <User size={16} />
          </button>
          <button className="p-2 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors">
            <Phone size={16} />
          </button>
          <button className="p-2 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors">
            <Video size={16} />
          </button>
          <button className="p-2 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto px-4 py-4">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <ChatSkeleton />
          ) : (
            <>
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  role={msg.role}
                  content={msg.content}
                  time={new Date(msg.createdAt).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  model={msg.model}
                />
              ))}
              {isTyping && <TypingIndicator />}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="max-w-3xl mx-auto w-full">
        <ChatInput onSend={handleSend} disabled={sending || isTyping} />
      </div>
    </div>
  );
}