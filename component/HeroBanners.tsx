import Link from "next/link";

export default function HeroBanners() {
  return (
    <section className="bg-gradient-to-br from-[#0d3d50] via-[#1a5f7a] to-[#1e7a9a] px-5 py-12 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-7 items-center">
        
        {/* Big Banner - 50% Off */}
        <Link href="/products" className="no-underline">
          <div className="relative bg-gradient-to-br from-[#ff6b35] to-[#ff4500] rounded-2xl p-10 min-h-[280px] flex flex-col justify-between overflow-hidden cursor-pointer hover:scale-[1.01] transition-transform">
            <div className="absolute bottom-[-20px] right-[-10px] text-[120px] opacity-15 select-none">🦷</div>
            <div>
              <span className="inline-block bg-white/25 text-white px-4 py-1 rounded-full text-xs font-bold mb-3">⚡ عرض محدود</span>
              <h2 className="text-white text-3xl font-black leading-tight mb-2">
                أدوات الأسنان<br />الاحترافية
              </h2>
              <div className="text-[#f0c040] text-6xl font-black leading-none drop-shadow-lg">
                <span className="text-3xl">خصم </span>50<span className="text-3xl">%</span>
              </div>
              <p className="text-white/85 text-sm mt-2">على جميع المعدات والأدوات المختارة</p>
            </div>
            <div className="mt-5 inline-block bg-white text-[#ff6b35] px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg transition-shadow w-fit">
              تسوق الآن ←
            </div>
          </div>
        </Link>

        {/* Side Banners */}
        <div className="flex flex-col gap-4">
          {/* 30% Off */}
          <Link href="/products?category=materials" className="no-underline">
            <div className="relative bg-gradient-to-br from-[#0d6e6e] to-[#00c9a7] rounded-2xl p-6 min-h-[128px] flex flex-col justify-center overflow-hidden cursor-pointer hover:translate-x-[-4px] transition-transform">
              <div className="absolute left-[-20px] top-[-20px] w-20 h-20 rounded-full bg-white/8" />
              <div className="text-[#f0c040] text-4xl font-black leading-none">
                <span className="text-lg">خصم </span>30<span className="text-lg">%</span>
              </div>
              <h3 className="text-white text-sm font-bold mt-1">مواد الحشو والتركيبات</h3>
              <p className="text-white/75 text-xs mt-1">عروض على أفضل الماركات العالمية</p>
            </div>
          </Link>

          {/* 40% Off */}
          <Link href="/products?category=equipment" className="no-underline">
            <div className="relative bg-gradient-to-br from-[#4a1d8a] to-[#7c3aed] rounded-2xl p-6 min-h-[128px] flex flex-col justify-center overflow-hidden cursor-pointer hover:translate-x-[-4px] transition-transform">
              <div className="absolute left-[-20px] top-[-20px] w-20 h-20 rounded-full bg-white/8" />
              <div className="text-[#f0c040] text-4xl font-black leading-none">
                <span className="text-lg">خصم </span>40<span className="text-lg">%</span>
              </div>
              <h3 className="text-white text-sm font-bold mt-1">أجهزة التعقيم والتنظيف</h3>
              <p className="text-white/75 text-xs mt-1">احصل عليها قبل نفاد الكمية</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}