import { MessageSquare, Users, Calendar, TrendingUp, Clock, Zap } from 'lucide-react';

const stats = [
  {
    icon: MessageSquare,
    label: 'Messages this month',
    value: '0',
    change: 'Start conversations to see data',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    icon: Users,
    label: 'Total contacts',
    value: '0',
    change: 'Patients will appear here',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
  {
    icon: Calendar,
    label: 'Appointments',
    value: '0',
    change: 'No upcoming appointments',
    color: 'text-brand-green',
    bg: 'bg-brand-green/10',
  },
  {
    icon: TrendingUp,
    label: 'No-show prevented',
    value: '0%',
    change: 'AI reminders reduce no-shows',
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
  },
];

const quickActions = [
  { icon: MessageSquare, label: 'Start a conversation', desc: 'Test the AI chat' },
  { icon: Calendar, label: 'Schedule appointment', desc: 'Create a new booking' },
  { icon: Users, label: 'Add contact', desc: 'Import a patient' },
  { icon: Zap, label: 'Connect WhatsApp', desc: 'Go live with the bot' },
];

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-askan text-white">Overview</h1>
        <p className="text-white/40 text-sm mt-1">Welcome back. Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon size={18} className={stat.color} />
              </div>
            </div>
            <p className="text-3xl font-askan text-white">{stat.value}</p>
            <p className="text-white/60 text-xs mt-1">{stat.label}</p>
            <p className="text-white/20 text-[10px] mt-2">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-white text-sm font-medium mb-4">Quick actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-4 text-left transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <action.icon size={18} className="text-white/40 group-hover:text-white/70" />
              </div>
              <div>
                <p className="text-white text-xs font-medium">{action.label}</p>
                <p className="text-white/30 text-[10px]">{action.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Activity placeholder */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={14} className="text-white/30" />
          <h3 className="text-white text-sm font-medium">Recent activity</h3>
        </div>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
            <MessageSquare size={20} className="text-white/20" />
          </div>
          <p className="text-white/30 text-sm">No activity yet</p>
          <p className="text-white/15 text-xs mt-1">Conversations and appointments will appear here</p>
        </div>
      </div>
    </div>
  );
}
