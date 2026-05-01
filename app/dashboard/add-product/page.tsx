'use client';

import { useState } from 'react';


function StockBadge({ stock }: { stock: string }) {
  const val = parseInt(stock);
  if (!stock) return null;

  if (val === 0)  return <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-700 font-medium mt-1">● نفد المخزون</span>;
  if (val <= 5)   return <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium mt-1">● مخزون منخفض</span>;
  return           <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-medium mt-1">● متوفر</span>;
}

export default function AddProductPage() {
  const [category, setCategory] = useState('tools');
  const [isActive, setIsActive] = useState(true);
  const [stock, setStock]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setLoading(true);

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:        formData.get('name'),
        description: formData.get('description'),
        price:       Number(formData.get('price')),
        stock:       Number(formData.get('stock')),
       category: category || 'tools',
        isActive,
      }),
    });

    setLoading(false);

    if (res.ok) {
      form.reset();
      setStock('');
      setCategory('tools');
      setIsActive(true);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };
  const CATEGORIES = [
    { name: 'tools', icon: '🔧', label: 'أدوات يدوية' },
    { name: 'materials', icon: '🧪', label: 'مواد طبية' },
    { name: 'equipment', icon: '⚡', label: 'أجهزة كهربائية' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <p className="text-xs text-gray-400 mb-1">لوحة التحكم / المنتجات / <span className="text-gray-500">منتج جديد</span></p>
          <h1 className="text-2xl font-semibold text-gray-900">إضافة منتج جديد</h1>
          <p className="text-sm text-gray-500 mt-1">أضف منتجًا إلى كتالوج المتجر</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">

            {/* معلومات المنتج */}
            <div className="p-6 border-b border-gray-100">
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-4">معلومات المنتج</p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  اسم المنتج <span className="text-red-400">*</span>
                </label>
                <input
                  name="name"
                  required
                  placeholder="مثال: مرآة فم طبية"
                  className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">الوصف</label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="وصف مختصر للمنتج، مواصفاته واستخداماته..."
                  className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition resize-none"
                />
              </div>
            </div>

            {/* الفئة */}
            <div className="p-6 border-b border-gray-100">
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-4">الفئة</p>
              <div className="grid grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setCategory(cat.name)}
                    className={`py-3 px-2 rounded-lg border text-center transition-all ${
                      category === cat.name
                        ? 'border-[#00c9a7] bg-[#00c9a7]/10 shadow-sm'
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg block mb-1">{cat.icon}</span>
                    <span className={`text-xs font-medium ${category === cat.name ? 'text-[#00c9a7]' : 'text-gray-500'}`}>
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* السعر والمخزون */}
            <div className="p-6 border-b border-gray-100">
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-4">التسعير والمخزون</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">
                    السعر <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      required
                      className="w-full pl-12 pr-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">ج.م</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">المخزون</label>
                  <input
                    name="stock"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                  />
                  <StockBadge stock={stock} />
                </div>
              </div>
            </div>

            {/* حالة المنتج */}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">حالة المنتج</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {isActive ? 'المنتج مفعّل ويظهر في المتجر' : 'المنتج مخفي ولا يظهر في المتجر'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={`relative w-10 h-[22px] rounded-full transition-colors duration-200 ${isActive ? 'bg-teal-500' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-[3px] w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${isActive ? 'left-[3px]' : 'right-[3px]'}`} />
                </button>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="flex gap-2 mt-3 bg-gray-100 rounded-xl p-3">
            <button
              type="button"
              onClick={() => { setStock(''); setCategory('tools'); setIsActive(true); }}
              className="px-4 py-2.5 text-sm text-gray-500 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white bg-[#00c9a7] hover:bg-[#00b896] cursor-pointer rounded-lg transition disabled:opacity-70"
            >
              {loading && (
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
                </svg>
              )}
              {loading ? 'جاري الإضافة...' : 'إضافة المنتج'}
            </button>
          </div>
        </form>

        {/* Toast */}
        {success && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-sm px-5 py-3 rounded-xl shadow-lg animate-bounce">
            تم إضافة المنتج بنجاح 🎉
          </div>
        )}

      </div>
    </div>
  );
}