import { useState, useEffect } from 'react';
import { useAppointments } from '../hooks/useAppointments';
import { AppointmentsSkeleton } from '../components/Skeletons';
import { Plus, ChevronDown, Calendar, Clock, CheckCircle2, XCircle, CalendarClock, X } from 'lucide-react';

const statusStyles = {
  scheduled: { label: 'Scheduled', cls: 'bg-yellow-500/15 text-yellow-400' },
  confirmed: { label: 'Confirmed', cls: 'bg-green-500/15 text-green-400' },
  completed: { label: 'Completed', cls: 'bg-blue-500/15 text-blue-400' },
  cancelled: { label: 'Cancelled', cls: 'bg-red-500/15 text-red-400' },
  no_show: { label: 'No-show', cls: 'bg-white/10 text-white/40' },
};

type FilterStatus = 'all' | string;

export default function AppointmentsPage() {
  const { appointments, loading, fetchAppointments, cancelAppointment } = useAppointments();
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [showNewModal, setShowNewModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const filtered = appointments.filter((a) => filterStatus === 'all' || a.status === filterStatus);

  const stats = [
    { icon: CalendarClock, label: 'Upcoming', value: appointments.filter(a => a.status === 'scheduled' || a.status === 'confirmed').length, color: 'text-green-400', bg: 'bg-green-400/10' },
    { icon: CheckCircle2, label: 'Completed', value: appointments.filter(a => a.status === 'completed').length, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { icon: Clock, label: 'Scheduled', value: appointments.filter(a => a.status === 'scheduled').length, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { icon: XCircle, label: 'Cancelled / No-show', value: appointments.filter(a => a.status === 'cancelled' || a.status === 'no_show').length, color: 'text-red-400', bg: 'bg-red-400/10' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-askan text-white">Appointments</h1>
          <p className="text-white/40 text-sm mt-1">{appointments.length} total appointments</p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-medium rounded-xl hover:bg-white/90 transition-colors"
        >
          <Plus size={14} />
          New appointment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white/5 border border-white/5 rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-4`}>
              <s.icon size={18} className={s.color} />
            </div>
            <p className="text-3xl font-askan text-white">{s.value}</p>
            <p className="text-white/60 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex justify-end">
        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-white/50 text-xs hover:bg-white/10 transition-colors"
          >
            {filterStatus === 'all' ? 'All statuses' : statusStyles[filterStatus as keyof typeof statusStyles]?.label}
            <ChevronDown size={12} />
          </button>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <AppointmentsSkeleton />
      ) : (
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/5 text-white/30 text-[10px] uppercase tracking-wider">
            <div className="col-span-4">Patient</div>
            <div className="col-span-3">Service</div>
            <div className="col-span-3">When</div>
            <div className="col-span-2 text-right">Status</div>
          </div>

          {filtered.map((appt) => (
            <div
              key={appt.id}
              className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors items-center"
            >
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <span className="text-white text-[10px] font-medium">
                    {appt.contactName?.split(' ').map(n => n[0]).join('').substring(0, 2) || '??'}
                  </span>
                </div>
                <p className="text-white text-xs font-medium truncate">{appt.contactName || 'Unknown'}</p>
              </div>
              <div className="col-span-3">
                <p className="text-white/60 text-xs truncate">{appt.service}</p>
                <p className="text-white/25 text-[10px]">{appt.durationMinutes} min</p>
              </div>
              <div className="col-span-3 flex items-center gap-1.5">
                <Calendar size={11} className="text-white/20" />
                <span className="text-white/50 text-xs">{appt.date}</span>
                <span className="text-white/25 text-xs">· {appt.time}</span>
              </div>
              <div className="col-span-2 flex justify-end">
                <span className={`text-[10px] px-2.5 py-1 rounded-full ${statusStyles[appt.status as keyof typeof statusStyles]?.cls || 'bg-white/10 text-white/40'}`}>
                  {statusStyles[appt.status as keyof typeof statusStyles]?.label || appt.status}
                </span>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                <Calendar size={20} className="text-white/20" />
              </div>
              <p className="text-white/30 text-sm">No appointments found</p>
              <p className="text-white/15 text-xs mt-1">Try a different status filter</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}