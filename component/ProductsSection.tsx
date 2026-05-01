import Link from "next/link";
import ProductCard from "./ProductCard";
import { Product } from "@prisma/client";


export default function ProductsSection({ products }: { products: Product[] }) {
  
  return (
    <section className="max-w-[1200px] mx-auto px-5 my-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black text-[#1a2332]">المنتجات المميزة</h2>
          <div className="w-12 h-1 bg-[#00c9a7] rounded mt-1.5" />
        </div>
        <Link href="/products" className="text-[#1a5f7a] text-sm font-bold px-5 py-2 border-2 border-[#1a5f7a] rounded-xl hover:bg-[#1a5f7a] hover:text-white transition-all no-underline">
          عرض الكل →
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-[#5a6a7a]">
          <div className="text-5xl mb-4">📦</div>
          <p className="text-lg font-bold">لا توجد منتجات بعد</p>
          <p className="text-sm mt-1">ابدأ بإضافة منتجات من لوحة التحكم</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

          {products.slice(0, 10).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}