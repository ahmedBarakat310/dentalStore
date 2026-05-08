"use client";

import { useState, useEffect,Fragment } from "react";

const allDeals = [
  { id: 1, cat: "tools",     icon: "🔬", catLabel: "أدوات الفحص",    name: "مجموعة مرايا الفحص الاحترافية",    newPrice: 500,  oldPrice: 1000, stock: 8,  total: 100, hot: true  },
  { id: 2, cat: "materials", icon: "🧪", catLabel: "مواد الحشو",     name: "كومبوزيت احترافي — عبوة 20 قطعة", newPrice: 480,  oldPrice: 800,  stock: 23, total: 50,  hot: false },
  { id: 3, cat: "equipment", icon: "⚡", catLabel: "أجهزة كهربائية", name: "جهاز تبييض الأسنان LED احترافي",   newPrice: 2100, oldPrice: 3000, stock: 4,  total: 20,  hot: true  },
  { id: 4, cat: "tools",     icon: "🦷", catLabel: "أدوات التقويم",  name: "أسلاك تقويم ستانلس ستيل — كومبو", newPrice: 650,  oldPrice: 1000, stock: 31, total: 50,  hot: false },
  { id: 5, cat: "care",      icon: "🧴", catLabel: "منتجات العناية", name: "باقة العناية الكاملة بالأسنان",    newPrice: 180,  oldPrice: 240,  stock: 55, total: 70,  hot: false },
  { id: 6, cat: "equipment", icon: "🛡️", catLabel: "التعقيم",       name: "جهاز الأوتوكلاف 18L — ضمان سنة",  newPrice: 7120, oldPrice: 8900, stock: 6,  total: 20,  hot: true  },
];

const filters = [
  { label: "الكل",    value: "all"       },
  { label: "أدوات",  value: "tools"     },
  { label: "مواد",   value: "materials" },
  { label: "أجهزة",  value: "equipment" },
  { label: "عناية",  value: "care"      },
];

function useCountdown() {
  const [time, setTime] = useState({ h: 23, m: 59, s: 47 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0)   h = 23;
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

export default function DealsPage() {
  const [active, setActive] = useState("all");
  const { h, m, s } = useCountdown();
  const pad = (n: number) => String(n).padStart(2, "0");

  const filtered = allDeals.filter((d) => active === "all" || d.cat === active);

  return (
    <div className="min-h-screen bg-[#f0f4f8]">

      {/* Hero */}
      <div className="bg-[#0d3d50] py-12 px-5 text-center">
        <h1 className="text-white text-3xl font-black mb-2">🔥 عروض وخصومات حصرية</h1>
        <p className="text-white/60 text-sm mb-7">أقوى العروض على أفضل مستلزمات طب الأسنان — لفترة محدودة!</p>

        {/* Countdown */}
        <div className="flex justify-center gap-3 items-center">
          {[{ v: h, l: "ساعة" }, { v: m, l: "دقيقة" }, { v: s, l: "ثانية" }].map((t, i) => (
            <Fragment key={t.l}>
              {i > 0 && <span className="text-[#00c9a7] text-2xl font-black mb-3">:</span>}
              <div key={t.l} className="bg-white/10 rounded-xl px-4 py-3 min-w-[70px] text-center">
                <span className="text-[#00c9a7] text-3xl font-black block">{pad(t.v)}</span>
                <span className="text-white/50 text-xs mt-1 block">{t.l}</span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1100px] mx-auto px-4 py-8">

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {filters.map((f) => (
            <button key={f.value} onClick={() => setActive(f.value)}
              className={`px-4 py-2 rounded-xl text-sm font-bold border-[1.5px] transition-all ${
                active === f.value
                  ? "bg-[#0d3d50] border-[#0d3d50] text-white"
                  : "bg-white border-[#e2e8f0] text-[#5a6a7a] hover:border-[#00c9a7] hover:text-[#00c9a7]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((deal) => {
            const soldPct = Math.round(((deal.total - deal.stock) / deal.total) * 100);
            const discPct = Math.round((1 - deal.newPrice / deal.oldPrice) * 100);
            return (
              <div key={deal.id} className="bg-white rounded-2xl border border-[#e8edf2] overflow-hidden hover:border-[#00c9a7] hover:-translate-y-1 transition-all">
                <div className="h-40 bg-[#f0f4f8] flex items-center justify-center text-5xl relative">
                  {deal.icon}
                  <span className="absolute top-2 right-2 bg-[#ff6b35] text-white text-xs font-black px-2.5 py-1 rounded-full">
                    -{discPct}%
                  </span>
                  {deal.hot && (
                    <span className="absolute top-2 left-2 bg-[#e24b4a] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {deal.stock <= 5 ? "⏰ آخر فرصة" : "🔥 الأكثر مبيعاً"}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-[11px] text-[#00c9a7] font-bold mb-1">{deal.catLabel}</div>
                  <div className="text-sm font-bold text-[#1a2332] mb-2 leading-snug line-clamp-2">{deal.name}</div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base font-black text-[#1a5f7a]">{deal.newPrice.toLocaleString()} ج.م</span>
                    <span className="text-xs text-gray-400 line-through">{deal.oldPrice.toLocaleString()}</span>
                  </div>
                  {/* Progress */}
                  <div className="mb-3">
                    <div className="flex justify-between text-[11px] text-[#5a6a7a] mb-1">
                      <span>المتبقي: {deal.stock} قطعة</span>
                      <span>{soldPct}% منتهي</span>
                    </div>
                    <div className="bg-[#f0f4f8] rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${soldPct >= 70 ? "bg-[#ff6b35]" : "bg-[#00c9a7]"}`}
                        style={{ width: `${soldPct}%` }}
                      />
                    </div>
                  </div>
                  <button className="w-full bg-[#1a5f7a] text-white text-sm font-bold py-2.5 rounded-xl hover:bg-[#0d3d50] transition-colors border-none cursor-pointer">
                    + أضف للسلة
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}