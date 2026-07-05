import { useState } from 'react';
import { useContacts } from '../hooks/useContacts';
import { ContactsSkeleton } from '../components/Skeletons';
import { Plus, Search, Phone, Mail, Tag } from 'lucide-react';

export default function ContactsPage() {
  const { contacts, loading, createContact, updateContact } = useContacts();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    externalId: '',
    name: '',
    phone: '',
    tags: '',
  });

  const filtered = contacts.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.externalId.toLowerCase().includes(search.toLowerCase())
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createContact({
        externalId: formData.externalId || crypto.randomUUID(),
        channel: 'whatsapp',
        name: formData.name || undefined,
        phone: formData.phone || undefined,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
      });
      setFormData({ externalId: '', name: '', phone: '', tags: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create contact', error);
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-xl font-semibold">Contacts</h1>
          <p className="text-white/40 text-sm mt-1">
            Manage your patients and clients
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-white/90 transition-colors"
        >
          <Plus size={16} />
          New Contact
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-white/30 outline-none focus:border-white/20 transition-colors"
        />
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-white text-sm font-medium mb-4">New Contact</h3>
          <div className="grid gap-3">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 outline-none focus:border-white/20"
            />
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 outline-none focus:border-white/20"
            />
            <input
              type="text"
              placeholder="External ID (optional)"
              value={formData.externalId}
              onChange={(e) => setFormData({ ...formData, externalId: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 outline-none focus:border-white/20"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 outline-none focus:border-white/20"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-white text-black py-2 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-white/10 text-white py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* List */}
      {loading ? (
        <ContactsSkeleton />
      ) : (
        <div className="grid gap-3">
          {filtered.map((contact) => (
            <div
              key={contact.id}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-medium">
                      {contact.name
                        ?.split(' ')
                        .map((n) => n[0])
                        .join('')
                        .substring(0, 2) || '?'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-sm font-medium">
                      {contact.name || 'Unnamed'}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      {contact.phone && (
                        <span className="flex items-center gap-1 text-white/40 text-xs">
                          <Phone size={12} />
                          {contact.phone}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-white/40 text-xs">
                        <Mail size={12} />
                        {contact.externalId}
                      </span>
                    </div>
                    {contact.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {contact.tags.map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full bg-white/10 text-white/60"
                          >
                            <Tag size={10} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}