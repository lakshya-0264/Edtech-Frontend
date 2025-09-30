import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <section className="grid gap-4 sm:gap-6 rounded-2xl border border-slate-200 p-6 sm:p-8 lg:p-12 bg-white">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">Welcome to EdTech</h1>
        <p className="text-slate-600 text-base lg:text-lg max-w-3xl">Explore industry-ready programs across IT, Mechanical, Management, Medical, and Services.</p>
        <div className="flex flex-wrap gap-3">
          <Link to="/programs" className="inline-flex items-center rounded-lg bg-slate-900 text-white px-4 py-2 text-sm lg:text-base">Explore Programs</Link>
          <Link to="/domains" className="inline-flex items-center rounded-lg border border-slate-900 text-slate-900 px-4 py-2 text-sm lg:text-base">Browse Domains</Link>
        </div>
      </section>

      <section className="mt-10 lg:mt-12">
        <h2 className="text-xl lg:text-2xl font-semibold mb-2">Why choose us?</h2>
        <ul className="list-disc pl-6 text-slate-700 grid gap-1">
          <li>Mentor-led cohorts and practical projects</li>
          <li>Resume and interview preparation</li>
          <li>Flexible, self-paced content</li>
        </ul>
      </section>

      <section className="mt-10 lg:mt-12">
        <h2 className="text-xl lg:text-2xl font-semibold mb-3">Testimonials</h2>
        <blockquote className="border-l-4 border-slate-200 pl-4 text-slate-700 max-w-3xl">“The AI track helped me land my first ML internship.” — A. Kumar</blockquote>
      </section>
    </div>
  );
}


