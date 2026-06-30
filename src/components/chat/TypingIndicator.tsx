export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div className="flex flex-col items-start max-w-[75%]">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-white text-[8px] font-medium">A</span>
          </div>
          <span className="text-white/30 text-[10px]">Assistant is typing</span>
        </div>
        <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-md">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
