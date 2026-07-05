import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';
import { useToastStore } from '../stores/toastStore';

interface Document {
  id: string;
  title: string;
  content: string;
  sourceType: string;
  sourceUrl?: string;
  chunkCount: number;
  lastIndexedAt?: string;
  createdAt: string;
}

export function useDocuments(tenantId?: string) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToastStore();

  const fetchDocuments = useCallback(async () => {
    if (!tenantId) return;
    setLoading(true);
    try {
      const data = await api.get<Document[]>('/api/documents');
      setDocuments(data);
    } catch (error) {
      addToast({ type: 'error', message: 'Failed to load documents' });
    } finally {
      setLoading(false);
    }
  }, [tenantId, addToast]);

  const uploadDocument = useCallback(async (data: {
    title: string;
    content: string;
    sourceType?: string;
    sourceUrl?: string;
  }) => {
    try {
      const document = await api.post<Document>('/api/documents', data);
      setDocuments((prev) => [document, ...prev]);
      addToast({ type: 'success', message: 'Document uploaded' });
      return document;
    } catch (error) {
      addToast({ type: 'error', message: 'Failed to upload document' });
      throw error;
    }
  }, [addToast]);

  const deleteDocument = useCallback(async (id: string) => {
    try {
      await api.delete(`/api/documents/${id}`);
      setDocuments((prev) => prev.filter(d => d.id !== id));
      addToast({ type: 'success', message: 'Document deleted' });
    } catch (error) {
      addToast({ type: 'error', message: 'Failed to delete document' });
      throw error;
    }
  }, [addToast]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return {
    documents,
    loading,
    fetchDocuments,
    uploadDocument,
    deleteDocument,
  };
}