import { useState } from 'react';
import { ArrowUpRight, ArrowRight, ChevronDown } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ContactFooter } from './components/Footer';
import { HeroTechCanvas } from './components/three/HeroTechCanvas';
import { Logo3DCanvas } from './components/three/Logo3DCanvas';
import { ServicesTechCanvas } from './components/three/ServicesTechCanvas';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useRevealObserver } from './hooks/useReveal';
import { ABOUT_METRICS, CLIENT_TESTIMONIALS, SERVICES } from './data/company';

export default function App() {
  useSmoothScroll();
  useRevealObserver();

  const [activeService, setActiveService] = useState(0);

  return (
    <div className="relative min-h-screen w-full bg-black text-[#F5F5F7]">
      <Navbar page="home" />

      {/* ================= FULL-BLEED HERO (Logo at Top + 3D Silicon PCB) ================= */}
      <section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-black pt-24">
        {/* Full-screen interactive 3D Silicon Microprocessor & PCB Canvas */}
        <div className="absolute inset-0 z-0 opacity-90">
          <HeroTechCanvas />
        </div>

        {/* Subtle vertical vignette so text remains razor-sharp */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/80 via-black/35 to-black"
        />

        {/* Centered Top Brand Logo + Flagship Display Headline */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 text-center sm:px-10">
          {/* Official NobleNet Logo prominently featured at top */}
          <img
            src="/assets/noblenet-logo-darkbg.png"
            alt="NobleNet Software Technologies"
            className="h-32 w-auto object-contain drop-shadow-[0_12px_40px_rgba(41,151,255,0.22)] sm:h-40 lg:h-44"
          />

          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Engineering intelligent software at scale.
          </h1>

          <p className="mt-5 max-w-2xl text-base font-normal text-zinc-400 sm:text-xl">
            Enterprise platforms, cloud infrastructure, neural systems — and{' '}
            <span className="text-white font-medium">Sentinel AI</span>.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="./products.html"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              <span>Explore Sentinel AI</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-md transition hover:border-white/50 hover:bg-white/10"
            >
              <span>View Services</span>
            </a>
          </div>
        </div>

        {/* Scroll Cue */}
        <div className="relative z-10 flex w-full items-center justify-between border-t border-white/10 px-6 py-4 text-xs text-zinc-500 sm:px-10 lg:px-16">
          <span className="font-mono uppercase tracking-[0.18em]">
            3D Silicon &amp; Bus Telemetry
          </span>
          <a
            href="#about"
            className="inline-flex items-center gap-1.5 text-zinc-400 transition hover:text-white"
          >
            <span>Scroll</span>
            <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
          </a>
        </div>
      </section>

      {/* ================= ABOUT US (Full-Width + 3D NobleNet Logo, Zero Small Cards) ================= */}
      <section
        id="about"
        className="relative w-full border-t border-white/10 bg-[#030508] py-24 lg:py-32"
      >
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="reveal-up grid items-center gap-12 lg:grid-cols-12">
            {/* Left: True 3D Interactive NobleNet Logo */}
            <div className="relative lg:col-span-6">
              <Logo3DCanvas />
              <p className="mt-2 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Interactive 3D Identity — Move cursor to inspect depth
              </p>
            </div>

            {/* Right: Clean Full-Width Big Tech Typography (No Small Cards, No Big Paragraphs) */}
            <div className="lg:col-span-6 lg:pl-8">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#2997FF]">
                About Us
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Precision software. Zero bloat.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
                NobleNet Software Technologies builds mission-critical applications, cloud architecture, and autonomous AI systems for organizations that demand reliability.
              </p>

              {/* Hairline-divided Architectural Stats Strip (No Cards) */}
              <div className="mt-12 grid grid-cols-2 gap-y-8 border-t border-white/10 pt-10 sm:grid-cols-4 sm:gap-x-8">
                {ABOUT_METRICS.map((m) => (
                  <div key={m.label}>
                    <p className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                      {m.value}
                    </p>
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES (Full-Width Widescreen + 4 Genuine 3D Technical Models) ================= */}
      <section
        id="services"
        className="relative w-full border-t border-white/10 bg-black py-24 lg:py-32"
      >
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="reveal-up flex flex-col justify-between gap-4 border-b border-white/10 pb-10 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#2997FF]">
                Services
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Technical capabilities.
              </h2>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
              Select a service to inspect its 3D architecture
            </p>
          </div>

          <div className="reveal-up mt-4 grid items-center gap-12 lg:grid-cols-12">
            {/* Left: Full-bleed Hairline Rows (Zero Small Cards) */}
            <div className="divide-y divide-white/10 lg:col-span-5">
              {SERVICES.map((service, index) => {
                const isActive = activeService === index;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onMouseEnter={() => setActiveService(index)}
                    onFocus={() => setActiveService(index)}
                    onClick={() => setActiveService(index)}
                    className={`group flex w-full flex-col py-7 text-left transition-all ${
                      isActive ? 'opacity-100' : 'opacity-50 hover:opacity-85'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="flex items-baseline gap-4">
                        <span
                          className={`font-mono text-xs ${
                            isActive ? 'text-[#2997FF]' : 'text-zinc-600'
                          }`}
                        >
                          {service.index}
                        </span>
                        <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                          {service.title}
                        </h3>
                      </div>
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full transition-all ${
                          isActive ? 'bg-[#2997FF] scale-125' : 'bg-zinc-700'
                        }`}
                      />
                    </div>
                    <p className="mt-2.5 pl-9 text-sm leading-relaxed text-zinc-400 sm:text-base">
                      {service.tagline}
                    </p>
                    <p className="mt-3 pl-9 font-mono text-[11px] tracking-wide text-zinc-500">
                      {service.spec}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right: Widescreen 3D Technical Architecture Stage */}
            <div className="relative lg:col-span-7">
              <div className="relative w-full overflow-hidden border-y border-white/10 bg-tech-grid py-4 lg:border-l lg:border-y-0 lg:pl-6">
                <div className="flex items-center justify-between px-2 pb-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#2997FF]">
                    {SERVICES[activeService].modelLabel}
                  </span>
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Real-Time 3D
                  </span>
                </div>

                <ServicesTechCanvas activeIndex={activeService} />

                <div className="flex items-center justify-between border-t border-white/10 px-2 pt-3 font-mono text-[11px] text-zinc-500">
                  <span>{SERVICES[activeService].spec}</span>
                  <span>0{activeService + 1} / 04</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS -> OPENS SEPARATE SENTINEL AI PAGE ================= */}
      <section
        id="products"
        className="relative w-full overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#040812] via-[#060D1E] to-black py-28 lg:py-36"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[780px] -translate-x-1/2 rounded-full bg-[#2997FF]/12 blur-[140px]"
        />

        <div className="reveal-up relative w-full px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#2997FF]">
                Products • PyPI Package (nitaanth-sentinelai v0.1.1)
              </p>
              <h2 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                SentinelAI.
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-zinc-400 sm:text-xl">
                Deterministic multi-scanner DevSecOps CLI &amp; Python library — orchestrating Semgrep, Bandit, GitLeaks, Trivy, and OSV-Scanner with grounded multi-agent AI analysis and AST-validated remediation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="./products.html"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#2997FF] px-8 py-4 text-sm font-medium text-white transition hover:bg-[#1C88F0]"
              >
                <span>Open SentinelAI Docs</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* Inline Hairline Specs (Real PyPI Facts, Zero Bluff) */}
          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
            <div>
              <p className="text-3xl font-semibold text-white">5 Scanners</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                Semgrep · Bandit · GitLeaks · Trivy · OSV
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white">3-Stage AI</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                Ollama · Groq · Google Gemini
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white">ast.parse</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                Syntax-Validated fix / undo
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white">SARIF 2.1</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                JSON · HTML · Markdown · Terminal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CLIENTS STRIP -> OPENS DEDICATED WHAT CLIENTS SAY PAGE ================= */}
      <section className="w-full border-t border-white/10 bg-black py-20 lg:py-24">
        <div className="reveal-up w-full px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">
                Trusted By
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
                What our clients say.
              </h2>
            </div>
            <a
              href="./clients.html"
              className="group inline-flex items-center gap-2 text-sm font-medium text-[#2997FF] transition hover:text-white"
            >
              <span>Open Client Testimonials</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="mt-12 grid divide-y divide-white/10 border-y border-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
            {CLIENT_TESTIMONIALS.map((item, idx) => (
              <a
                key={item.id}
                href="./clients.html"
                className={`group flex flex-col justify-between py-7 transition hover:bg-white/[0.02] sm:px-6 ${
                  idx > 0 ? 'lg:border-l lg:border-white/10' : 'lg:pl-0'
                }`}
              >
                <span className="font-mono text-[11px] text-zinc-500">{item.sector}</span>
                <span className="mt-3 text-xl font-semibold tracking-[-0.025em] text-white transition group-hover:text-[#2997FF]">
                  {item.client}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL INFORMATION, EMAIL & LOCATION ================= */}
      <ContactFooter />
    </div>
  );
}
