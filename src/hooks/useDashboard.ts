import { useState, useEffect } from 'react';
import { api } from '../lib/api';

interface DashboardStats {
  totalMessages: number;
  totalContacts: number;
  totalAppointments: number;
  appointmentsToday: number;
  appointmentsThisWeek: number;
  appointmentsPending: number;
}

export function useDashboard(tenantId?: string) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    if (!tenantId) return;
    setLoading(true);
    try {
      const [contacts, appointments, conversations] = await Promise.all([
        api.get<any[]>('/api/contacts'),
        api.get<any[]>('/api/appointments'),
        api.get<any[]>('/api/conversations'),
      ]);

      const today = new Date().toISOString().split('T')[0];
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - 7);
      const weekStartStr = weekStart.toISOString().split('T')[0];

      setStats({
        totalMessages: 0,
        totalContacts: contacts.length,
        totalAppointments: appointments.length,
        appointmentsToday: appointments.filter((a: any) => a.date === today).length,
        appointmentsThisWeek: appointments.filter((a: any) => a.date >= weekStartStr).length,
        appointmentsPending: appointments.filter((a: any) => a.status === 'scheduled' || a.status === 'confirmed').length,
      });
    } catch (error) {
      console.error('Failed to load dashboard stats', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [tenantId]);

  return { stats, loading, fetchStats };
}
