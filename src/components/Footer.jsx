import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-600">
        © {new Date().getFullYear()} EdTech Coding Samurai
      </div>
    </footer>
  );
}


