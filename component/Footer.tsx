import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0d1f2d] text-white pt-12">
      <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00c9a7] to-[#1a5f7a] flex items-center justify-center text-xl">🦷</div>
            <div>
              <div className="text-lg font-black">DentalPro</div>
              <div className="text-[#00c9a7] text-xs tracking-widest">DENTAL STORE</div>
            </div>
          </div>
          <p className="text-white/60 text-xs leading-relaxed mb-4">
            متجرك الأول والأكبر لمستلزمات طب الأسنان في مصر. أفضل المنتجات من أعرق الماركات العالمية.
          </p>
          <div className="flex gap-2">
            {["📘", "📸", "🐦", "💼"].map((icon, i) => (
              <div key={i} className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#00c9a7] transition-colors text-base">
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold mb-4">روابط سريعة</h4>
          <ul className="flex flex-col gap-2.5 list-none">
            {[["الرئيسية", "/"], ["المنتجات", "/products"], ["العروض", "/offers"], ["من نحن", "/about"], ["تواصل معنا", "/contact"]].map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="text-white/60 hover:text-[#00c9a7] text-xs no-underline transition-all flex items-center gap-1.5 hover:pr-1">
                  ← {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-sm font-bold mb-4">خدمة العملاء</h4>
          <ul className="flex flex-col gap-2.5 list-none">
            {[["سياسة الإرجاع", "#"], ["الشحن والتوصيل", "#"], ["الأسئلة الشائعة", "#"], ["الضمان والصيانة", "#"], ["تتبع الطلب", "#"]].map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="text-white/60 hover:text-[#00c9a7] text-xs no-underline transition-all flex items-center gap-1.5 hover:pr-1">
                  ← {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-sm font-bold mb-4">النشرة البريدية</h4>
          <p className="text-white/60 text-xs leading-relaxed mb-3">
            اشترك واحصل على أحدث العروض والمنتجات مباشرة في بريدك.
          </p>
          <div className="flex rounded-xl overflow-hidden">
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              className="flex-1 bg-white/10 border-none outline-none px-4 py-2.5 text-white text-xs font-[Cairo] placeholder-white/40"
            />
            <button className="bg-[#00c9a7] text-[#0d3d50] px-4 text-xs font-bold hover:bg-[#00b896] transition-colors">
              اشتراك
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/8 max-w-[1200px] mx-auto px-5 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-white/40 text-xs">© 2026 AhmedBarakat. جميع الحقوق محفوظة.</p>
        <div className="flex gap-2">
          {["Visa", "Mastercard", "Fawry", "Cash"].map((p) => (
            <span key={p} className="bg-white/10 rounded-md px-2.5 py-1 text-[11px] font-bold text-white/60">{p}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}