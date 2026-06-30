import { useAuthStore } from '../../stores/authStore';
import { LogOut, Bell } from 'lucide-react';

export default function Topbar() {
  const { user, logout } = useAuthStore();

  return (
    <header className="h-16 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6">
      <div>
        <h2 className="text-white text-sm font-medium">
          {user?.tenant?.name || 'Dashboard'}
        </h2>
        <p className="text-white/30 text-xs">
          {user?.tenant?.plan === 'pro' ? 'Pro Plan' : 'Starter Plan'} · {user?.tenant?.niche || 'dentist'}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-green rounded-full" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-white text-xs font-medium">
              {user?.fullName?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-white text-xs font-medium">{user?.fullName}</p>
            <p className="text-white/30 text-[10px]">{user?.email}</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="p-2 rounded-xl text-white/30 hover:text-red-400 hover:bg-white/5 transition-colors"
          title="Logout"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
