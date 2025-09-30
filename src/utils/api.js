import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const method = (options.method || 'GET').toLowerCase();
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const data = options.body ? JSON.parse(options.body) : undefined;
  const client = axios.create({ baseURL: BASE_URL, headers, withCredentials: false });
  try {
    const resp = await client.request({ url: path, method, data, params: options.params });
    return resp.data;
  } catch (err) {
    const msg = err?.response?.data?.message || err?.message || 'Request failed';
    throw new Error(msg);
  }
}

export const api = {
  health: () => request('/health'),
  listPrograms: (params = {}) => request('/api/programs', { params }),
  listProgramsByDomain: (domain) => request(`/api/programs/domain/${encodeURIComponent(domain)}`),
  getProgram: (id) => request(`/api/programs/${id}`),
  createProgram: (payload) => request('/api/programs', { method: 'POST', body: JSON.stringify(payload) }),
  listDomains: () => request('/api/domains'),
  listServices: () => request('/api/services'),
  checkout: (payload) => request('/api/checkout/session', { method: 'POST', body: JSON.stringify(payload) }),
  createOrder: (payload) => request('/api/orders', { method: 'POST', body: JSON.stringify(payload) }),
  listOrders: () => request('/api/orders'),
};

export function toggleFavorite(id) {
  const key = 'favorites';
  const current = JSON.parse(localStorage.getItem(key) || '[]');
  const exists = current.includes(id);
  const next = exists ? current.filter(x => x !== id) : [...current, id];
  localStorage.setItem(key, JSON.stringify(next));
  return next;
}

export function getFavorites() {
  try { return JSON.parse(localStorage.getItem('favorites') || '[]'); } catch { return []; }
}


