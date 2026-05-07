"use client";

import { useState } from "react";
import Link from "next/link";

type CartItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  qty: number;
  image: string;
};

const initialItems: CartItem[] = [
  { id: 1, name: "مجموعة مرايا الفحص الاحترافية", category: "أدوات الفحص",   price: 750,  originalPrice: 1000, qty: 1, image: "🔬" },
  { id: 2, name: "توربين أسنان ألماني عالي السرعة", category: "معدات العيادة", price: 5500, originalPrice: 6200, qty: 1, image: "⚙️" },
  { id: 3, name: "جل التخدير الموضعي 20%",          category: "مواد طبية",    price: 120,  originalPrice: 140,  qty: 2, image: "🧴" },
];

export default function CartPage() {
  const [items, setItems]           = useState<CartItem[]>(initialItems);
  const [coupon, setCoupon]         = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError]     = useState(false);
  const [checkingOut, setCheckingOut]     = useState(false);

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeItem = (id: number) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  const clearCart = () => setItems([]);

  const subtotalOrig = items.reduce((s, i) => s + i.originalPrice * i.qty, 0);
  const subtotal     = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discount     = subtotalOrig - subtotal;
  const couponDisc   = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total        = subtotal - couponDisc;
  const shipping     = total >= 500 ? 0 : 50;
  const finalTotal   = total + shipping;
  const itemCount    = items.reduce((s, i) => s + i.qty, 0);

  const applyCoupon = () => {
    const valid = ["DENTAL10", "PROMO"];
    if (valid.includes(coupon.trim().toUpperCase())) {
      setCouponApplied(true);
      setCouponError(false);
    } else {
      setCouponError(true);
      setCouponApplied(false);
    }
  };

  const fmt = (n: number) => n.toLocaleString("ar-EG") + " ج.م";

  const handleCheckout = async () => {
    setCheckingOut(true);
    await new Promise((r) => setTimeout(r, 1500));
    // هنا هتروح لصفحة الدفع
    setCheckingOut(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-[#e8edf2] p-16 text-center max-w-md">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-black text-[#1a2332] mb-2">السلة فارغة!</h2>
          <p className="text-sm text-[#5a6a7a] mb-6">لم تضف أي منتجات بعد.</p>
          <Link href="/products"
            className="inline-block bg-[#00c9a7] text-[#0d3d50] font-black text-sm px-8 py-3 rounded-xl no-underline hover:bg-[#00b896] transition-all">
            تسوق الآن
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8] py-8 px-4">
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black text-[#1a2332]">
            سلة التسوق <span className="text-[#00c9a7]">({itemCount} منتجات)</span>
          </h1>
          <button onClick={clearCart}
            className="flex items-center gap-2 text-sm font-bold text-[#5a6a7a] border border-[#e2e8f0] px-4 py-2 rounded-xl hover:border-red-400 hover:text-red-400 transition-all bg-white">
            🗑️ إفراغ السلة
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 items-start">

          {/* Items */}
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.id}
                className="bg-white rounded-2xl border border-[#e8edf2] p-4 flex gap-4 items-center hover:border-[#00c9a7] transition-all">

                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#f0f4f8] to-[#e2eaf2] flex items-center justify-center text-4xl flex-shrink-0">
                  {item.image}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-[#00c9a7] font-bold mb-1">{item.category}</div>
                  <div className="text-sm font-bold text-[#1a2332] mb-2 truncate">{item.name}</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base font-black text-[#1a5f7a]">{fmt(item.price)}</span>
                    <span className="text-xs text-gray-400 line-through">{fmt(item.originalPrice)}</span>
                    <span className="text-[10px] bg-[#fff0eb] text-[#ff6b35] font-bold px-2 py-0.5 rounded-full">
                      -{Math.round((1 - item.price / item.originalPrice) * 100)}%
                    </span>
                  </div>
                </div>

                {/* Qty + Total */}
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className="flex items-center border border-[#e2e8f0] rounded-xl overflow-hidden">
                    <button onClick={() => updateQty(item.id, -1)}
                      className="w-9 h-9 flex items-center justify-center text-lg font-black text-[#1a5f7a] hover:bg-[#f0f4f8] transition-colors border-none bg-white cursor-pointer">
                      −
                    </button>
                    <span className="w-9 text-center text-sm font-bold text-[#1a2332]">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)}
                      className="w-9 h-9 flex items-center justify-center text-lg font-black text-[#1a5f7a] hover:bg-[#f0f4f8] transition-colors border-none bg-white cursor-pointer">
                      +
                    </button>
                  </div>
                  <span className="text-sm font-black text-[#1a2332]">
                    {fmt(item.price * item.qty)}
                  </span>
                </div>

                <button onClick={() => removeItem(item.id)}
                  className="text-gray-300 hover:text-red-400 hover:bg-red-50 text-xl p-2 rounded-xl transition-all border-none bg-transparent cursor-pointer flex-shrink-0">
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl border border-[#e8edf2] p-6 lg:sticky lg:top-24">
            <h2 className="text-base font-black text-[#1a2332] pb-4 border-b border-[#f0f4f8] mb-4">
              ملخص الطلب
            </h2>

            <div className="flex flex-col gap-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#5a6a7a]">المجموع الفرعي</span>
                <span className="font-bold text-[#1a2332]">{fmt(subtotalOrig)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#5a6a7a]">الخصم</span>
                <span className="font-bold text-[#00c9a7]">- {fmt(discount + couponDisc)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#5a6a7a]">الشحن</span>
                <span className="font-bold text-[#1a5f7a]">
                  {shipping === 0 ? "مجاني 🎉" : fmt(shipping)}
                </span>
              </div>
            </div>

            <div className="border-t border-dashed border-[#e8edf2] pt-4 mb-5 flex justify-between items-center">
              <span className="text-base font-black text-[#1a2332]">الإجمالي</span>
              <span className="text-2xl font-black text-[#1a5f7a]">{fmt(finalTotal)}</span>
            </div>

            {/* Coupon */}
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="كود الخصم..."
                value={coupon}
                onChange={(e) => { setCoupon(e.target.value); setCouponError(false); }}
                className={`flex-1 bg-[#f8fafc] border-[1.5px] rounded-xl px-4 py-2.5 text-sm font-[Cairo] text-[#1a2332] outline-none transition-all ${
                  couponError ? "border-red-400" : couponApplied ? "border-[#00c9a7]" : "border-[#e2e8f0] focus:border-[#00c9a7]"
                }`}
              />
              <button onClick={applyCoupon}
                className="bg-[#0d3d50] text-white text-sm font-bold px-4 rounded-xl border-none cursor-pointer hover:bg-[#1a5f7a] transition-colors whitespace-nowrap">
                تطبيق
              </button>
            </div>

            {couponApplied && (
              <p className="text-[#00c9a7] text-xs font-bold mb-3">✅ تم تطبيق الكود! خصم 10% إضافي</p>
            )}
            {couponError && (
              <p className="text-red-400 text-xs font-bold mb-3">❌ كود الخصم غير صحيح</p>
            )}

            <button onClick={handleCheckout} disabled={checkingOut}
              className={`w-full py-3.5 rounded-xl font-black text-sm mb-3 transition-all border-none cursor-pointer ${
                checkingOut
                  ? "bg-[#00c9a7]/50 text-[#0d3d50] cursor-not-allowed"
                  : "bg-[#00c9a7] text-[#0d3d50] hover:bg-[#00b896] hover:-translate-y-0.5"
              }`}>
              {checkingOut ? "جاري المعالجة..." : "إتمام الشراء ←"}
            </button>

            <Link href="/products"
              className="block w-full text-center py-3 rounded-xl border border-[#e2e8f0] text-sm font-bold text-[#5a6a7a] hover:border-[#1a5f7a] hover:text-[#1a5f7a] transition-all no-underline mb-4">
              ← متابعة التسوق
            </Link>

            <p className="text-center text-[#aaa] text-xs mb-3">🔒 دفع آمن ومشفر</p>
            <div className="flex gap-2 justify-center">
              {["Visa", "Mastercard", "Fawry", "Cash"].map((p) => (
                <span key={p} className="bg-[#f0f4f8] text-[#5a6a7a] text-[11px] font-bold px-2.5 py-1 rounded-md">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}