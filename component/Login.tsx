   "use client";

import Link from "next/link";
import { useState } from "react";

const Login = () => {



  const [showPass, setShowPass] = useState(false);
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email || !password) { setError("من فضلك ادخل البريد وكلمة المرور"); return }
    if (!email.includes("@")) { setError("البريد الإلكتروني غير صحيح"); return }
    if (password.length < 6)  { setError("كلمة المرور قصيرة جداً (6 أحرف على الأقل)"); return }

setLoading(true);

try {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    setError(data.message || "Login failed");
    return;
  }

  setSuccess(true);
} catch (err) {
  setError("Server error");
} finally {
  setLoading(false);
}
    setLoading(false);
    setSuccess(true);

  };

  return (
    <main className="min-h-screen bg-[#0d1f2d] grid grid-cols-1 lg:grid-cols-2">

      {/* ===== LEFT PANEL ===== */}
      <div className="hidden lg:flex flex-col justify-center items-center px-12 py-16 bg-[#0d3d50] relative overflow-hidden">
        <div className="absolute w-[300px] h-[300px] rounded-full bg-[#00c9a7]/[0.06] -top-20 -left-20" />
        <div className="absolute w-[200px] h-[200px] rounded-full bg-[#00c9a7]/[0.04] -bottom-12 -right-12" />

        {/* Brand */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00c9a7] to-[#1a5f7a] flex items-center justify-center text-3xl">
            🦷
          </div>
          <div>
            <div className="text-white text-2xl font-black leading-none">DentalPro</div>
            <div className="text-[#00c9a7] text-xs tracking-[2px] mt-1">DENTAL STORE</div>
          </div>
        </div>

        <div className="text-[90px] animate-[float_3s_ease-in-out_infinite] mb-6">🦷</div>

        <h2 className="text-white text-2xl font-black text-center mb-3">أهلاً بك من جديد</h2>
        <p className="text-white/50 text-sm text-center leading-relaxed max-w-[240px] mb-10">
          سجّل دخولك وتسوق أفضل مستلزمات طب الأسنان بأسعار لا تُقاوَم
        </p>

        <div className="flex flex-col gap-3 w-full max-w-[260px]">
          {[
            { icon: "🚚", text: "شحن سريع لكل مكان" },
            { icon: "🔒", text: "دفع آمن 100%" },
            { icon: "⭐", text: "منتجات أصلية معتمدة" },
            { icon: "🎁", text: "عروض حصرية للأعضاء" },
          ].map((f) => (
            <div key={f.text} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#00c9a7]/15 flex items-center justify-center text-sm flex-shrink-0">
                {f.icon}
              </div>
              <span className="text-white/65 text-sm">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== RIGHT PANEL ===== */}
      <div className="flex items-center justify-center px-5 py-12 bg-[#0a1e2b]">
        <div className="w-full max-w-[400px] bg-[#0d2d3f] rounded-2xl border border-white/[0.08] p-9">

          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-2 mb-7">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00c9a7] to-[#1a5f7a] flex items-center justify-center text-lg">🦷</div>
            <div className="text-white font-black">DentalPro</div>
          </div>

          <h1 className="text-white text-2xl font-black mb-1">تسجيل الدخول</h1>
          <p className="text-white/40 text-sm mb-7">أدخل بياناتك للوصول لحسابك</p>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 text-red-300 text-sm mb-5 flex items-center gap-2">
              ❌ {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="bg-[#00c9a7]/10 border border-[#00c9a7]/25 rounded-xl px-4 py-3 text-[#00c9a7] text-sm mb-5 flex items-center gap-2">
              ✅ تم تسجيل الدخول بنجاح!
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div>
              <label className="block text-white/70 text-sm font-bold mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base text-white/30">✉️</span>
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.06] border-[1.5px] border-white/10 rounded-xl px-4 py-3 pr-11 text-white text-sm outline-none placeholder-white/25 focus:border-[#00c9a7] focus:bg-[#00c9a7]/[0.06] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/70 text-sm font-bold mb-2">كلمة المرور</label>
              <div className="relative">
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base text-white/30">🔒</span>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.06] border-[1.5px] border-white/10 rounded-xl px-4 py-3 pr-11 pl-11 text-white text-sm outline-none placeholder-white/25 focus:border-[#00c9a7] focus:bg-[#00c9a7]/[0.06] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/70 transition-colors bg-transparent border-none cursor-pointer text-base"
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-[#00c9a7] cursor-pointer" />
                <span className="text-white/55 text-sm">تذكرني</span>
              </label>
              <button type="button" className="text-[#00c9a7] text-sm font-bold bg-transparent border-none cursor-pointer hover:text-[#00e6c0] transition-colors">
                نسيت كلمة المرور؟
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-black text-[#0d3d50] text-base transition-all ${
                loading
                  ? "bg-[#00c9a7]/50 cursor-not-allowed"
                  : "bg-[#00c9a7] hover:bg-[#00b896] hover:-translate-y-0.5"
              }`}
            >
              {loading ? "جاري الدخول..." : "دخول"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/[0.08]" />
              <span className="text-white/30 text-xs">أو</span>
              <div className="flex-1 h-px bg-white/[0.08]" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full bg-white/[0.06] border-[1.5px] border-white/10 rounded-xl py-3 text-white/70 text-sm font-bold hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              متابعة بـ Google
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center mt-6 text-white/40 text-sm">
            مش عندك حساب؟{" "}
            <Link href="/register" className="text-[#00c9a7] font-bold no-underline hover:text-[#00e6c0] transition-colors">
              إنشاء حساب جديد
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}


export default Login