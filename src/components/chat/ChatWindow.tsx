import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import ChatInput from './ChatInput';
import { Phone, Video, MoreVertical, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  time: string;
  model?: string;
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'system',
    content: 'Conversation started',
    time: '09:00',
  },
  {
    id: '2',
    role: 'user',
    content: 'Olá, gostaria de agendar uma limpeza dental',
    time: '09:01',
  },
  {
    id: '3',
    role: 'assistant',
    content: 'Olá Maria! Fico feliz com seu interesse. Temos disponibilidade esta semana. Prefere manhã ou tarde?',
    time: '09:01',
    model: 'gpt-4o-mini',
  },
  {
    id: '4',
    role: 'user',
    content: 'Tarde, por favor. Quinta ou sexta.',
    time: '09:02',
  },
  {
    id: '5',
    role: 'assistant',
    content: 'Perfeito! Temos disponibilidade:\n\n📅 Quinta (20/06) às 14:00\n📅 Sexta (21/06) às 15:30\n\nQual prefere? Vou precisar do seu nome completo e telefone para confirmar.',
    time: '09:02',
    model: 'gpt-4o-mini',
  },
];

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function handleSend(content: string) {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getSimulatedResponse(content),
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        model: 'gpt-4o-mini',
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  }

  return (
    <div className="flex-1 flex flex-col bg-[#0a0a0a]">
      {/* Header */}
      <div className="h-16 border-b border-white/5 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-white text-xs font-medium">MS</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#0a0a0a]" />
          </div>
          <div>
            <p className="text-white text-sm font-medium">Maria Silva</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span className="text-white/30 text-[10px]">Online · WhatsApp</span>
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
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              role={msg.role}
              content={msg.content}
              time={msg.time}
              model={msg.model}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="max-w-3xl mx-auto w-full">
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
}

function getSimulatedResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes('agendar') || lower.includes('consulta') || lower.includes('horário')) {
    return 'Claro! Temos disponibilidade esta semana. Qual dia e horário funcionam melhor para você?';
  }

  if (lower.includes('valor') || lower.includes('preço') || lower.includes('quanto')) {
    return 'Nossos valores variam por serviço. Posso enviar nossa tabela completa. Qual procedimento te interessa?';
  }

  if (lower.includes('obrigad') || lower.includes('valeu')) {
    return 'De nada! Se precisar de algo mais, é só chamar. Estou sempre disponível! 😊';
  }

  return 'Entendi! Deixa eu verificar isso para você. Um momento, por favor.';
}
