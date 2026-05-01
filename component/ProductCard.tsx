"use client";

import { useState } from "react";
import img from '@/public/flower.jpg'
type Product = {
  id: number;
  name: string;
  price: number;
  category: string | null;
  image: string | null;
  stock: number;
};

export default function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    // هنا هتضيف للسلة بعدين
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#e8edf2] hover:translate-y-[-6px] hover:shadow-xl transition-all duration-300 cursor-pointer group">
      
      {/* Product Image */}
      <div className="h-44 bg-gradient-to-br from-[#f0f4f8] to-[#e2eaf2] flex items-center justify-center text-6xl relative">
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        ) : (
        //   <span>🦷</span>
            <img src={img.src} alt="Placeholder" className="h-full w-full object-cover" />
        )}
        {product.stock < 5 && product.stock > 0 && (
          <span className="absolute top-2 right-2 bg-[#ff6b35] text-white text-xs font-bold px-3 py-1 rounded-full">
            آخر {product.stock} قطع
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-2 right-2 bg-gray-400 text-white text-xs font-bold px-3 py-1 rounded-full">
            نفذت الكمية
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs text-[#5a6a7a] mb-1">{product.category || "عام"}</p>
        <h3 className="text-sm font-bold text-[#1a2332] mb-3 line-clamp-2 leading-relaxed">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-lg font-black text-[#1a5f7a]">{product.price.toLocaleString()} ج.م</span>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full mt-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
            added
              ? "bg-[#00c9a7] text-white"
              : product.stock === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#1a5f7a] text-white hover:bg-[#0d3d50]"
          }`}
        >
          {added ? "✅ تمت الإضافة" : product.stock === 0 ? "نفذت الكمية" : "+ أضف للسلة"}
        </button>
      </div>
    </div>
  );
}