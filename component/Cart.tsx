"use client";

import { useState } from "react";

type Item = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

export default function CartPage() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "مرآة فم طبية", price: 120, qty: 1 },
    { id: 2, name: "جهاز تنظيف الأسنان", price: 850, qty: 1 },
  ]);

  const increase = (id: number) => {
    setItems(items.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));
  };

  const decrease = (id: number) => {
    setItems(items.map(i => i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i));
  };

  const remove = (id: number) => {
    setItems(items.filter(i => i.id !== id));
  };

  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);

  return (
    <main className="min-h-screen bg-[#0a1e2b] px-5 py-10 text-white">

      <div className="max-w-[1100px] mx-auto">

        {/* Title */}
        <h1 className="text-2xl font-black mb-6">🛒 سلة المشتريات</h1>

        {items.length === 0 ? (
          <p className="text-white/40">السلة فارغة</p>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">

            {/* المنتجات */}
            <div className="lg:col-span-2 flex flex-col gap-4">

              {items.map((item) => (
                <div key={item.id}
                  className="bg-[#0d2d3f] border border-white/10 rounded-xl p-4 flex items-center justify-between">

                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-white/40 text-sm">{item.price} ج.م</p>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-3">

                    <button onClick={() => decrease(item.id)}
                      className="w-7 h-7 rounded-md bg-white/10 hover:bg-white/20">-</button>

                    <span>{item.qty}</span>

                    <button onClick={() => increase(item.id)}
                      className="w-7 h-7 rounded-md bg-white/10 hover:bg-white/20">+</button>

                  </div>

                  {/* حذف */}
                  <button onClick={() => remove(item.id)}
                    className="text-red-400 text-sm hover:text-red-300">
                    حذف
                  </button>
                </div>
              ))}

            </div>

            {/* Summary */}
            <div className="bg-[#0d2d3f] border border-white/10 rounded-xl p-5 h-fit">

              <h2 className="font-bold mb-4">ملخص الطلب</h2>

              <div className="flex justify-between text-sm text-white/50 mb-2">
                <span>عدد المنتجات</span>
                <span>{items.length}</span>
              </div>

              <div className="flex justify-between text-sm text-white/50 mb-4">
                <span>الإجمالي</span>
                <span>{total} ج.م</span>
              </div>

              <button className="w-full py-3 rounded-xl font-black text-[#0d3d50] bg-[#00c9a7] hover:bg-[#00b896] transition">
                إتمام الشراء
              </button>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}