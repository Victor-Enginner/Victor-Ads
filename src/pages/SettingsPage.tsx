import { useState } from 'react';
import { Building2, Clock, Wrench, Plug, User } from 'lucide-react';
import BusinessHours from '../components/dashboard/BusinessHours';
import ServicesManager from '../components/dashboard/ServicesManager';
import Integrations from '../components/dashboard/Integrations';

type Tab = 'general' | 'hours' | 'services' | 'integrations' | 'account';

const tabs: { key: Tab; label: string; icon: typeof Building2 }[] = [
  { key: 'general', label: 'General', icon: Building2 },
  { key: 'hours', label: 'Business Hours', icon: Clock },
  { key: 'services', label: 'Services', icon: Wrench },
  { key: 'integrations', label: 'Integrations', icon: Plug },
  { key: 'account', label: 'Account', icon: User },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [tenantName, setTenantName] = useState('Clínica Sorriso');
  const [niche, setNiche] = useState('dentist');
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-askan text-white">Settings</h1>
          <p className="text-white/40 text-sm mt-1">Configure your workspace</p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2 bg-white text-black text-xs font-medium rounded-xl hover:bg-white/90 transition-colors"
        >
          {saved ? '✓ Saved' : 'Save changes'}
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar tabs */}
        <nav className="w-48 shrink-0">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-colors text-left ${
                  activeTab === tab.key
                    ? 'bg-white/10 text-white'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h4 className="text-white text-sm font-medium mb-4">General Settings</h4>

                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={tenantName}
                    onChange={(e) => setTenantName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-white/20 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-2">
                    Niche
                  </label>
                  <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-white/20 transition-colors appearance-none"
                  >
                    <option value="dentist" className="bg-[#0a0a0a]">Dentist / Clinic</option>
                    <option value="restaurant" className="bg-[#0a0a0a]">Restaurant</option>
                    <option value="lawyer" className="bg-[#0a0a0a]">Lawyer</option>
                    <option value="architect" className="bg-[#0a0a0a]">Architect</option>
                    <option value="content-producer" className="bg-[#0a0a0a]">Content Producer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    placeholder="+55 11 99999-9999"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/20 outline-none focus:border-white/20 transition-colors"
                  />
                  <p className="text-white/15 text-[10px] mt-1.5">
                    This number will be used to receive WhatsApp messages
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'hours' && <BusinessHours />}
            {activeTab === 'services' && <ServicesManager />}
            {activeTab === 'integrations' && <Integrations />}

            {activeTab === 'account' && (
              <div className="space-y-6">
                <h4 className="text-white text-sm font-medium mb-4">Account Settings</h4>

                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Victor Borsari"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-white/20 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="victor@aurai.com"
                    disabled
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white/30 text-sm outline-none cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-2">
                    Current Plan
                  </label>
                  <div className="flex items-center gap-3">
                    <span className="text-white text-xs bg-white/10 px-3 py-1.5 rounded-full">
                      Starter (Free)
                    </span>
                    <button className="text-[10px] text-white/50 hover:text-white/80 transition-colors">
                      Upgrade to Pro →
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <button className="text-red-400 text-xs hover:text-red-300 transition-colors">
                    Delete account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
