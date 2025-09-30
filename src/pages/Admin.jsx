import React from 'react';
import { api } from '../utils/api.js';

export default function Admin() {
  const [domains, setDomains] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [domain, setDomain] = React.useState('');
  const [price, setPrice] = React.useState(4999);
  const [msg, setMsg] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    api.listDomains().then(setDomains).catch(e => setError(e.message));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(''); setError('');
    try {
      const res = await api.createProgram({ title, description, domain, price });
      setMsg(`Program created: ${res.title || title}`);
      setTitle(''); setDescription(''); setDomain(''); setPrice(4999);
    } catch (e2) {
      setError(e2.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h1 className="text-2xl lg:text-3xl font-semibold mb-4">Admin</h1>
      <p className="text-slate-600 mb-4">Add a new program to the database.</p>
      <form onSubmit={onSubmit} className="grid gap-4 border border-slate-200 rounded-xl p-5 bg-white">
        <input className="border border-slate-300 rounded-lg px-3 py-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea className="border border-slate-300 rounded-lg px-3 py-2" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required rows={4} />
        <select className="border border-slate-300 rounded-lg px-3 py-2" value={domain} onChange={e => setDomain(e.target.value)} required>
          <option value="">Select domain</option>
          {domains.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <input className="border border-slate-300 rounded-lg px-3 py-2" type="number" min={0} step={1} value={price} onChange={e => setPrice(Number(e.target.value))} />
        <button type="submit" className="px-4 py-2 rounded-lg bg-slate-900 text-white">Create Program</button>
        {msg && <div className="text-green-600 text-sm">{msg}</div>}
        {error && <div className="text-red-600 text-sm">{error}</div>}
      </form>
    </div>
  );
}


