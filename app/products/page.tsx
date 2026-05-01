
import ContactSection from '@/component/ContactSection'
import HeroBanners from '@/component/HeroBanners'


import ProductsSection from '@/component/ProductsSection';
import { getProducts } from '../lib/products';

const page = async () => {
  
  const products =await getProducts(); // جلب من الداتابيز مباشرة
 
  return (
    <>
    <HeroBanners/>
    {products.length > 0 ? (
      <div className="max-w-[1200px] mx-auto px-5 py-10">
        <h2 className="text-2xl font-bold mb-6">منتجاتنا</h2>
     <ProductsSection products={products} />
      </div>
    ) : (
      <div className="max-w-[1200px] mx-auto px-5 py-10">
        <h2 className="text-2xl font-bold mb-6">منتجاتنا</h2>
        <p className="text-gray-500">لا توجد منتجات متاحة حالياً.</p>
      </div>
    )}
    <ContactSection/>
    </>
  )
}

export default page