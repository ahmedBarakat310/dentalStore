"use client";

import { useState } from "react";

function StockBadge({ stock }: { stock: string }) {
  const val = parseInt(stock);

  if (!stock) return null;

  if (val === 0)
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-700 font-medium mt-1">
        ● نفد المخزون
      </span>
    );

  if (val <= 5)
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium mt-1">
        ● مخزون منخفض
      </span>
    );

  return (
    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-medium mt-1">
      ● متوفر
    </span>
  );
}

export default function AddProductPage() {
  const [category, setCategory] = useState("tools");
  const [isActive, setIsActive] = useState(true);
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [image, setImage] = useState<File | null>(null);

  const CATEGORIES = [
    { name: "tools", icon: "🔧", label: "أدوات يدوية" },
    { name: "materials", icon: "🧪", label: "مواد طبية" },
    { name: "equipment", icon: "⚡", label: "أجهزة كهربائية" },
  ];

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    setLoading(true);

    let imageUrl = "";

    // upload image
    if (image) {
      const imageForm = new FormData();

      imageForm.append("file", image);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: imageForm,
      });

      const uploadData = await uploadRes.json();

      imageUrl = uploadData.imageUrl;
    }

    // create product
    const res = await fetch("/api/products", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: formData.get("name"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        stock: Number(formData.get("stock")),
        category,
        isActive,
        image: imageUrl,
      }),
    });

    setLoading(false);

    if (res.ok) {
      form.reset();

      setStock("");
      setCategory("tools");
      setIsActive(true);
      setImage(null);

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs text-gray-400 mb-1">
            لوحة التحكم / المنتجات /
            <span className="text-gray-500">
              {" "}
              منتج جديد
            </span>
          </p>

          <h1 className="text-2xl font-semibold text-gray-900">
            إضافة منتج جديد
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            أضف منتجًا إلى كتالوج المتجر
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            {/* معلومات المنتج */}
            <div className="p-6 border-b border-gray-100">
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-4">
                معلومات المنتج
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  اسم المنتج
                </label>

                <input
                  name="name"
                  required
                  placeholder="مثال: مرآة فم طبية"
                  className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  الوصف
                </label>

                <textarea
                  name="description"
                  rows={3}
                  placeholder="وصف مختصر للمنتج"
                  className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg resize-none"
                />
              </div>
            </div>

            {/* صورة المنتج */}
       <div className="p-6 border-b border-gray-100">
  <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-4">
    صورة المنتج
  </p>

  <label className="cursor-pointer block">
    <div
      className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 transition ${
        image
          ? "border-[#00c9a7] bg-[#00c9a7]/5"
          : "border-gray-300 bg-gray-50 hover:bg-gray-100"
      }`}
    >
      {!image ? (
        <>
          <div className="text-3xl mb-2">📤</div>

          <p className="text-sm font-medium text-gray-700">
            اضغط لرفع صورة
          </p>

          <p className="text-xs text-gray-400 mt-1">
            PNG, JPG, WEBP (يفضل صورة واضحة)
          </p>
        </>
      ) : (
        <div className="text-center">
          <img
            src={URL.createObjectURL(image)}
            className="w-24 h-24 object-cover rounded-lg mx-auto mb-2 border"
          />

          <p className="text-sm font-medium text-gray-700">
            تم اختيار الصورة
          </p>

          <p className="text-xs text-gray-400 mt-1">
            {image.name}
          </p>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          setImage(e.target.files?.[0] || null);
        }}
      />
    </div>
  </label>
</div>
            {/* الفئة */}
            <div className="p-6 border-b border-gray-100">
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-4">
                الفئة
              </p>

              <div className="grid grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() =>
                      setCategory(cat.name)
                    }
                    className={`py-3 px-2 rounded-lg border ${
                      category === cat.name
                        ? "border-[#00c9a7] bg-[#00c9a7]/10"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <span className="text-lg block mb-1">
                      {cat.icon}
                    </span>

                    <span className="text-xs font-medium">
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* السعر والمخزون */}
            <div className="p-6 border-b border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1.5">
                    السعر
                  </label>

                  <input
                    name="price"
                    type="number"
                    required
                    className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1.5">
                    المخزون
                  </label>

                  <input
                    name="stock"
                    type="number"
                    value={stock}
                    onChange={(e) =>
                      setStock(e.target.value)
                    }
                    className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg"
                  />

                  <StockBadge stock={stock} />
                </div>
              </div>
            </div>

            {/* الحالة */}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    حالة المنتج
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setIsActive(!isActive)
                  }
                  className={`relative w-10 h-[22px] rounded-full ${
                    isActive
                      ? "bg-teal-500"
                      : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-[3px] w-4 h-4 bg-white rounded-full ${
                      isActive
                        ? "left-[3px]"
                        : "right-[3px]"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-[#00c9a7] text-white rounded-xl"
            >
              {loading
                ? "جاري الإضافة..."
                : "إضافة المنتج"}
            </button>
          </div>
        </form>

        {/* Success */}
        {success && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-sm px-5 py-3 rounded-xl">
            تم إضافة المنتج بنجاح 🎉
          </div>
        )}
      </div>
    </div>
  );
}