import { useState } from 'react';
import ConversationList from '../components/chat/ConversationList';
import ChatWindow from '../components/chat/ChatWindow';

interface Conversation {
  id: string;
  contactId: string;
  status: string;
  contactName?: string;
  contactPhone?: string;
}

export default function ChatPage() {
  const [selected, setSelected] = useState<Conversation | undefined>();

  return (
    <div className="flex h-full -m-6 bg-[#0a0a0a]">
      <ConversationList onSelect={setSelected} selectedId={selected?.id} />
      <ChatWindow conversation={selected} />
    </div>
  );
}