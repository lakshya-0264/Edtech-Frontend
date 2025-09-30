import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
// Stripe disabled for now; navigate to mock confirmation page

export default function Payment() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const programId = params.get('programId');
  const title = params.get('title');
  const price = Number(params.get('price') || 4999);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const formValid = Boolean(title) && name.trim().length > 1 && emailValid;

  const onPay = async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({
        programId: programId || '',
        title: title || '',
        price: String(price),
        email,
        name,
      }).toString();
      navigate(`/payment/confirm?${qs}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h1 className="text-2xl lg:text-3xl font-semibold mb-4">Checkout</h1>
      <div className="border border-slate-200 rounded-xl p-5 max-w-xl bg-white">
        <div className="mb-2"><strong>Program:</strong> {title || 'Selected Program'}</div>
        <div className="mb-4"><strong>Amount:</strong> ${(price / 100).toFixed(2)}</div>
        <div className="grid gap-3 mb-4">
          <input className="border border-slate-300 rounded-lg px-3 py-2" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
          <input className="border border-slate-300 rounded-lg px-3 py-2" placeholder="Email (for receipt)" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        {!emailValid && email.length > 0 && <div className="text-xs text-red-600 mb-2">Enter a valid email.</div>}
        <button onClick={onPay} disabled={loading || !formValid} className={`w-full px-4 py-2 rounded-lg text-white ${formValid ? 'bg-blue-600' : 'bg-blue-300 cursor-not-allowed'}`}>{loading ? 'Redirecting...' : 'Proceed to Pay'}</button>
      </div>
      <div className="mt-4">
        <button onClick={() => navigate(-1)} className="px-3 py-2 rounded-lg border border-slate-300">Back</button>
      </div>
    </div>
  );
}


