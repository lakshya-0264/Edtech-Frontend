import React from 'react';
import { api } from '../utils/api.js';

export default function Domains() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    api.listDomains().then(setItems).catch(e => setError(e.message)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h1 className="text-2xl lg:text-3xl font-semibold mb-4">Domains</h1>
      {loading && <div className="text-slate-600">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map(d => (
          <div key={d} className="border border-slate-200 rounded-xl p-4 text-center bg-white">{d}</div>
        ))}
      </div>
    </div>
  );
}


