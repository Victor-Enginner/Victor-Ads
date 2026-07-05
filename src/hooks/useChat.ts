import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';
import { useToastStore } from '../stores/toastStore';

interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  toolCalls?: any;
  tokenCount: number;
  model?: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  contactId: string;
  status: string;
  intent?: string;
  assignedTo?: string;
  startedAt: string;
  endedAt?: string;
  contactName?: string;
  contactPhone?: string;
  messageCount?: number;
}

export function useChat(tenantId?: string) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const { addToast } = useToastStore();

  const fetchConversations = useCallback(async () => {
    if (!tenantId) return;
    setLoading(true);
    try {
      const data = await api.get<Conversation[]>('/api/chat/conversations');
      setConversations(data);
    } catch (error) {
      addToast({ type: 'error', message: 'Failed to load conversations' });
    } finally {
      setLoading(false);
    }
  }, [tenantId, addToast]);

  const fetchMessages = useCallback(async (conversationId: string) => {
    setLoading(true);
    try {
      const data = await api.get<Message[]>(`/api/messages/conversation/${conversationId}`);
      setMessages(data);
    } catch (error) {
      addToast({ type: 'error', message: 'Failed to load messages' });
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  const sendMessage = useCallback(async (conversationId: string, content: string) => {
    if (!content.trim()) return;
    setSending(true);
    try {
      const message = await api.post<Message>('/api/messages', {
        conversationId,
        content,
        role: 'user',
      });
      setMessages((prev) => [...prev, message]);
      return message;
    } catch (error) {
      addToast({ type: 'error', message: 'Failed to send message' });
      throw error;
    } finally {
      setSending(false);
    }
  }, [addToast]);

  const sendAIRequest = useCallback(async (message: string, conversationId?: string) => {
    setSending(true);
    try {
      const response = await api.post<{ content: string }>('/api/chat', {
        message,
        conversationId,
      });
      return response;
    } catch (error) {
      addToast({ type: 'error', message: 'Failed to get AI response' });
      throw error;
    } finally {
      setSending(false);
    }
  }, [addToast]);

  const createConversation = useCallback(async (data: {
    contactId: string;
    intent?: string;
    assignedTo?: string;
  }) => {
    try {
      const conversation = await api.post<Conversation>('/api/conversations', data);
      setConversations((prev) => [conversation, ...prev]);
      addToast({ type: 'success', message: 'Conversation started' });
      return conversation;
    } catch (error) {
      addToast({ type: 'error', message: 'Failed to create conversation' });
      throw error;
    }
  }, [addToast]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return {
    conversations,
    messages,
    loading,
    sending,
    fetchConversations,
    fetchMessages,
    sendMessage,
    sendAIRequest,
    createConversation,
  };
}