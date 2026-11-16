import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Search, ShoppingCart, User, Store, LogOut } from 'lucide-react';
import Logo from './Logo';
import { logout } from '../redux/authSlice';

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Logo />

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
          <div className="flex w-full rounded-xl border border-slate-300 overflow-hidden focus-within:border-brand-blue">
            <input
              type="text"
              placeholder="Search mobiles, laptops, fashion, brands in India..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2 text-sm outline-none"
            />
            <button
              type="submit"
              className="bg-brand-blue hover:bg-brand-navy text-white px-5 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Search size={18} />
            </button>
          </div>
        </form>

        <div className="flex items-center gap-4">
          <Link
            to="/seller"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-brand-navy hover:text-brand-orange transition"
          >
            <Store size={18} /> Seller Studio
          </Link>

          <Link to="/cart" className="relative p-2 text-brand-navy hover:text-brand-blue">
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-brand-orange text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-brand-navy">Hi, {user.name.split(' ')[0]}</span>
              <button
                onClick={() => dispatch(logout())}
                className="p-2 text-slate-500 hover:text-red-600 cursor-pointer"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 bg-brand-navy hover:bg-brand-blue text-white text-sm font-semibold px-4 py-2 rounded-xl transition"
            >
              <User size={16} /> Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;