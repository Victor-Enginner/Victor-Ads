import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Users, Calendar, Settings, FileText, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '../../i18n/LanguageContext';

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { icon: LayoutDashboard, label: t('sidebar.overview'), href: '/dashboard' },
    { icon: MessageSquare, label: t('sidebar.chat'), href: '/dashboard/chat' },
    { icon: Users, label: t('sidebar.contacts'), href: '/dashboard/contacts' },
    { icon: Calendar, label: t('sidebar.appointments'), href: '/dashboard/appointments' },
    { icon: FileText, label: t('sidebar.knowledge'), href: '/dashboard/knowledge' },
    { icon: CreditCard, label: t('sidebar.billing'), href: '/dashboard/billing' },
    { icon: Settings, label: t('sidebar.settings'), href: '/dashboard/settings' },
  ];

  return (
    <aside
      className={`h-screen bg-[#0d0d0d] border-r border-white/5 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-white/5">
        <Link to="/" className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-violet to-neon-cyan flex items-center justify-center shrink-0">
            <span className="font-askan text-white text-sm">V</span>
          </div>
          {!collapsed && (
            <span className="font-askan text-white text-lg tracking-wide">Victor Ads</span>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={18} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-2 border-t border-white/5">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center py-2 rounded-xl text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}
