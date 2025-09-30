import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight">EdTech</Link>
        <div className="flex items-center gap-4 sm:gap-6 text-slate-700">
          <Link to="/domains" className="hover:text-slate-900">Domains</Link>
          <Link to="/programs" className="hover:text-slate-900">Programs</Link>
          <Link to="/services" className="hover:text-slate-900">Services</Link>
          <Link to="/orders" className="hover:text-slate-900">Orders</Link>
          <Link to="/admin" className="hover:text-slate-900">Admin</Link>
        </div>
      </div>
    </nav>
  );
}


