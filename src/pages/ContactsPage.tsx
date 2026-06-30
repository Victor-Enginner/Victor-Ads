import { useState } from 'react';
import { Search, Plus, Filter, Phone, Mail, MessageSquare, MoreVertical, Tag, ChevronDown } from 'lucide-react';
import ContactDetailModal from '../components/dashboard/ContactDetailModal';
import AddContactModal from '../components/dashboard/AddContactModal';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  channel: 'whatsapp' | 'web' | 'instagram' | 'telegram';
  tags: string[];
  lastContactAt: string;
  createdAt: string;
  totalMessages: number;
  totalAppointments: number;
}

const mockContacts: Contact[] = [
  { id: '1', name: 'Maria Silva', phone: '+55 11 99999-1111', email: 'maria@email.com', channel: 'whatsapp', tags: ['vip', 'regular'], lastContactAt: '2 min ago', createdAt: 'Jan 2024', totalMessages: 47, totalAppointments: 8 },
  { id: '2', name: 'João Santos', phone: '+55 11 99999-2222', email: 'joao@email.com', channel: 'whatsapp', tags: ['new-patient'], lastContactAt: '15 min ago', createdAt: 'Mar 2024', totalMessages: 12, totalAppointments: 2 },
  { id: '3', name: 'Ana Costa', phone: '+55 11 99999-3333', email: 'ana@email.com', channel: 'web', tags: ['regular'], lastContactAt: '1 hour ago', createdAt: 'Feb 2024', totalMessages: 23, totalAppointments: 5 },
  { id: '4', name: 'Pedro Lima', phone: '+55 11 99999-4444', email: 'pedro@email.com', channel: 'whatsapp', tags: [], lastContactAt: '3 hours ago', createdAt: 'Apr 2024', totalMessages: 8, totalAppointments: 1 },
  { id: '5', name: 'Carla Souza', phone: '+55 11 99999-5555', email: 'carla@email.com', channel: 'instagram', tags: ['vip'], lastContactAt: '5 hours ago', createdAt: 'Dec 2023', totalMessages: 34, totalAppointments: 6 },
  { id: '6', name: 'Roberto Alves', phone: '+55 11 99999-6666', email: '', channel: 'whatsapp', tags: ['new-patient'], lastContactAt: '1 day ago', createdAt: 'Jun 2024', totalMessages: 3, totalAppointments: 0 },
  { id: '7', name: 'Fernanda Oliveira', phone: '+55 11 99999-7777', email: 'fer@email.com', channel: 'web', tags: ['regular', 'family'], lastContactAt: '2 days ago', createdAt: 'Nov 2023', totalMessages: 56, totalAppointments: 12 },
  { id: '8', name: 'Lucas Pereira', phone: '+55 11 99999-8888', email: 'lucas@email.com', channel: 'telegram', tags: [], lastContactAt: '3 days ago', createdAt: 'May 2024', totalMessages: 5, totalAppointments: 1 },
];

const channelColors: Record<string, string> = {
  whatsapp: 'bg-green-500/20 text-green-400',
  web: 'bg-blue-500/20 text-blue-400',
  instagram: 'bg-pink-500/20 text-pink-400',
  telegram: 'bg-sky-500/20 text-sky-400',
};

const channelLabels: Record<string, string> = {
  whatsapp: 'W',
  web: 'W',
  instagram: 'I',
  telegram: 'T',
};

type FilterChannel = 'all' | 'whatsapp' | 'web' | 'instagram' | 'telegram';

export default function ContactsPage() {
  const [search, setSearch] = useState('');
  const [filterChannel, setFilterChannel] = useState<FilterChannel>('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = mockContacts.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesChannel = filterChannel === 'all' || c.channel === filterChannel;
    return matchesSearch && matchesChannel;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-askan text-white">Contacts</h1>
          <p className="text-white/40 text-sm mt-1">{mockContacts.length} total contacts</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-medium rounded-xl hover:bg-white/90 transition-colors"
        >
          <Plus size={14} />
          Add contact
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone, or email..."
            className="w-full bg-white/5 border border-white/5 rounded-xl pl-9 pr-3 py-2.5 text-white text-sm placeholder:text-white/20 outline-none focus:border-white/15 transition-colors"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-white/50 text-xs hover:bg-white/10 transition-colors"
          >
            <Filter size={14} />
            {filterChannel === 'all' ? 'All channels' : filterChannel}
            <ChevronDown size={12} />
          </button>
          {showFilters && (
            <div className="absolute top-full mt-1 right-0 bg-[#111] border border-white/10 rounded-xl p-1 z-10 min-w-[140px]">
              {(['all', 'whatsapp', 'web', 'instagram', 'telegram'] as FilterChannel[]).map((ch) => (
                <button
                  key={ch}
                  onClick={() => { setFilterChannel(ch); setShowFilters(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                    filterChannel === ch ? 'bg-white/10 text-white' : 'text-white/40 hover:bg-white/5'
                  }`}
                >
                  {ch === 'all' ? 'All channels' : ch}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/5 text-white/30 text-[10px] uppercase tracking-wider">
          <div className="col-span-4">Contact</div>
          <div className="col-span-2">Channel</div>
          <div className="col-span-2">Tags</div>
          <div className="col-span-2">Messages</div>
          <div className="col-span-1">Last active</div>
          <div className="col-span-1"></div>
        </div>

        {/* Rows */}
        {filtered.map((contact) => (
          <div
            key={contact.id}
            onClick={() => setSelectedContact(contact)}
            className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors items-center group"
          >
            {/* Contact */}
            <div className="col-span-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <span className="text-white text-[10px] font-medium">
                  {contact.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-white text-xs font-medium truncate">{contact.name}</p>
                <p className="text-white/30 text-[10px] truncate">{contact.phone}</p>
              </div>
            </div>

            {/* Channel */}
            <div className="col-span-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${channelColors[contact.channel]}`}>
                {channelLabels[contact.channel]} {contact.channel}
              </span>
            </div>

            {/* Tags */}
            <div className="col-span-2 flex flex-wrap gap-1">
              {contact.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 text-white/30">
                  {tag}
                </span>
              ))}
              {contact.tags.length > 2 && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 text-white/30">
                  +{contact.tags.length - 2}
                </span>
              )}
            </div>

            {/* Messages */}
            <div className="col-span-2">
              <div className="flex items-center gap-1.5">
                <MessageSquare size={10} className="text-white/20" />
                <span className="text-white/40 text-xs">{contact.totalMessages}</span>
              </div>
            </div>

            {/* Last active */}
            <div className="col-span-1">
              <span className="text-white/25 text-[10px]">{contact.lastContactAt}</span>
            </div>

            {/* Actions */}
            <div className="col-span-1 flex justify-end">
              <button className="p-1.5 rounded-lg text-white/20 hover:text-white/50 hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-all">
                <MoreVertical size={12} />
              </button>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
              <MessageSquare size={20} className="text-white/20" />
            </div>
            <p className="text-white/30 text-sm">No contacts found</p>
            <p className="text-white/15 text-xs mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedContact && (
        <ContactDetailModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}
      {showAddModal && (
        <AddContactModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}
