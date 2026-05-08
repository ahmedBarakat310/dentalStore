const stats = [
  { num: "+15",  label: "سنة خبرة"      },
  { num: "+5000", label: "منتج متاح"    },
  { num: "+200", label: "عيادة شريكة"   },
  { num: "98%",  label: "رضا العملاء"   },
];

const values = [
  { icon: "✅", bg: "bg-[#e1f5ee]", title: "الجودة أولاً",    desc: "كل منتج يمر بفحص دقيق قبل وصوله إليك"              },
  { icon: "🚀", bg: "bg-[#e6f1fb]", title: "سرعة التوصيل",   desc: "توصيل سريع لكل محافظات مصر في 24-48 ساعة"         },
  { icon: "🤝", bg: "bg-[#fff0eb]", title: "دعم متخصص",      desc: "فريق من الخبراء لمساعدتك في اختيار المنتج المناسب" },
  { icon: "🔒", bg: "bg-[#eeedfe]", title: "أمان الدفع",     desc: "جميع المدفوعات مشفرة وآمنة 100%"                   },
];

const team = [
  { initials: "أم", name: "د. أحمد محمود", role: "المؤسس والمدير التنفيذي", color: "bg-[#1a5f7a]" },
  { initials: "سح", name: "سارة حسن",      role: "مدير المبيعات",            color: "bg-[#00c9a7]" },
  { initials: "مع", name: "احمد بركات",      role: "مدير التقنية",             color: "bg-[#7c3aed]" },
  { initials: "نر", name: "نورا رضا",      role: "خدمة العملاء",             color: "bg-[#ff6b35]" },
];

const timeline = [
  { year: "2010", icon: "🌱", title: "البداية",        desc: "افتتاح أول متجر في القاهرة مع 200 منتج"            },
  { year: "2014", icon: "📈", title: "التوسع",         desc: "إطلاق الموقع الإلكتروني وتغطية كل المحافظات"      },
  { year: "2018", icon: "🌍", title: "الانطلاق العربي", desc: "دخول أسواق السعودية والإمارات والكويت"            },
  { year: "2024", icon: "🚀", title: "الريادة",        desc: "أكثر من 5000 منتج و200 عيادة شريكة"               },
];

function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e8edf2] p-7">
      {children}
    </div>
  );
}

function SectionTitle({ emoji, label }: { emoji: string; label: string }) {
  return (
    <h2 className="text-lg font-black text-[#1a2332] mb-5 flex items-center gap-2">
      {emoji} <span className="text-[#00c9a7]">{label}</span>
    </h2>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f0f4f8]">

      {/* Hero */}
      <div className="bg-[#0d3d50] py-14 px-5 text-center">
        <h1 className="text-white text-3xl font-black mb-3">🦷 من نحن</h1>
        <p className="text-white/60 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
          متجر DentalPro — وجهتك الأولى لمستلزمات طب الأسنان في مصر والعالم العربي منذ 2010
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          {stats.map((s) => (
            <div key={s.label} className="bg-white/10 rounded-xl px-5 py-4 min-w-[100px] text-center">
              <span className="text-[#00c9a7] text-2xl font-black block">{s.num}</span>
              <span className="text-white/60 text-xs mt-1 block">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1000px] mx-auto px-4 py-8 flex flex-col gap-5">

        {/* Story */}
        <Section>
          <SectionTitle emoji="🎯" label="قصتنا" />
          <p className="text-[#5a6a7a] text-sm leading-relaxed">
            بدأت DentalPro عام 2010 برؤية بسيطة: توفير أفضل مستلزمات طب الأسنان للأطباء والعيادات في مصر بجودة عالمية وأسعار منافسة. من متجر صغير في القاهرة، نمونا لنصبح المنصة الرائدة في المنطقة مع شبكة موردين تمتد لأكثر من 30 دولة حول العالم.
          </p>
        </Section>

        {/* Values */}
        <Section>
          <SectionTitle emoji="💎" label="قيمنا" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {values.map((v) => (
              <div key={v.title} className="flex gap-4 items-start p-4 bg-[#f8fafc] rounded-xl border border-[#e8edf2]">
                <div className={`w-11 h-11 rounded-xl ${v.bg} flex items-center justify-center text-xl flex-shrink-0`}>
                  {v.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1a2332] mb-1">{v.title}</div>
                  <div className="text-xs text-[#5a6a7a] leading-relaxed">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Team */}
        <Section>
          <SectionTitle emoji="👥" label="فريق العمل" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {team.map((t) => (
              <div key={t.name} className="bg-[#f8fafc] rounded-2xl border border-[#e8edf2] p-5 text-center">
                <div className={`w-14 h-14 rounded-full ${t.color} flex items-center justify-center text-white text-lg font-black mx-auto mb-3`}>
                  {t.initials}
                </div>
                <div className="text-sm font-bold text-[#1a2332] mb-1">{t.name}</div>
                <div className="text-[11px] text-[#00c9a7] font-bold">{t.role}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Timeline */}
        <Section>
          <SectionTitle emoji="📅" label="رحلتنا" />
          <div className="flex flex-col gap-0">
            {timeline.map((t, i) => (
              <div key={t.year} className="flex gap-4 relative">
                {i < timeline.length - 1 && (
                  <div className="absolute right-[19px] top-10 w-0.5 bg-[#e8edf2]" style={{ height: "calc(100% - 12px)" }} />
                )}
                <div className="w-10 h-10 rounded-full bg-[#e1f5ee] border-2 border-[#00c9a7] flex items-center justify-center text-base flex-shrink-0">
                  {t.icon}
                </div>
                <div className="pb-6">
                  <div className="text-xs font-bold text-[#00c9a7] mb-1">{t.year}</div>
                  <div className="text-sm font-bold text-[#1a2332] mb-1">{t.title}</div>
                  <div className="text-xs text-[#5a6a7a] leading-relaxed">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  );
}