import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { api } from '../utils/api.js';

export function PaymentSuccess() {
  const [params] = useSearchParams();
  const [created, setCreated] = React.useState(false);
  const title = params.get('title') || 'Selected Program';
  const price = Number(params.get('price') || 4999);
  const programId = params.get('programId');
  const buyerEmail = params.get('email') || '';
  const name = params.get('name') || '';

  React.useEffect(() => {
    if (!created) {
      const clientKey = `${programId || 'na'}-${price}-${buyerEmail}`;
      api.createOrder({ programId, title, price, buyerEmail, clientKey, name }).finally(() => setCreated(true));
    }
  }, [created, programId, title, price]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h1 className="text-2xl lg:text-3xl font-semibold mb-2">Payment Successful</h1>
      <p className="text-slate-700">Thank you for applying! We'll reach out with next steps.</p>
      <div className="mt-4 flex gap-4">
        <Link to="/orders" className="text-blue-600">View Orders</Link>
        <Link to="/programs" className="text-slate-700">Back to Programs</Link>
      </div>
    </div>
  );
}

export function PaymentCancel() {
  const location = useLocation();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h1 className="text-2xl lg:text-3xl font-semibold mb-2">Payment Cancelled</h1>
      <p className="text-slate-700">You can try again anytime.</p>
      <div className="text-slate-500 text-xs">Path: {location.pathname}</div>
      <div className="mt-4"><Link to="/payment" className="text-blue-600">Try Again</Link></div>
    </div>
  );
}


