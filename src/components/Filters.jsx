import React from 'react';

export default function Filters({ domains, selectedDomain, onSelectDomain, query, onQuery }) {
  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
      <select value={selectedDomain} onChange={e => onSelectDomain(e.target.value)} className="border border-slate-300 rounded-lg px-3 py-2 text-sm">
        <option value="">All Domains</option>
        {domains.map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
      <input value={query} onChange={e => onQuery(e.target.value)} placeholder="Search programs..." className="flex-1 min-w-[220px] border border-slate-300 rounded-lg px-3 py-2 text-sm" />
    </div>
  );
}


