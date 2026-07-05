import { useAuthStore } from '../../stores/authStore';
import { LogOut, Bell, Globe } from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';

export default function Topbar() {
  const { user, logout } = useAuthStore();
  const { t, lang, toggleLang } = useTranslation();

  return (
    <header className="h-16 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6">
      <div>
        <h2 className="text-white text-sm font-medium">
          {user?.tenant?.name || 'Dashboard'}
        </h2>
        <p className="text-white/30 text-xs">
          {user?.tenant?.plan === 'pro' ? t('topbar.plan.pro') : t('topbar.plan.starter')} · {user?.tenant?.niche || 'dentist'}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Language Toggle */}
        <button
          onClick={toggleLang}
          className="flex items-center gap-1.5 p-2 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors"
          title={lang === 'en' ? 'Mudar para Português' : 'Switch to English'}
        >
          <Globe size={16} />
          <span className="text-xs font-medium">{lang === 'en' ? 'PT' : 'EN'}</span>
        </button>

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
          title={t('topbar.logout')}
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
