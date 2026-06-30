import { useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number | null;
}

const defaultServices: Service[] = [
  { id: '1', name: 'Limpeza', duration: 30, price: 150 },
  { id: '2', name: 'Consulta', duration: 45, price: 200 },
  { id: '3', name: 'Clareamento', duration: 60, price: 800 },
  { id: '4', name: 'Restauração', duration: 40, price: 250 },
];

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDuration, setNewDuration] = useState(30);
  const [newPrice, setNewPrice] = useState('');

  function addService() {
    if (!newName.trim()) return;

    const service: Service = {
      id: Date.now().toString(),
      name: newName.trim(),
      duration: newDuration,
      price: newPrice ? Number(newPrice) : null,
    };

    setServices((prev) => [...prev, service]);
    setNewName('');
    setNewDuration(30);
    setNewPrice('');
    setAdding(false);
  }

  function removeService(id: string) {
    setServices((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-white text-sm font-medium">Services</h4>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors"
        >
          <Plus size={14} />
          Add service
        </button>
      </div>

      {/* Service list */}
      <div className="space-y-2">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center gap-3 bg-white/5 rounded-xl p-3 group"
          >
            <GripVertical size={14} className="text-white/15 cursor-grab" />

            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium">{service.name}</p>
              <p className="text-white/30 text-[10px]">
                {service.duration}min {service.price !== null && `· $${service.price}`}
              </p>
            </div>

            <button
              onClick={() => removeService(service.id)}
              className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* Add new form */}
      {adding && (
        <div className="bg-white/5 rounded-xl p-4 space-y-3 border border-white/10">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Service name"
            autoFocus
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder:text-white/20 outline-none focus:border-white/20"
          />

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-white/30 text-[10px] mb-1">Duration (min)</label>
              <input
                type="number"
                value={newDuration}
                onChange={(e) => setNewDuration(Number(e.target.value))}
                min={15}
                step={15}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs outline-none focus:border-white/20"
              />
            </div>
            <div className="flex-1">
              <label className="block text-white/30 text-[10px] mb-1">Price ($)</label>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="Optional"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder:text-white/20 outline-none focus:border-white/20"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setAdding(false)}
              className="flex-1 py-2 rounded-lg bg-white/5 text-white/40 text-xs hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={addService}
              className="flex-1 py-2 rounded-lg bg-white text-black text-xs font-medium hover:bg-white/90 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
