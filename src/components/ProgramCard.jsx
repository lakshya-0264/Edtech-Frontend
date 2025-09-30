import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getFavorites, toggleFavorite } from '../utils/api.js';

export default function ProgramCard({ program }) {
  const navigate = useNavigate();
  const [favorites, setFavorites] = React.useState(getFavorites());
  const isFav = favorites.includes(program.id);

  const onApply = () => {
    navigate(`/payment?programId=${program.id}&title=${encodeURIComponent(program.title)}&price=${program.price}`);
  };

  const onToggleFav = () => setFavorites(toggleFavorite(program.id));

  return (
    <div className="border border-slate-200 rounded-xl p-4 sm:p-5 lg:p-6 bg-white flex flex-col gap-2 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between">
        <button className="text-left" onClick={() => navigate(`/programs?domain=${encodeURIComponent(program.domain)}`)}>
          <h3 className="text-lg font-semibold leading-tight hover:underline">{program.title}</h3>
          <div className="text-slate-500 text-sm hover:underline">{program.domain}</div>
        </button>
        <button onClick={onToggleFav} aria-label="favorite" className="text-yellow-500">
          {isFav ? '★' : '☆'}
        </button>
      </div>
      <p className="text-slate-700 text-sm lg:text-base">{program.description}</p>
      <div className="flex items-center justify-between pt-2">
        <strong className="text-slate-900">${(program.price / 100).toFixed(2)}</strong>
        <button onClick={onApply} className="inline-flex items-center px-3 py-2 rounded-lg bg-slate-900 text-white text-sm">Apply</button>
      </div>
    </div>
  );
}


