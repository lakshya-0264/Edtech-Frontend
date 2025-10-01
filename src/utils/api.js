import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

async function request(path, options = {}) {
  const method = (options.method || "GET").toLowerCase();
  const data = options.body ? JSON.parse(options.body) : undefined;

  try {
    const resp = await client.request({
      url: path,
      method,
      data,
      params: options.params,
      headers: options.headers,
    });
    return resp.data;
  } catch (err) {
    const msg = err?.response?.data?.message || err?.message || "Request failed";
    throw new Error(msg);
  }
}

export const api = {
  health: () => request("/health"),
  listPrograms: (params = {}) => request("/api/programs", { params }),
  getProgram: (id) => request(`/api/programs/${id}`),
  createProgram: (payload) =>
    request("/api/programs", { method: "POST", body: JSON.stringify(payload) }),
  listDomains: () => request("/api/domains"),
  listServices: () => request("/api/services"),
  checkout: (payload) =>
    request("/api/checkout/session", { method: "POST", body: JSON.stringify(payload) }),
  createOrder: (payload) =>
    request("/api/orders", { method: "POST", body: JSON.stringify(payload) }),
  listOrders: () => request("/api/orders"),
  ordersAnalytics: () => request("/api/orders/analytics"),
};
