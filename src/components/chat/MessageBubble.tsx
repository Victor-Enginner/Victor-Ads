interface MessageBubbleProps {
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  time: string;
  model?: string;
}

export default function MessageBubble({ role, content, time, model }: MessageBubbleProps) {
  if (role === 'system') {
    return (
      <div className="flex justify-center py-2">
        <span className="text-white/20 text-[10px] bg-white/5 px-3 py-1 rounded-full">
          {content}
        </span>
      </div>
    );
  }

  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[75%]`}>
        {/* Avatar + name for assistant */}
        {!isUser && (
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-white text-[8px] font-medium">A</span>
            </div>
            <span className="text-white/30 text-[10px]">Assistant</span>
            {model && (
              <span className="text-white/15 text-[9px] bg-white/5 px-1.5 py-0.5 rounded-full">
                {model}
              </span>
            )}
          </div>
        )}

        {/* Bubble */}
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? 'bg-white text-black rounded-br-md'
              : 'bg-white/10 text-white/90 rounded-bl-md'
          }`}
        >
          {content}
        </div>

        {/* Time */}
        <span className="text-white/15 text-[9px] mt-1 px-1">{time}</span>
      </div>
    </div>
  );
}
