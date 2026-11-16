import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2, Plus, Minus, CheckCircle2 } from 'lucide-react';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cartSlice';

const formatINR = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.finalPrice * item.quantity, 0);

  const handleCheckout = () => {
    setOrderPlaced(true);
    dispatch(clearCart());
  };

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto my-16 bg-white p-10 rounded-3xl border border-slate-200 text-center shadow-sm">
        <CheckCircle2 size={56} className="text-emerald-600 mx-auto mb-4" />
        <h2 className="text-2xl font-extrabold text-brand-navy">Order Confirmed!</h2>
        <p className="text-sm text-slate-500 mt-2">
          Thank you for shopping with A2Z Marketplace. Your GST invoice & tracking details have been generated.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-extrabold text-brand-navy mb-6">Shopping Cart ({items.length})</h1>

      {items.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
          <p className="text-slate-500 font-medium">Your A2Z cart is currently empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
                <img src={item.image} alt={item.productName} className="w-20 h-20 object-contain bg-slate-50 rounded-xl p-2" />
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-brand-navy">{item.productName}</h3>
                  <p className="text-base font-extrabold text-brand-blue mt-1">{formatINR(item.finalPrice)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }))}
                    className="p-1.5 rounded-lg border border-slate-200 cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-bold text-sm px-2">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))}
                    className="p-1.5 rounded-lg border border-slate-200 cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg ml-2 cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 h-fit">
            <h2 className="text-lg font-extrabold text-brand-navy mb-4">Price Details</h2>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-bold">{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-slate-600">Delivery</span>
              <span className="text-emerald-600 font-bold">FREE</span>
            </div>
            <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-extrabold text-brand-navy">
              <span>Total Amount</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full mt-5 bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition cursor-pointer"
            >
              Place Order (UPI / Card / COD)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;