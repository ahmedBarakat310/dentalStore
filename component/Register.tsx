"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [showPass, setShowPass]   = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [strength, setStrength]   = useState(0);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState(false);

  const [form, setForm] = useState({
    firstName: "", lastName: "",
    email: "", phone: "",
    password: "", confirmPassword: "",
    agreed: false,
  });

  const update = (k: string, v: string | boolean) =>
    setForm((p) => ({ ...p, [k]: v }));

  const checkStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 6)                          score++;
    if (pass.length >= 10)                         score++;
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass))                score++;
    setStrength(score);
  };

  const strengthColor = ["#e24b4a", "#ff6b35", "#f0c040", "#00c9a7"][Math.max(0, strength - 1)];
  const strengthLabel = ["ضعيفة", "مقبولة", "جيدة", "قوية"][Math.max(0, strength - 1)];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess(false);

    if (!form.firstName || !form.lastName)
      return setError("من فضلك ادخل اسمك الأول واسم العائلة");
    if (!form.email || !form.email.includes("@"))
      return setError("البريد الإلكتروني غير صحيح");
    if (!form.phone || form.phone.length < 9)
      return setError("رقم الهاتف غير صحيح");
    if (form.password.length < 6)
      return setError("كلمة المرور لازم تكون 6 أحرف على الأقل");
    if (form.password !== form.confirmPassword)
      return setError("كلمة المرور وتأكيدها مش متطابقين");
    if (!form.agreed)
      return setError("لازم توافق على الشروط والأحكام");
setLoading(true);

try {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: form.firstName + " " + form.lastName,
      email: form.email,
      password: form.password,
      phone: form.phone,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    setError(data.message || "حدث خطأ");
    setLoading(false);
    return;
  }

  setSuccess(true);
} catch (err) {
  setError("Server error");
} finally {
  setLoading(false);
}
  };

  return (
    <main className="min-h-screen bg-[#0d1f2d] grid grid-cols-1 lg:grid-cols-2">

      {/* ===== LEFT PANEL ===== */}
      <div className="hidden lg:flex flex-col justify-center items-center px-10 py-16 bg-[#0d3d50] relative overflow-hidden">
        <div className="absolute w-[280px] h-[280px] rounded-full bg-[#00c9a7]/[0.06] -top-16 -left-16" />
        <div className="absolute w-[180px] h-[180px] rounded-full bg-[#00c9a7]/[0.04] -bottom-10 -right-10" />

        {/* Brand */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00c9a7] to-[#1a5f7a] flex items-center justify-center text-2xl">🦷</div>
          <div>
            <div className="text-white text-xl font-black leading-none">DentalPro</div>
            <div className="text-[#00c9a7] text-[10px] tracking-[2px] mt-1">DENTAL STORE</div>
          </div>
        </div>

        <h2 className="text-white text-xl font-black text-center mb-2">إنشاء حساب جديد</h2>
        <p className="text-white/45 text-sm text-center leading-relaxed max-w-[220px] mb-8">
          انضم لآلاف الأطباء والعيادات اللي بتثق في DentalPro
        </p>

        {/* Steps */}
        <div className="flex flex-col gap-0 w-full max-w-[240px]">
          {[
            { label: "البيانات الشخصية",  desc: "الاسم والبريد الإلكتروني", done: true  },
            { label: "بيانات الاتصال",     desc: "رقم الهاتف والعنوان",      done: true  },
            { label: "كلمة المرور",         desc: "تأمين الحساب",             done: false },
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3 relative">
              {i < 2 && (
                <div className="absolute right-[15px] top-9 w-0.5 h-9 bg-[#00c9a7]/20" />
              )}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 border-[1.5px] ${
                step.done
                  ? "bg-[#00c9a7] border-[#00c9a7] text-[#0d3d50]"
                  : "bg-[#00c9a7]/15 border-[#00c9a7]/30 text-[#00c9a7]"
              }`}>
                {step.done ? "✓" : i + 1}
              </div>
              <div className="pb-7">
                <div className="text-white text-sm font-bold">{step.label}</div>
                <div className="text-white/40 text-xs mt-0.5">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== RIGHT PANEL ===== */}
      <div className="flex items-center justify-center px-5 py-10 bg-[#0a1e2b]">
        <div className="w-full max-w-[410px] bg-[#0d2d3f] rounded-2xl border border-white/[0.08] p-8">

          {/* Mobile Brand */}
          <div className="flex lg:hidden items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00c9a7] to-[#1a5f7a] flex items-center justify-center text-lg">🦷</div>
            <div className="text-white font-black">DentalPro</div>
          </div>

          <h1 className="text-white text-xl font-black mb-1">إنشاء الحساب</h1>
          <p className="text-white/40 text-sm mb-5">أدخل بياناتك وابدأ التسوق فوراً</p>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-2.5 text-red-300 text-xs mb-4 flex items-center gap-2">
              ❌ {error}
            </div>
          )}
          {success && (
            <div className="bg-[#00c9a7]/10 border border-[#00c9a7]/22 rounded-xl px-4 py-2.5 text-[#00c9a7] text-xs mb-4 flex items-center gap-2">
              ✅ تم إنشاء الحساب بنجاح! جاري التوجيه...
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">

            {/* Name Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-white/65 text-xs font-bold mb-1.5">الاسم الأول</label>
                <div className="relative">
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/28">👤</span>
                  <input type="text" placeholder="أحمد" value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    className="w-full bg-white/[0.06] border-[1.5px] border-white/10 rounded-xl px-3 py-2.5 pr-9 text-white text-sm outline-none placeholder-white/22 focus:border-[#00c9a7] focus:bg-[#00c9a7]/[0.06] transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/65 text-xs font-bold mb-1.5">اسم العائلة</label>
                <div className="relative">
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/28">👤</span>
                  <input type="text" placeholder="محمد" value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    className="w-full bg-white/[0.06] border-[1.5px] border-white/10 rounded-xl px-3 py-2.5 pr-9 text-white text-sm outline-none placeholder-white/22 focus:border-[#00c9a7] focus:bg-[#00c9a7]/[0.06] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-white/65 text-xs font-bold mb-1.5">البريد الإلكتروني</label>
              <div className="relative">
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/28">✉️</span>
                <input type="email" placeholder="example@email.com" value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full bg-white/[0.06] border-[1.5px] border-white/10 rounded-xl px-3 py-2.5 pr-9 text-white text-sm outline-none placeholder-white/22 focus:border-[#00c9a7] focus:bg-[#00c9a7]/[0.06] transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-white/65 text-xs font-bold mb-1.5">رقم الهاتف</label>
              <div className="flex gap-2">
                <select className="bg-white/[0.06] border-[1.5px] border-white/10 rounded-xl px-2 py-2.5 text-white text-xs outline-none w-20 flex-shrink-0 focus:border-[#00c9a7] transition-all">
                  <option>🇪🇬 +20</option>
                  <option>🇸🇦 +966</option>
                  <option>🇦🇪 +971</option>
                  <option>🇰🇼 +965</option>
                </select>
                <div className="relative flex-1">
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/28">📱</span>
                  <input type="tel" placeholder="1xxxxxxxxx" value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="w-full bg-white/[0.06] border-[1.5px] border-white/10 rounded-xl px-3 py-2.5 pr-9 text-white text-sm outline-none placeholder-white/22 focus:border-[#00c9a7] focus:bg-[#00c9a7]/[0.06] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/65 text-xs font-bold mb-1.5">كلمة المرور</label>
              <div className="relative">
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/28">🔒</span>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => { update("password", e.target.value); checkStrength(e.target.value); }}
                  className="w-full bg-white/[0.06] border-[1.5px] border-white/10 rounded-xl px-3 py-2.5 pr-9 pl-10 text-white text-sm outline-none placeholder-white/22 focus:border-[#00c9a7] focus:bg-[#00c9a7]/[0.06] transition-all"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/65 transition-colors bg-transparent border-none cursor-pointer text-sm">
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
              {/* Strength Bar */}
              {form.password && (
                <div className="flex gap-1 items-center mt-1.5">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="flex-1 h-1 rounded-full transition-all duration-300"
                      style={{ background: n <= strength ? strengthColor : "rgba(255,255,255,0.1)" }}
                    />
                  ))}
                  <span className="text-[11px] mr-1 min-w-[36px]" style={{ color: strength > 0 ? strengthColor : "rgba(255,255,255,0.35)" }}>
                    {strength > 0 ? strengthLabel : "ضعيفة"}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-white/65 text-xs font-bold mb-1.5">تأكيد كلمة المرور</label>
              <div className="relative">
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/28">🔒</span>
                <input
                  type={showPass2 ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  className={`w-full bg-white/[0.06] border-[1.5px] rounded-xl px-3 py-2.5 pr-9 pl-10 text-white text-sm outline-none placeholder-white/22 transition-all ${
                    form.confirmPassword && form.password !== form.confirmPassword
                      ? "border-red-500/50 bg-red-500/[0.04]"
                      : form.confirmPassword && form.password === form.confirmPassword
                      ? "border-[#00c9a7]/50"
                      : "border-white/10 focus:border-[#00c9a7] focus:bg-[#00c9a7]/[0.06]"
                  }`}
                />
                <button type="button" onClick={() => setShowPass2(!showPass2)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/65 transition-colors bg-transparent border-none cursor-pointer text-sm">
                  {showPass2 ? "🙈" : "👁️"}
                </button>
              </div>
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-red-400 text-[11px] mt-1">كلمة المرور مش متطابقة</p>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={form.agreed}
                onChange={(e) => update("agreed", e.target.checked)}
                className="w-4 h-4 mt-0.5 flex-shrink-0 accent-[#00c9a7] cursor-pointer"
              />
              <span className="text-white/50 text-xs leading-relaxed">
                أوافق على{" "}
                <Link href="#" className="text-[#00c9a7] no-underline hover:text-[#00e6c0]">شروط الاستخدام</Link>
                {" "}و
                <Link href="#" className="text-[#00c9a7] no-underline hover:text-[#00e6c0]">سياسة الخصوصية</Link>
                {" "}الخاصة بـ DentalPro
              </span>
            </label>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className={`w-full py-3 rounded-xl font-black text-[#0d3d50] text-sm transition-all ${
                loading ? "bg-[#00c9a7]/40 cursor-not-allowed" : "bg-[#00c9a7] hover:bg-[#00b896] hover:-translate-y-0.5"
              }`}>
              {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/[0.08]" />
              <span className="text-white/28 text-xs">أو</span>
              <div className="flex-1 h-px bg-white/[0.08]" />
            </div>

            {/* Google */}
            <button type="button"
              className="w-full bg-white/[0.06] border-[1.5px] border-white/10 rounded-xl py-2.5 text-white/65 text-sm font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              التسجيل بـ Google
            </button>
          </form>

          <p className="text-center mt-5 text-white/38 text-sm">
            عندك حساب بالفعل؟{" "}
            <Link href="/login" className="text-[#00c9a7] font-bold no-underline hover:text-[#00e6c0] transition-colors">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}