import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';
import { useToastStore } from '../stores/toastStore';

interface Subscription {
  id: string;
  plan: string;
  status: string;
  messageLimit: number;
  messagesUsed: number;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  createdAt: string;
}

export function useSubscriptions(tenantId?: string) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToastStore();

  const fetchSubscription = useCallback(async () => {
    if (!tenantId) return;
    setLoading(true);
    try {
      const data = await api.get<Subscription>('/api/subscriptions');
      setSubscription(data);
    } catch (error) {
      // Se não encontrado, não é erro crítico (pode não ter subscription ainda)
    } finally {
      setLoading(false);
    }
  }, [tenantId, addToast]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  return {
    subscription,
    loading,
    fetchSubscription,
  };
}