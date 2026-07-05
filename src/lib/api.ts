const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface RequestOptions extends RequestInit {
  token?: string;
}

class ApiClient {
  private baseUrl: string;
  private refreshPromise: Promise<string> | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
 private _getAccessToken(): string | null {
  // Use getter via zustand
  return null;
}

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { token: initialToken, ...fetchOptions } = options;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    let accessToken = initialToken || localStorage.getItem('accessToken');

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      // Se 401 e não for rota de auth, tenta refresh
      if (response.status === 401 && !endpoint.includes('/auth/') && !endpoint.includes('/auth/refresh')) {
        try {
          const newToken = await this.refreshAccessToken();
          headers['Authorization'] = `Bearer ${newToken}`;

          // Retry
          const retry = await fetch(`${this.baseUrl}${endpoint}`, {
            ...fetchOptions,
            headers,
          });

          const retryData = await retry.json();

          if (!retry.ok) {
            throw new Error(retryData.error || `HTTP ${retry.status}`);
          }

          return retryData as T;
        } catch {
          // Refresh falhou, redirecionar para login
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          throw new Error('Session expired');
        }
      }

      throw new Error(data.error || `HTTP ${response.status}`);
    }

    return data as T;
  }

  private async refreshAccessToken(): Promise<string> {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      throw new Error('No refresh token');
    }

    // Se já está fazendo refresh, esperar a promise existente
    if (this.refreshPromise) {
      return this.refreshPromise.then(t => t);
    }

    this.refreshPromise = (async () => {
      try {
        const data = await this.post<{ accessToken: string; refreshToken: string }>(
          '/api/auth/refresh',
          { refreshToken }
        );

        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        return data.accessToken;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
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