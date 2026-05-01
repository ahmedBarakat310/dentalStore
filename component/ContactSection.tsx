"use client";

import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "استفسار عن منتج", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section className="bg-gradient-to-br from-[#0d3d50] to-[#1a5f7a] px-5 py-16 mt-12">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Contact Info */}
        <div>
          <h2 className="text-white text-3xl font-black mb-3">تواصل معنا</h2>
          <p className="text-white/80 text-sm leading-relaxed mb-6">
            فريقنا المتخصص في خدمتكم على مدار الساعة. سواء كنت تحتاج استشارة في اختيار المنتج أو تتابع طلبك، نحن هنا.
          </p>
          <div className="flex flex-col gap-4">
            {[
              { icon: "📍", text: "القاهرة، مصر — المنطقة الطبية، شارع المعهد القومي" },
              { icon: "📞", text: "01000000000 | 01111111111" },
              { icon: "✉️", text: "info@dentalpro.com" },
              { icon: "🕐", text: "السبت – الخميس: 9 صباحاً – 8 مساءً" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-white/85 text-sm">
                <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                  {item.icon}
                </div>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-8">
          <h3 className="text-xl font-black text-[#1a2332] mb-5">أرسل رسالتك</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#5a6a7a] mb-1.5">الاسم</label>
                <input
                  type="text" placeholder="اسمك الكريم" required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 border-[1.5px] border-[#e2e8f0] rounded-xl text-sm font-[Cairo] outline-none focus:border-[#1a5f7a] bg-[#fafbfc] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5a6a7a] mb-1.5">الهاتف</label>
                <input
                  type="tel" placeholder="01xxxxxxxxx"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-2.5 border-[1.5px] border-[#e2e8f0] rounded-xl text-sm font-[Cairo] outline-none focus:border-[#1a5f7a] bg-[#fafbfc] transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#5a6a7a] mb-1.5">البريد الإلكتروني</label>
              <input
                type="email" placeholder="example@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 border-[1.5px] border-[#e2e8f0] rounded-xl text-sm font-[Cairo] outline-none focus:border-[#1a5f7a] bg-[#fafbfc] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#5a6a7a] mb-1.5">الموضوع</label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-2.5 border-[1.5px] border-[#e2e8f0] rounded-xl text-sm font-[Cairo] outline-none focus:border-[#1a5f7a] bg-[#fafbfc] transition-colors"
              >
                <option>استفسار عن منتج</option>
                <option>طلب عرض سعر</option>
                <option>متابعة طلب</option>
                <option>شكوى أو اقتراح</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#5a6a7a] mb-1.5">الرسالة</label>
              <textarea
                placeholder="اكتب رسالتك هنا..." rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 border-[1.5px] border-[#e2e8f0] rounded-xl text-sm font-[Cairo] outline-none focus:border-[#1a5f7a] bg-[#fafbfc] transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${sent ? "bg-[#00c9a7] text-white" : "bg-[#1a5f7a] text-white hover:bg-[#0d3d50]"}`}
            >
              {sent ? "✅ تم الإرسال بنجاح!" : "إرسال الرسالة 📤"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}