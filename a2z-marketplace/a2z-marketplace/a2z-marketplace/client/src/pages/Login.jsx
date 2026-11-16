import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../redux/authSlice';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '', role: 'customer' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const { data } = await axios.post(`http://localhost:5000${endpoint}`, form);
      dispatch(setCredentials(data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md w-full max-w-md">
        <h2 className="text-2xl font-extrabold text-brand-navy mb-1">
          {isRegister ? 'Create A2Z Account' : 'Welcome Back'}
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          {isRegister ? 'Join India’s fastest growing marketplace' : 'Login to track orders & manage cart'}
        </p>

        {error && <p className="bg-red-50 text-red-600 text-xs font-semibold p-3 rounded-lg mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Mobile Number (+91)"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              />
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="customer">Register as Customer</option>
                <option value="seller">Register as Seller</option>
              </select>
            </>
          )}
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className="w-full bg-brand-blue hover:bg-brand-navy text-white font-bold py-3 rounded-xl transition cursor-pointer"
          >
            {isRegister ? 'Register Now' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-5">
          {isRegister ? 'Already have an account?' : 'New to A2Z Marketplace?'}{' '}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-brand-orange font-bold hover:underline cursor-pointer"
          >
            {isRegister ? 'Login' : 'Create Account'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;