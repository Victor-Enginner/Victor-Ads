import { useState, useRef } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.target.value);
    // Auto-resize
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-white/5">
      <div className="flex items-end gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 focus-within:border-white/20 transition-colors">
        {/* Attachments */}
        <button
          type="button"
          className="p-1.5 text-white/20 hover:text-white/50 transition-colors shrink-0 mb-0.5"
        >
          <Paperclip size={16} />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={disabled}
          rows={1}
          className="flex-1 bg-transparent text-white text-sm placeholder:text-white/20 outline-none resize-none py-1.5 max-h-[120px] disabled:opacity-50"
        />

        {/* Emoji */}
        <button
          type="button"
          className="p-1.5 text-white/20 hover:text-white/50 transition-colors shrink-0 mb-0.5"
        >
          <Smile size={16} />
        </button>

        {/* Send */}
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="p-2 bg-white rounded-xl text-black hover:bg-white/90 transition-colors disabled:opacity-20 disabled:cursor-not-allowed shrink-0 mb-0.5"
        >
          <Send size={14} />
        </button>
      </div>

      {/* Hint */}
      <p className="text-white/10 text-[10px] mt-2 text-center">
        Press Enter to send · Shift+Enter for new line
      </p>
    </form>
  );
}
