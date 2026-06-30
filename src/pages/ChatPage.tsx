import ConversationList from '../components/chat/ConversationList';
import ChatWindow from '../components/chat/ChatWindow';

export default function ChatPage() {
  return (
    <div className="flex h-full -m-6 bg-[#0a0a0a]">
      <ConversationList />
      <ChatWindow />
    </div>
  );
}
