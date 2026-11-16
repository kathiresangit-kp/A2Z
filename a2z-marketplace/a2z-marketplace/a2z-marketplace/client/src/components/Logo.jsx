import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <Link to="/" className="flex items-center gap-2.5 select-none">
    <svg width="38" height="38" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#0F172A" />
      <path d="M10 27L16.5 12L23 27M12.5 22H20.5" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 14H31L23 26H31" stroke="#F97316" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="31" cy="11" r="2.5" fill="#2563EB" />
    </svg>
    <div className="flex flex-col leading-none">
      <span className="text-xl font-extrabold tracking-tight text-brand-navy">
        A2Z <span className="text-brand-orange">Market</span>
      </span>
      <span className="text-[10px] font-semibold tracking-widest text-brand-blue uppercase">
        India&apos;s Smart Store
      </span>
    </div>
  </Link>
);

export default Logo;