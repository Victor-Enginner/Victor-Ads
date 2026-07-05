import { useDashboard } from '../hooks/useDashboard';
import { MessageSquare, Users, Calendar, TrendingUp, Clock, Zap, RefreshCw } from 'lucide-react';

export default function DashboardPage() {
  const { stats, loading, fetchStats } = useDashboard();

  const statCards = [
    { key: 'totalMessages', label: 'Messages', icon: MessageSquare, color: 'text-blue-400', bg: 'bg-blue-400/10', value: stats?.totalMessages ?? 0 },
    { key: 'totalContacts', label: 'Contacts', icon: Users, color: 'text-purple-400', bg: 'bg-purple-400/10', value: stats?.totalContacts ?? 0 },
    { key: 'totalAppointments', label: 'Appointments', icon: Calendar, color: 'text-brand-green', bg: 'bg-brand-green/10', value: stats?.totalAppointments ?? 0 },
    { key: 'appointmentsPending', label: 'Pending', icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10', value: stats?.appointmentsPending ?? 0 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-askan text-white">Overview</h1>
          <p className="text-white/40 text-sm mt-1">Welcome back. Here's what's happening.</p>
        </div>
        <button
          onClick={fetchStats}
          className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/5 rounded-lg text-white/50 text-xs hover:bg-white/10 transition-colors"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div
            key={stat.key}
            className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon size={18} className={stat.color} />
              </div>
            </div>
            <p className="text-3xl font-askan text-white">
              {loading ? '-' : stat.value}
            </p>
            <p className="text-white/60 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions + Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <h3 className="text-white text-sm font-medium mb-4">Recent activity</h3>
          {!stats && !loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                <MessageSquare size={20} className="text-white/20" />
              </div>
              <p className="text-white/30 text-sm">No activity yet</p>
              <p className="text-white/15 text-xs mt-1">Conversations and appointments will appear here</p>
            </div>
          ) : (
            <p className="text-white/30 text-sm">Activity feed will be implemented in Sprint 5.</p>
          )}
        </div>
      </div>
    </div>
  );
}