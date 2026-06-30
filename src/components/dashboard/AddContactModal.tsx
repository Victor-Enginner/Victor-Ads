import { useState } from 'react';
import { X, UserPlus } from 'lucide-react';

interface AddContactModalProps {
  onClose: () => void;
}

export default function AddContactModal({ onClose }: AddContactModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [channel, setChannel] = useState('whatsapp');
  const [tags, setTags] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: send to API
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <UserPlus size={16} className="text-white/40" />
            <h3 className="text-white text-sm font-medium">Add Contact</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Maria Silva"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/20 outline-none focus:border-white/20 transition-colors"
            />
          </div>

          <div>
            <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1.5">
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+55 11 99999-9999"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/20 outline-none focus:border-white/20 transition-colors"
            />
          </div>

          <div>
            <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1.5">
              Email <span className="text-white/15">(optional)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="maria@email.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/20 outline-none focus:border-white/20 transition-colors"
            />
          </div>

          <div>
            <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1.5">
              Channel
            </label>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-white/20 transition-colors appearance-none"
            >
              <option value="whatsapp" className="bg-[#0a0a0a]">WhatsApp</option>
              <option value="web" className="bg-[#0a0a0a]">Website</option>
              <option value="instagram" className="bg-[#0a0a0a]">Instagram</option>
              <option value="telegram" className="bg-[#0a0a0a]">Telegram</option>
            </select>
          </div>

          <div>
            <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1.5">
              Tags <span className="text-white/15">(comma separated)</span>
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="vip, regular, new-patient"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/20 outline-none focus:border-white/20 transition-colors"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-white/5 text-white/40 text-xs hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-white text-black text-xs font-medium hover:bg-white/90 transition-colors"
            >
              Add contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
