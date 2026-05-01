import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0d1f2d] flex flex-col items-center justify-center px-5 py-16 relative overflow-hidden">

      {/* Background Circles */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#00c9a7]/[0.04] -top-28 -right-24 pointer-events-none" />
      <div className="absolute w-[250px] h-[250px] rounded-full bg-[#00c9a7]/[0.04] -bottom-20 -left-14 pointer-events-none" />

      {/* Floating Dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#00c9a7]/10 animate-bounce"
            style={{
              width:  `${Math.floor(Math.random() * 18 + 6)}px`,
              height: `${Math.floor(Math.random() * 18 + 6)}px`,
              left:   `${10 + i * 9}%`,
              top:    `${20 + (i % 5) * 15}%`,
              animationDuration: `${3 + (i % 4)}s`,
              animationDelay:    `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Tooth SVG */}
      <svg
        className="w-44 h-44 mb-6 animate-[float_3s_ease-in-out_infinite]"
        viewBox="0 0 180 180"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(-14px); }
          }
        `}</style>
        <circle cx="90" cy="90" r="80" fill="#1a3a50" />
        <circle cx="90" cy="90" r="72" fill="none" stroke="#00c9a7" strokeWidth="1" strokeDasharray="6 4" opacity="0.4" />
        <g transform="translate(90,88)">
          <path
            d="M0,-38 C-8,-38 -18,-30 -22,-18 C-26,-6 -24,4 -20,12 C-16,20 -14,28 -16,38 C-15,42 -12,44 -8,42 C-4,40 -2,34 0,28 C2,34 4,40 8,42 C12,44 15,42 16,38 C14,28 16,20 20,12 C24,4 26,-6 22,-18 C18,-30 8,-38 0,-38 Z"
            fill="#ffffff"
            stroke="#00c9a7"
            strokeWidth="1.5"
          />
          <path
            d="M-10,-10 L-10,10 M0,-14 L0,14 M10,-10 L10,10"
            stroke="#00c9a7"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>
        <text
          x="90" y="170"
          textAnchor="middle"
          fill="#00c9a7"
          fontSize="11"
          fontFamily="Cairo"
          fontWeight="700"
          opacity="0.7"
        >
          DENTAL PRO
        </text>
      </svg>

      {/* 404 */}
      <h1 className="text-[110px] font-black text-[#1a5f7a] leading-none tracking-[-4px]">
        4<span className="text-[#00c9a7]">0</span>4
      </h1>

      {/* Badge */}
      <span className="bg-[#00c9a7] text-[#0d3d50] text-xs font-bold px-5 py-1.5 rounded-full mt-4 mb-2 tracking-wider">
        الصفحة غير موجودة
      </span>

      {/* Text */}
      <h2 className="text-white text-xl font-black text-center mt-2 mb-2">
        آه، يبدو إن الصفحة دي اتخلعت! 🦷
      </h2>
      <p className="text-white/50 text-sm text-center leading-relaxed max-w-sm mb-8">
        الصفحة اللي بتدور عليها مش موجودة أو اتنقلت لمكان تاني.
        <br />
        جرب تدور على المنتج اللي عاوزه أو ارجع للرئيسية.
      </p>

      {/* Search Bar */}
      <div className="flex w-full max-w-sm rounded-xl overflow-hidden border border-white/15 bg-white/7 mb-6">
        <input
          type="text"
          placeholder="ابحث عن منتج..."
          className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-white text-sm font-[Cairo] placeholder-white/35"
        />
        <button className="bg-[#1a5f7a] hover:bg-[#0d3d50] text-white px-5 text-base transition-colors">
          🔍
        </button>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 flex-wrap justify-center">
        <Link
          href="/"
          className="bg-[#00c9a7] text-[#0d3d50] font-bold text-sm px-7 py-3 rounded-xl hover:bg-[#00b896] hover:-translate-y-0.5 transition-all no-underline"
        >
          🏠 الصفحة الرئيسية
        </Link>
        <Link
          href="/products"
          className="bg-white/8 text-white/85 font-bold text-sm px-7 py-3 rounded-xl border border-white/15 hover:bg-white/14 transition-all no-underline"
        >
          عرض المنتجات
        </Link>
      </div>

    </main>
  );
}