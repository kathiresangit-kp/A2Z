import React from 'react';
import { Package, ShoppingBag, IndianRupee, TrendingUp, PlusCircle } from 'lucide-react';

const formatINR = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

const SellerDashboard = () => {
  const cards = [
    { title: 'Total Revenue', value: formatINR(485900), icon: IndianRupee, color: 'bg-brand-orange' },
    { title: 'Total Orders', value: 142, icon: ShoppingBag, color: 'bg-brand-blue' },
    { title: 'Active Products', value: 24, icon: Package, color: 'bg-brand-navy' },
    { title: 'Monthly Growth', value: '+18.4%', icon: TrendingUp, color: 'bg-emerald-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy">Seller Studio</h1>
          <p className="text-sm text-slate-500">Manage inventory, GST invoices & customer orders</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm transition cursor-pointer">
          <PlusCircle size={18} /> Add New Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">{card.title}</p>
              <h2 className="text-2xl font-extrabold text-brand-navy mt-1">{card.value}</h2>
            </div>
            <div className={`${card.color} p-3.5 rounded-xl text-white`}>
              <card.icon size={24} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;