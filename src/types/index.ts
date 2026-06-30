export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'owner' | 'admin' | 'agent' | 'viewer';
  tenantId: string | null;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  niche: string;
  plan: string;
  businessHours: Record<string, { open: string; close: string }>;
  services: Array<{ name: string; duration: number; price?: number }>;
  settings: Record<string, unknown>;
}

export interface Contact {
  id: string;
  externalId: string;
  channel: 'whatsapp' | 'web' | 'instagram' | 'telegram';
  name: string | null;
  phone: string | null;
  profile: Record<string, unknown>;
  tags: string[];
  lastContactAt: string | null;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  toolCalls?: unknown;
  tokenCount: number;
  model: string | null;
  createdAt: string;
}

export interface Appointment {
  id: string;
  contactId: string;
  service: string;
  date: string;
  time: string;
  durationMinutes: number;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  notes: string | null;
  contactName?: string;
  contactExternalId?: string;
  createdAt: string;
}
