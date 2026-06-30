import { useState } from 'react';
import { Clock } from 'lucide-react';

const days = [
  { key: 'mon', label: 'Mon' },
  { key: 'tue', label: 'Tue' },
  { key: 'wed', label: 'Wed' },
  { key: 'thu', label: 'Thu' },
  { key: 'fri', label: 'Fri' },
  { key: 'sat', label: 'Sat' },
  { key: 'sun', label: 'Sun' },
];

interface DaySchedule {
  enabled: boolean;
  open: string;
  close: string;
}

const defaultSchedule: Record<string, DaySchedule> = {
  mon: { enabled: true, open: '09:00', close: '18:00' },
  tue: { enabled: true, open: '09:00', close: '18:00' },
  wed: { enabled: true, open: '09:00', close: '18:00' },
  thu: { enabled: true, open: '09:00', close: '18:00' },
  fri: { enabled: true, open: '09:00', close: '18:00' },
  sat: { enabled: true, open: '09:00', close: '13:00' },
  sun: { enabled: false, open: '09:00', close: '18:00' },
};

export default function BusinessHours() {
  const [schedule, setSchedule] = useState<Record<string, DaySchedule>>(defaultSchedule);

  function toggleDay(day: string) {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled },
    }));
  }

  function updateTime(day: string, field: 'open' | 'close', value: string) {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={16} className="text-white/40" />
        <h4 className="text-white text-sm font-medium">Business Hours</h4>
      </div>

      <div className="space-y-2">
        {days.map((day) => {
          const s = schedule[day.key];
          return (
            <div
              key={day.key}
              className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                s.enabled ? 'bg-white/5' : 'bg-white/[0.02]'
              }`}
            >
              {/* Toggle */}
              <button
                onClick={() => toggleDay(day.key)}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  s.enabled ? 'bg-brand-green' : 'bg-white/10'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    s.enabled ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>

              {/* Day label */}
              <span className={`text-xs w-10 ${s.enabled ? 'text-white' : 'text-white/30'}`}>
                {day.label}
              </span>

              {/* Time inputs */}
              {s.enabled ? (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="time"
                    value={s.open}
                    onChange={(e) => updateTime(day.key, 'open', e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs outline-none focus:border-white/20"
                  />
                  <span className="text-white/20 text-xs">to</span>
                  <input
                    type="time"
                    value={s.close}
                    onChange={(e) => updateTime(day.key, 'close', e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs outline-none focus:border-white/20"
                  />
                </div>
              ) : (
                <span className="text-white/20 text-xs flex-1">Closed</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
