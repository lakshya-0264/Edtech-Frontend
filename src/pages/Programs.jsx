import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../utils/api.js';
import ProgramCard from '../components/ProgramCard.jsx';
import Filters from '../components/Filters.jsx';

export default function Programs() {
  const [programs, setPrograms] = React.useState([]);
  const [domains, setDomains] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = React.useState(params.get('domain') || '');
  const [query, setQuery] = React.useState(params.get('q') || '');

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    try {
      const [p, d] = await Promise.all([
        selectedDomain ? api.listProgramsByDomain(selectedDomain) : api.listPrograms({ q: query || undefined }),
        api.listDomains(),
      ]);
      setPrograms(p);
      setDomains(d);
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [selectedDomain, query]);

  React.useEffect(() => { fetchData(); }, [fetchData]);

  React.useEffect(() => {
    const next = new URLSearchParams();
    if (selectedDomain) next.set('domain', selectedDomain);
    if (query) next.set('q', query);
    setParams(next, { replace: true });
  }, [selectedDomain, query, setParams]);

  // When URL params change (e.g., clicking a ProgramCard), sync state and refetch
  React.useEffect(() => {
    const domainParam = params.get('domain') || '';
    const qParam = params.get('q') || '';
    setSelectedDomain(domainParam);
    setQuery(qParam);
  }, [params]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h1 className="text-2xl lg:text-3xl font-semibold mb-4">Programs</h1>
      <Filters domains={domains} selectedDomain={selectedDomain} onSelectDomain={setSelectedDomain} query={query} onQuery={setQuery} />
      {loading && <div className="text-slate-600">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="mt-4 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {programs.map(p => <ProgramCard key={p.id} program={p} />)}
      </div>
    </div>
  );
}


