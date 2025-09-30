import React from 'react';
import { api } from '../utils/api.js';

export default function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [stats, setStats] = React.useState(null);

  React.useEffect(() => {
    Promise.all([api.listOrders(), fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/orders/analytics`).then(r=>r.json())])
      .then(([ordersData, analytics]) => { setOrders(ordersData); setStats(analytics); })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h1 className="text-2xl lg:text-3xl font-semibold mb-4">Orders</h1>
      {stats && (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3 mb-6">
          <div className="border border-slate-200 rounded-xl p-5 bg-white">
            <div className="text-slate-500 text-sm">Total Spend</div>
            <div className="text-2xl font-semibold">${(stats.totalAmount / 100).toFixed(2)}</div>
          </div>
          <div className="border border-slate-200 rounded-xl p-5 bg-white lg:col-span-2">
            <div className="text-slate-500 text-sm mb-2">Top Domains</div>
            <div className="flex flex-wrap gap-3">
              {stats.byDomain.map(d => (
                <span key={d.domain} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">{d.domain}: ${(d.totalAmount/100).toFixed(2)} ({d.count})</span>
              ))}
            </div>
          </div>
        </div>
      )}
      {loading && <div className="text-slate-600">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Program</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-t border-slate-100">
                <td className="px-4 py-3">{o.programTitle}</td>
                <td className="px-4 py-3">${(o.amount / 100).toFixed(2)}</td>
                <td className="px-4 py-3 capitalize">{o.status}</td>
                <td className="px-4 py-3">{new Date(o.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {orders.length === 0 && !loading && (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={4}>No orders yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


