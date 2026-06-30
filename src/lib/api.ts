const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface RequestOptions extends RequestInit {
  token?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { token, ...fetchOptions } = options;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}`);
    }

    return data as T;
  }

  get<T>(endpoint: string, token?: string) {
    return this.request<T>(endpoint, { method: 'GET', token });
  }

  post<T>(endpoint: string, body: unknown, token?: string) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      token,
    });
  }

  patch<T>(endpoint: string, body: unknown, token?: string) {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
      token,
    });
  }

  delete<T>(endpoint: string, token?: string) {
    return this.request<T>(endpoint, { method: 'DELETE', token });
  }
}

export const api = new ApiClient(API_BASE);

// =============================================
// AUTH API
// =============================================

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
  tenant: {
    id: string;
    name: string;
    slug: string;
    niche: string;
    plan: string;
  } | null;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  register: (data: { email: string; password: string; fullName: string; tenantName?: string }) =>
    api.post<AuthResponse>('/api/auth/register', data),

  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>('/api/auth/login', data),

  refresh: (refreshToken: string) =>
    api.post<{ accessToken: string; refreshToken: string }>('/api/auth/refresh', { refreshToken }),

  me: (token: string) =>
    api.get<AuthUser>('/api/auth/me', token),
};
