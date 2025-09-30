import React from 'react';
import { api } from '../utils/api.js';

export default function Services() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    api.listServices().then(setItems).catch(e => setError(e.message)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h1 className="text-2xl lg:text-3xl font-semibold mb-4">Services</h1>
      {loading && <div className="text-slate-600">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map(s => (
          <div key={s.id} className="border border-slate-200 rounded-xl p-5 bg-white">
            <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
            <p className="text-slate-700 text-sm lg:text-base">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


