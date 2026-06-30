import { useState } from 'react';
import { Plus, ChevronDown, Calendar, Clock, CheckCircle2, XCircle, CalendarClock, X } from 'lucide-react';

interface Appointment {
  id: string;
  contactName: string;
  service: string;
  date: string;
  time: string;
  durationMinutes: number;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
}

const mockAppointments: Appointment[] = [
  { id: '1', contactName: 'Maria Silva', service: 'Strategy Call', date: 'Jun 19, 2026', time: '09:00', durationMinutes: 50, status: 'confirmed' },
  { id: '2', contactName: 'João Santos', service: 'Automation Audit', date: 'Jun 19, 2026', time: '11:00', durationMinutes: 30, status: 'scheduled' },
  { id: '3', contactName: 'Ana Costa', service: 'Onboarding Session', date: 'Jun 19, 2026', time: '14:30', durationMinutes: 45, status: 'confirmed' },
  { id: '4', contactName: 'Pedro Lima', service: 'Strategy Call', date: 'Jun 20, 2026', time: '10:00', durationMinutes: 50, status: 'scheduled' },
  { id: '5', contactName: 'Carla Souza', service: 'Automation Audit', date: 'Jun 18, 2026', time: '16:00', durationMinutes: 30, status: 'completed' },
  { id: '6', contactName: 'Roberto Alves', service: 'Onboarding Session', date: 'Jun 18, 2026', time: '08:30', durationMinutes: 45, status: 'cancelled' },
  { id: '7', contactName: 'Fernanda Oliveira', service: 'Strategy Call', date: 'Jun 17, 2026', time: '13:00', durationMinutes: 50, status: 'no_show' },
];

const statusStyles: Record<Appointment['status'], { label: string; cls: string }> = {
  scheduled: { label: 'Scheduled', cls: 'bg-yellow-500/15 text-yellow-400' },
  confirmed: { label: 'Confirmed', cls: 'bg-brand-green/15 text-brand-green' },
  completed: { label: 'Completed', cls: 'bg-blue-500/15 text-blue-400' },
  cancelled: { label: 'Cancelled', cls: 'bg-red-500/15 text-red-400' },
  no_show: { label: 'No-show', cls: 'bg-white/10 text-white/40' },
};

type FilterStatus = 'all' | Appointment['status'];

export default function AppointmentsPage() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);

  const filtered = mockAppointments.filter((a) => filterStatus === 'all' || a.status === filterStatus);

  const stats = [
    { icon: CalendarClock, label: 'Upcoming', value: mockAppointments.filter(a => a.status === 'scheduled' || a.status === 'confirmed').length, color: 'text-brand-green', bg: 'bg-brand-green/10' },
    { icon: CheckCircle2, label: 'Completed', value: mockAppointments.filter(a => a.status === 'completed').length, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { icon: Clock, label: 'Scheduled', value: mockAppointments.filter(a => a.status === 'scheduled').length, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { icon: XCircle, label: 'Cancelled / No-show', value: mockAppointments.filter(a => a.status === 'cancelled' || a.status === 'no_show').length, color: 'text-red-400', bg: 'bg-red-400/10' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-askan text-white">Appointments</h1>
          <p className="text-white/40 text-sm mt-1">{mockAppointments.length} total appointments</p>
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
            {filterStatus === 'all' ? 'All statuses' : statusStyles[filterStatus].label}
            <ChevronDown size={12} />
          </button>
          {showFilters && (
            <div className="absolute top-full mt-1 right-0 bg-[#111] border border-white/10 rounded-xl p-1 z-10 min-w-[150px]">
              {(['all', 'scheduled', 'confirmed', 'completed', 'cancelled', 'no_show'] as FilterStatus[]).map((st) => (
                <button
                  key={st}
                  onClick={() => { setFilterStatus(st); setShowFilters(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                    filterStatus === st ? 'bg-white/10 text-white' : 'text-white/40 hover:bg-white/5'
                  }`}
                >
                  {st === 'all' ? 'All statuses' : statusStyles[st].label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* List */}
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
                  {appt.contactName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </span>
              </div>
              <p className="text-white text-xs font-medium truncate">{appt.contactName}</p>
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
              <span className={`text-[10px] px-2.5 py-1 rounded-full ${statusStyles[appt.status].cls}`}>
                {statusStyles[appt.status].label}
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

      {showNewModal && <NewAppointmentModal onClose={() => setShowNewModal(false)} />}
    </div>
  );
}

function NewAppointmentModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-askan text-lg">New appointment</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white/70 transition-colors">
            <X size={18} />
          </button>
        </div>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <Field label="Patient">
            <input type="text" placeholder="Search a contact..." className="form-input" />
          </Field>
          <Field label="Service">
            <select className="form-input">
              <option className="bg-[#111]">Strategy Call</option>
              <option className="bg-[#111]">Automation Audit</option>
              <option className="bg-[#111]">Onboarding Session</option>
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date">
              <input type="date" className="form-input" />
            </Field>
            <Field label="Time">
              <input type="time" className="form-input" />
            </Field>
          </div>
          <button type="submit" className="w-full mt-2 bg-white text-black text-sm font-medium py-2.5 rounded-xl hover:bg-white/90 transition-colors">
            Create appointment
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-white/40 text-[11px] uppercase tracking-wider">{label}</span>
      <div className="mt-1.5 [&_.form-input]:w-full [&_.form-input]:bg-white/5 [&_.form-input]:border [&_.form-input]:border-white/10 [&_.form-input]:rounded-xl [&_.form-input]:px-3 [&_.form-input]:py-2.5 [&_.form-input]:text-white [&_.form-input]:text-sm [&_.form-input]:outline-none [&_.form-input]:focus:border-white/25 [&_.form-input]:transition-colors">
        {children}
      </div>
    </label>
  );
}
