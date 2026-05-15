"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [cartCount] = useState(3);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await fetch("/api/me");

      if (res.ok) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    } catch (error) {
      setIsAuth(false);
    }
  };

  checkAuth();
}, );
const handleLogout = async () => {
  await fetch("/api/logout", {
    method: "POST",
  });

  window.location.href = "/";
};
  const navLinks = [
    { label: "الرئيسية",    href: "/" },
    { label: "المنتجات",    href: "/products" },
    { label: "العروض",      href: "/deals" },
    { label: "من نحن",      href: "/about" },
    { label: "لوحة التحكم", href: "/dashboard/add-product" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#00c9a7] text-[#0d3d50] text-center py-1.5 text-xs font-bold">
        🎉 شحن مجاني على الطلبات فوق 5000 جنيه &nbsp;|&nbsp; 📞 01278389339
      </div>

      {/* Main Nav */}
      <nav className="sticky top-0 z-50 bg-[#0d3d50] shadow-lg">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 py-3 gap-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 no-underline shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00c9a7] to-[#1a5f7a] flex items-center justify-center text-xl">
              🦷
            </div>
            <div>
              <div className="text-white text-base font-black leading-none">DentalPro</div>
              <div className="text-[#00c9a7] text-[10px] tracking-widest">DENTAL STORE</div>
            </div>
          </Link>

          {/* Search — hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-[320px] rounded-xl overflow-hidden border border-white/20 bg-white/10">
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              className="flex-1 bg-transparent outline-none px-4 py-2 text-white placeholder-white/50 text-sm"
            />
            <button className="bg-[#00c9a7] px-4 text-base hover:bg-[#00b896] transition-colors">
              🔍
            </button>
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex gap-1 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/85 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-bold no-underline transition-all block"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Actions + Cart + Hamburger */}
          <div className="flex items-center gap-2">
            
            {/* Desktop only buttons */}
            {isAuth ? ( <>
           
             <Link
              href="/"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-[#00c9a7] text-[#0d3d50] hover:bg-[#00b896] transition-all no-underline"
            onClick={handleLogout}>
             تسجيل الخروج
            </Link>
             <Link href="/profile" className="hidden sm:inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-[#00c9a7] text-[#0d3d50] hover:bg-[#00b896] transition-all no-underline">
              ملفي
            </Link>
            </>):( <>
                 <Link
              href="/login"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold text-white border border-white/25 bg-white/10 hover:bg-white/20 transition-all no-underline"
             >
              تسجيل الدخول
            </Link>
            <Link
              href="/register"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-[#00c9a7] text-[#0d3d50] hover:bg-[#00b896] transition-all no-underline"
            >
              إنشاء حساب
            </Link>
            </>)}
       
         

            {/* Cart — always visible */}
            <Link
              href="/cart"
              className="relative p-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 transition-all text-white text-lg no-underline"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#ff6b35] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 rounded-xl bg-white/10 border border-white/20 gap-1.5 transition-all hover:bg-white/20"
              aria-label="القائمة"
            >
              <span
                className={`block w-5 h-0.5 bg-white rounded transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-white rounded transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-white rounded transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* ===== MOBILE MENU ===== */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-[#0a2f3f] border-t border-white/10 px-4 py-4 flex flex-col gap-3">

            {/* Mobile Search */}
            <div className="flex rounded-xl overflow-hidden border border-white/20 bg-white/10">
              <input
                type="text"
                placeholder="ابحث عن منتج..."
                className="flex-1 bg-transparent outline-none px-4 py-2.5 text-white placeholder-white/50 text-sm"
              />
              <button className="bg-[#00c9a7] px-4 text-base hover:bg-[#00b896] transition-colors">
                🔍
              </button>
            </div>

            {/* Mobile Nav Links */}
            <ul className="list-none flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-white/85 hover:text-white hover:bg-white/10 px-4 py-2.5 rounded-xl text-sm font-bold no-underline transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Auth Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center py-2.5 rounded-xl text-sm font-bold text-white border border-white/25 bg-white/10 hover:bg-white/20 transition-all no-underline"
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center py-2.5 rounded-xl text-sm font-bold bg-[#00c9a7] text-[#0d3d50] hover:bg-[#00b896] transition-all no-underline"
              >
                إنشاء حساب
              </Link>
            </div>

          </div>
        </div>
      </nav>
    </>
  );
}