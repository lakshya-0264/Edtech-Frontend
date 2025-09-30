import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Domains from './pages/Domains.jsx';
import Programs from './pages/Programs.jsx';
import Services from './pages/Services.jsx';
import Payment from './pages/Payment.jsx';
import { PaymentSuccess, PaymentCancel } from './pages/PaymentResult.jsx';
import PaymentConfirm from './pages/PaymentConfirm.jsx';
import Orders from './pages/Orders.jsx';
import Admin from './pages/Admin.jsx';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/domains" element={<Domains />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/confirm" element={<PaymentConfirm />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/cancel" element={<PaymentCancel />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
