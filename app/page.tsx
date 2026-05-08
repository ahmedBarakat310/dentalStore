

import HeroBanners from "@/component/HeroBanners";

import ProductsSection from "@/component/ProductsSection";
import ContactSection from "@/component/ContactSection";
import { Product } from "@prisma/client";
import { getProducts } from "./lib/products";

// // Categories Bar
function CategoriesBar() {
  const cats = [
    { icon: "🏠", label: "الكل" },
    { icon: "🔧", label: "أدوات يدوية" },
    { icon: "⚡", label: "أجهزة كهربائية" },
    { icon: "🧪", label: "مواد طبية" },
    { icon: "🦷", label: "تقويم الأسنان" },
    { icon: "🧴", label: "منتجات العناية" },
    { icon: "📦", label: "باقات وعروض" },
  ];
  return (
    <div className="bg-white border-b border-[#e8edf2]">
      <div className="max-w-[1200px] mx-auto flex overflow-x-auto scrollbar-none">
        {cats.map((cat, i) => (
          <div key={i} className="flex items-center gap-2 px-6 py-4 text-sm font-bold text-[#5a6a7a] hover:text-[#1a5f7a] border-b-[3px] border-transparent hover:border-[#1a5f7a] cursor-pointer whitespace-nowrap transition-all flex-shrink-0">
            <span className="text-xl">{cat.icon}</span>
            {cat.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// // Stats Bar
function StatsBar() {
  const stats = [
    { num: "+5000", label: "منتج متاح", color: "text-[#1a5f7a]" },
    { num: "+200", label: "عيادة شريكة", color: "text-[#00c9a7]" },
    { num: "+15", label: "سنة خبرة", color: "text-[#ff6b35]" },
    { num: "24/7", label: "دعم فني مستمر", color: "text-[#7c3aed]" },
  ];
  return (
    <div className="bg-white border-t border-b border-[#e8edf2] py-8">
      <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 text-center px-5">
        {stats.map((s, i) => (
          <div key={i}>
            <div className={`text-3xl font-black ${s.color}`}>{s.num}</div>
            <div className="text-[#5a6a7a] text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
  export const revalidate = 0;


export default async function HomePage() {

  const products: Product[] = await getProducts(); // جلب من الداتابيز مباشرة 

  return (
    <>
      <HeroBanners />
      <CategoriesBar />
      <ProductsSection products={products} />
      <StatsBar />
      <ContactSection />
    </>
  );
}
