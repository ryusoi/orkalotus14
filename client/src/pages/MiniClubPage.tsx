import { useState } from "react";
import { Link } from "wouter";
import {
  Baby,
  ShieldCheck,
  Sparkles,
  Phone,
  CheckCircle2,
  Calendar,
  Clock,
  Users,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import MiniClubInteractive from "@/components/MiniClubInteractive";
import { useLocale } from "@/contexts/LocaleContext";

export default function MiniClubPage() {
  const { locale, setLocale } = useLocale();

  return (
    <PageShell currentLocale={locale} onLocaleChange={setLocale}>
      {/* 1. Hero Page Banner */}
      <section
        className="pagebanner row relative min-h-[360px] sm:min-h-[420px] flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://www.orkalotusbeach.com/wp-content/uploads/2025/07/mini-club-2.jpg)",
        }}
      >
        <div className="bannershade absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />
        <div className="relative z-10 container py-14 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-[11px] uppercase font-bold tracking-widest mb-3">
            <Baby size={14} />
            <span>Ages 4 – 12 Dedicated World</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-white tracking-tight drop-shadow-md">
            MINI CLUB
          </h1>
          <h2 className="font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-amber-300 font-semibold mt-2 drop-shadow">
            SPECIAL FUN FOR CHILDREN
          </h2>
          <p className="text-xs sm:text-sm text-white/90 max-w-2xl mx-auto mt-3 leading-relaxed font-light drop-shadow">
            Enjoy yourselves while your children have an unforgettable holiday in our fun and safe Mini Club area, specially designed for our little guests.
          </p>

          {/* Quick Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs text-white/70 mt-5">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/pools-beach" className="hover:text-white transition-colors">
              Pools &amp; Beach
            </Link>
            <span>/</span>
            <span className="text-amber-300 font-semibold">Mini Club</span>
          </div>
        </div>
      </section>

      {/* 2. Main Page Container */}
      <div className="container py-8 sm:py-10">
        {/* Core Interactive Mini Club Experience */}
        <MiniClubInteractive locale={locale} showFullPageLink={false} />

        {/* 3. Safety, Hygiene & Registration Information */}
        <section className="mt-12 pt-10 border-t border-[var(--line)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-5 rounded-xl bg-[var(--shell)] border border-[var(--line)]">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                <ShieldCheck size={20} />
              </div>
              <h4 className="font-serif text-lg font-medium text-[var(--ink)]">
                Health &amp; Child Safety
              </h4>
              <p className="text-xs text-[var(--ink-soft)] mt-1.5 leading-relaxed">
                Parents sign in their children upon arrival. All craft paints, clays, and cosmetics are certified 100% hypoallergenic, non-toxic, and skin-safe.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--shell)] border border-[var(--line)]">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
                <Sparkles size={20} />
              </div>
              <h4 className="font-serif text-lg font-medium text-[var(--ink)]">
                Mini Disco Every Evening
              </h4>
              <p className="text-xs text-[var(--ink-soft)] mt-1.5 leading-relaxed">
                Every evening at 20:30 at the Garden Stage, children join our animation team for high-energy dancing, action songs, and medal distributions.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--shell)] border border-[var(--line)]">
              <div className="w-9 h-9 rounded-lg bg-[var(--tide-soft)] text-[var(--tide)] flex items-center justify-center mb-3">
                <Phone size={20} />
              </div>
              <h4 className="font-serif text-lg font-medium text-[var(--ink)]">
                Direct Contact &amp; Inquiries
              </h4>
              <p className="text-xs text-[var(--ink-soft)] mt-1.5 leading-relaxed">
                Have specific dietary requirements or questions for our pedagogic team? Contact guest relations or dial extension 444 from your room phone.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Bottom Official Logo Divider */}
        <div className="mt-12 pt-6 pb-4 text-center border-t border-[var(--line)]">
          <img
            src="https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/logo_sub.png"
            alt="Orka Lotus Beach Sub Logo"
            className="max-h-14 mx-auto opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>
    </PageShell>
  );
}
