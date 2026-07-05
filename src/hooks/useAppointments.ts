import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';
import { useToastStore } from '../stores/toastStore';

interface Appointment {
  id: string;
  contactId: string;
  service: string;
  date: string;
  time: string;
  durationMinutes: number;
  status: string;
  googleEventId?: string;
  reminderSent: boolean;
  notes?: string;
  createdAt: string;
  contactName?: string;
  contactPhone?: string;
}

export function useAppointments(tenantId?: string) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToastStore();

  const fetchAppointments = useCallback(async (filters?: { date?: string; status?: string; contactId?: string }) => {
    if (!tenantId) return;
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters?.date) params.set('date', filters.date);
      if (filters?.status) params.set('status', filters.status);
      if (filters?.contactId) params.set('contactId', filters.contactId);
      
      const query = params.toString() ? `?${params.toString()}` : '';
      const data = await api.get<Appointment[]>(`/api/appointments${query}`);
      setAppointments(data);
    } catch (error) {
      addToast({ type: 'error', message: 'Failed to load appointments' });
    } finally {
      setLoading(false);
    }
  }, [tenantId, addToast]);

  const createAppointment = useCallback(async (data: {
    contactId: string;
    service: string;
    date: string;
    time: string;
    durationMinutes?: number;
    notes?: string;
  }) => {
    try {
      const appointment = await api.post<Appointment>('/api/appointments', data);
      setAppointments((prev) => [appointment, ...prev]);
      addToast({ type: 'success', message: 'Appointment scheduled' });
      return appointment;
    } catch (error) {
      addToast({ type: 'error', message: 'Failed to schedule appointment' });
      throw error;
    }
  }, [addToast]);

  const updateAppointment = useCallback(async (id: string, data: {
    service?: string;
    date?: string;
    time?: string;
    durationMinutes?: number;
    status?: string;
    notes?: string;
    reminderSent?: boolean;
  }) => {
    try {
      const appointment = await api.patch<Appointment>(`/api/appointments/${id}`, data);
      setAppointments((prev) => prev.map(a => a.id === id ? appointment : a));
      addToast({ type: 'success', message: 'Appointment updated' });
      return appointment;
    } catch (error) {
      addToast({ type: 'error', message: 'Failed to update appointment' });
      throw error;
    }
  }, [addToast]);

  const cancelAppointment = useCallback(async (id: string) => {
    try {
      await api.delete(`/api/appointments/${id}`);
      setAppointments((prev) => prev.filter(a => a.id !== id));
      addToast({ type: 'success', message: 'Appointment cancelled' });
    } catch (error) {
      addToast({ type: 'error', message: 'Failed to cancel appointment' });
      throw error;
    }
  }, [addToast]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    appointments,
    loading,
    fetchAppointments,
    createAppointment,
    updateAppointment,
    cancelAppointment,
  };
}