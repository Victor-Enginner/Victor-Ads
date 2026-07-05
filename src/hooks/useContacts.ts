import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';
import { useToastStore } from '../stores/toastStore';

interface Contact {
  id: string;
  externalId: string;
  channel: string;
  name?: string;
  phone?: string;
  profile: Record<string, any>;
  tags: string[];
  lastContactAt?: string;
  createdAt: string;
}

export function useContacts(tenantId?: string) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToastStore();

  const fetchContacts = useCallback(async () => {
    if (!tenantId) return;
    setLoading(true);
    try {
      const data = await api.get<Contact[]>('/api/contacts');
      setContacts(data);
    } catch (error) {
      addToast({ type: 'error', message: 'Failed to load contacts' });
    } finally {
      setLoading(false);
    }
  }, [tenantId, addToast]);

  const createContact = useCallback(async (data: {
    externalId: string;
    channel?: string;
    name?: string;
    phone?: string;
    tags?: string[];
  }) => {
    try {
      const contact = await api.post<Contact>('/api/contacts', data);
      setContacts((prev) => [contact, ...prev]);
      addToast({ type: 'success', message: 'Contact created' });
      return contact;
    } catch (error) {
      addToast({ type: 'error', message: 'Failed to create contact' });
      throw error;
    }
  }, [addToast]);

  const updateContact = useCallback(async (id: string, data: {
    name?: string;
    phone?: string;
    tags?: string[];
  }) => {
    try {
      const contact = await api.patch<Contact>(`/api/contacts/${id}`, data);
      setContacts((prev) => prev.map(c => c.id === id ? contact : c));
      addToast({ type: 'success', message: 'Contact updated' });
      return contact;
    } catch (error) {
      addToast({ type: 'error', message: 'Failed to update contact' });
      throw error;
    }
  }, [addToast]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return {
    contacts,
    loading,
    fetchContacts,
    createContact,
    updateContact,
  };
}