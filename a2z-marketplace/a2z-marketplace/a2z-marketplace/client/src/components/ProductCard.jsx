import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const formatINR = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const finalPrice = Math.round(product.price * (1 - product.discount / 100));

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg transition-all overflow-hidden flex flex-col"
    >
      <div className="relative h-52 bg-slate-50 p-4 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.productName}
          className="max-h-full object-contain"
        />
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-brand-orange text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {product.discount}% OFF
          </span>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs font-bold text-brand-blue uppercase">{product.brand}</span>
          <h3 className="text-sm font-bold text-brand-navy line-clamp-2 mt-1">
            {product.productName}
          </h3>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded">
              {product.ratings} <Star size={11} fill="white" />
            </span>
            <span className="text-xs text-slate-400">({product.numReviews})</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-lg font-extrabold text-brand-navy">{formatINR(finalPrice)}</p>
            {product.discount > 0 && (
              <p className="text-xs text-slate-400 line-through">{formatINR(product.price)}</p>
            )}
          </div>
          <button
            onClick={() => dispatch(addToCart({ ...product, finalPrice }))}
            className="flex items-center gap-1.5 bg-brand-blue hover:bg-brand-navy text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition cursor-pointer"
          >
            <ShoppingCart size={15} /> Add
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;