import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function PaymentConfirm() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const title = params.get('title') || 'Selected Program';
  const price = Number(params.get('price') || 4999);
  const buyerEmail = params.get('email') || '';
  const programId = params.get('programId') || '';
  const name = params.get('name') || '';

  React.useEffect(() => {
    const qs = new URLSearchParams({ programId, title, price: String(price), email: buyerEmail, name }).toString();
    const t = setTimeout(() => {
      navigate(`/payment/success?${qs}`);
    }, 1200);
    return () => clearTimeout(t);
  }, [programId, title, price, buyerEmail, name, navigate]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h1 className="text-2xl lg:text-3xl font-semibold mb-4">Confirming Payment</h1>
      <div className="border border-slate-200 rounded-xl p-5 max-w-xl bg-white">
        <div className="mb-2"><strong>Program:</strong> {title}</div>
        <div className="mb-4"><strong>Amount:</strong> ${(price / 100).toFixed(2)}</div>
        {buyerEmail && <div className="mb-4"><strong>Receipt to:</strong> {buyerEmail}</div>}
        <div className="mt-3 flex items-center gap-3 text-slate-700">
          <span className="inline-block h-4 w-4 rounded-full border-2 border-slate-400 border-t-transparent animate-spin"></span>
          Processing your payment...
        </div>
        <div className="mt-3 text-xs text-slate-500">You will be redirected shortly.</div>
      </div>
    </div>
  );
}


