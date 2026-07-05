import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useToastStore } from '../stores/toastStore';
import { User, Building2, Bell, Shield, Palette, Globe, LogOut } from 'lucide-react';

type Tab = 'profile' | 'clinic' | 'notifications' | 'security';

export default function SettingsPage() {
  const { user, logout } = useAuthStore();
  const { addToast } = useToastStore();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: 'profile' as Tab, label: 'Profile', icon: User },
    { id: 'clinic' as Tab, label: 'Clinic', icon: Building2 },
    { id: 'notifications' as Tab, label: 'Notifications', icon: Bell },
    { id: 'security' as Tab, label: 'Security', icon: Shield },
  ];

  async function handleSave() {
    setSaving(true);
    try {
      // TODO: Call API to update settings
      await new Promise(resolve => setTimeout(resolve, 500));
      addToast({ type: 'success', message: 'Settings saved successfully' });
    } catch {
      addToast({ type: 'error', message: 'Failed to save settings' });
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    logout();
    addToast({ type: 'info', message: 'Logged out successfully' });
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-white text-xl font-semibold">Settings</h1>
        <p className="text-white/40 text-sm mt-1">
          Manage your account and preferences
        </p>
      </div>

      <div className="flex gap-1 mb-6 bg-white/5 p-1 rounded-xl w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                activeTab === tab.id
                  ? 'bg-white/10 text-white'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div>
              <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Full Name</label>
              <input
                type="text"
                defaultValue={user?.fullName}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20"
              />
            </div>
            <div>
              <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20"
              />
            </div>
          </div>
        )}

        {activeTab === 'clinic' && (
          <div className="space-y-4">
            <div>
              <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Clinic Name</label>
              <input
                type="text"
                placeholder={user?.tenant?.name || 'My Clinic'}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20"
              />
            </div>
            <div>
              <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">WhatsApp Number</label>
              <input
                type="text"
                placeholder="+1234567890"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20"
              />
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm">Email Notifications</p>
                <p className="text-white/30 text-xs">Receive email updates</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm">Appointment Reminders</p>
                <p className="text-white/30 text-xs">Send reminders to patients</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-4">
            <div>
              <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Current Password</label>
              <input
                type="password"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20"
              />
            </div>
            <div>
              <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">New Password</label>
              <input
                type="password"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6 pt-6 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg text-sm transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-white/90 disabled:opacity-50 flex items-center gap-2"
          >
            {saving && <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}