import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

const CATEGORIES = [
  'All', 'Electronics', 'Fashion', 'Mobile', 'Laptop', 'Home Appliances', 'Beauty', 'Grocery', 'Sports'
];

const SAMPLE_PRODUCTS = [
  {
    _id: '1',
    productName: 'OnePlus 13R 5G (12GB RAM, 256GB Storage) - Nebula Noir',
    brand: 'OnePlus',
    category: 'Mobile',
    price: 42999,
    discount: 12,
    ratings: 4.6,
    numReviews: 1240,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80',
  },
  {
    _id: '2',
    productName: 'ASUS Vivobook 15 Intel Core i5 13th Gen Thin & Light Laptop',
    brand: 'ASUS',
    category: 'Laptop',
    price: 58990,
    discount: 18,
    ratings: 4.4,
    numReviews: 856,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80',
  },
  {
    _id: '3',
    productName: 'boAt Nirvana Ion ANC Wireless Earbuds with 120H Playback',
    brand: 'boAt',
    category: 'Electronics',
    price: 2999,
    discount: 45,
    ratings: 4.3,
    numReviews: 3410,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
  },
  {
    _id: '4',
    productName: 'Allen Solly Men Slim Fit Cotton Casual Shirt',
    brand: 'Allen Solly',
    category: 'Fashion',
    price: 1999,
    discount: 35,
    ratings: 4.5,
    numReviews: 620,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80',
  },
];

const Home = ({ searchQuery = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = SAMPLE_PRODUCTS.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-gradient-to-r from-brand-navy via-slate-900 to-brand-blue rounded-3xl p-8 md:p-12 text-white mb-8 shadow-lg">
        <div className="max-w-xl">
          <span className="bg-brand-orange text-xs font-bold uppercase px-3 py-1 rounded-full">
            Great Indian Tech & Fashion Fest
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-4 leading-tight">
            Everything From A to Z, Delivered Across India.
          </h1>
          <p className="text-slate-300 mt-3 text-sm md:text-base">
            Shop verified Indian sellers, instant UPI & Razorpay checkout, and GST invoices on every order.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-brand-navy text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-brand-blue'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <h2 className="text-xl font-extrabold text-brand-navy mb-4">Trending Deals in India</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;