import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [activeReview, setActiveReview] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  // Smooth auto-advance for the Client Reviews Carousel
  useEffect(() => {
    if (carouselPaused) return;
    const timer = window.setInterval(() => {
      setActiveReview((prev) => (prev + 1) % CLIENT_TESTIMONIALS.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [carouselPaused]);

  const currentReview = CLIENT_TESTIMONIALS[activeReview];

  const prevReview = () =>
    setActiveReview((prev) => (prev - 1 + CLIENT_TESTIMONIALS.length) % CLIENT_TESTIMONIALS.length);
  const nextReview = () =>
    setActiveReview((prev) => (prev + 1) % CLIENT_TESTIMONIALS.length);

  return (
    <div className="relative min-h-screen w-full bg-black text-[#F5F5F7]">
      <Navbar page="home" />

      {/* ================= FULL-BLEED HERO (Logo at Top + 3D Silicon PCB) ================= */}
      <section className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-black pt-24 pb-16">
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
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-6 text-center sm:px-10">
          <img
            src="/assets/noblenet-logo-darkbg.png"
            alt="NobleNet Software Technologies"
            className="h-32 w-auto object-contain drop-shadow-[0_12px_40px_rgba(41,151,255,0.22)] sm:h-40 lg:h-44"
          />

          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Engineering intelligent software at scale.
          </h1>

          <p className="mt-5 max-w-2xl text-base font-normal text-zinc-400 sm:text-xl">
            Enterprise platforms, e-commerce, cloud infrastructure, and{' '}
            <span className="font-medium text-white">SentinelAI</span>.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="./products.html"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              <span>Explore SentinelAI</span>
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
      </section>

      {/* ================= ABOUT US (Full-Width + 3D NobleNet Logo) ================= */}
      <section
        id="about"
        className="relative w-full border-t border-white/10 bg-[#030508] py-24 lg:py-32"
      >
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="reveal-up grid items-center gap-12 lg:grid-cols-12">
            {/* Left: True 3D Interactive NobleNet Logo */}
            <div className="relative lg:col-span-6">
              <Logo3DCanvas />
            </div>

            {/* Right: Clean Full-Width Typography */}
            <div className="lg:col-span-6 lg:pl-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2997FF]">
                About Us
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Precision software. Zero bloat.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
                NobleNet Software Technologies builds mission-critical websites, e-commerce platforms, cloud infrastructure, and AI-powered DevSecOps systems.
              </p>

              {/* Hairline-divided Architectural Stats Strip */}
              <div className="mt-12 grid grid-cols-2 gap-y-8 border-t border-white/10 pt-10 sm:grid-cols-4 sm:gap-x-8">
                {ABOUT_METRICS.map((m) => (
                  <div key={m.label}>
                    <p className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                      {m.value}
                    </p>
                    <p className="mt-1.5 text-xs font-medium text-zinc-500">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TECHNICAL SERVICES (HORIZONTAL FULL-WIDTH FORMAT + 3D STAGE) ================= */}
      <section
        id="services"
        className="relative w-full border-t border-white/10 bg-black py-24 lg:py-32"
      >
        <div className="w-full px-6 sm:px-10 lg:px-16">
          {/* Header + Active Service Brief */}
          <div className="reveal-up flex flex-col justify-between gap-6 pb-10 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2997FF]">
                Technical Services
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Engineered end to end.
              </h2>
            </div>
            <p className="max-w-lg text-base text-zinc-400">
              Select any capability below to inspect its live 3D technical architecture.
            </p>
          </div>

          {/* Horizontal 4-Column Full-Width Services Strip */}
          <div className="reveal-up grid grid-cols-1 divide-y divide-white/10 border-y border-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {SERVICES.map((service, index) => {
              const isActive = activeService === index;
              return (
                <button
                  key={service.id}
                  type="button"
                  onMouseEnter={() => setActiveService(index)}
                  onFocus={() => setActiveService(index)}
                  onClick={() => setActiveService(index)}
                  className={`group relative flex flex-col justify-between px-1 py-8 text-left transition-all sm:px-6 lg:px-7 ${
                    isActive
                      ? 'bg-white/[0.04] opacity-100'
                      : 'opacity-55 hover:bg-white/[0.02] hover:opacity-90'
                  }`}
                >
                  {/* Active top accent bar */}
                  <span
                    className={`absolute inset-x-0 top-0 h-[2px] transition-opacity ${
                      isActive ? 'bg-[#2997FF] opacity-100' : 'opacity-0'
                    }`}
                  />

                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-semibold tracking-[0.12em] ${
                          isActive ? 'text-[#2997FF]' : 'text-zinc-500'
                        }`}
                      >
                        {service.index}
                      </span>
                      <span
                        className={`h-2 w-2 rounded-full transition-all ${
                          isActive ? 'bg-[#2997FF]' : 'bg-zinc-700'
                        }`}
                      />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      {service.brief}
                    </p>
                  </div>

                  <p className="mt-6 border-t border-white/10 pt-4 text-xs font-medium text-zinc-500">
                    {service.spec}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Full-Width Widescreen 3D Technical Stage */}
          <div className="reveal-up relative w-full overflow-hidden border-b border-white/10 bg-tech-grid pt-4">
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 pb-2">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2997FF]">
                {SERVICES[activeService].modelLabel}
              </span>
              <span className="text-xs font-medium text-zinc-400">
                {SERVICES[activeService].title}
              </span>
            </div>

            <ServicesTechCanvas activeIndex={activeService} />
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS -> OPENS SEPARATE SENTINELAI PAGE ================= */}
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
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2997FF]">
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

          {/* Inline Hairline Specs */}
          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
            <div>
              <p className="text-3xl font-semibold text-white">5 Scanners</p>
              <p className="mt-1 text-xs font-medium text-zinc-500">
                Semgrep · Bandit · GitLeaks · Trivy · OSV
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white">3-Stage AI</p>
              <p className="mt-1 text-xs font-medium text-zinc-500">
                Ollama · Groq · Google Gemini
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white">ast.parse</p>
              <p className="mt-1 text-xs font-medium text-zinc-500">
                Syntax-Validated fix / undo
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white">SARIF 2.1</p>
              <p className="mt-1 text-xs font-medium text-zinc-500">
                JSON · HTML · Markdown · Terminal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CLIENT REVIEWS CAROUSEL -> CLICK TO OPEN CLIENTS PAGE ================= */}
      <section
        className="w-full border-t border-white/10 bg-[#030508] py-24 lg:py-28"
        onMouseEnter={() => setCarouselPaused(true)}
        onMouseLeave={() => setCarouselPaused(false)}
      >
        <div className="reveal-up w-full px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2997FF]">
                What Clients Say
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">
                Trusted across industries.
              </h2>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prevReview}
                aria-label="Previous client review"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition hover:border-white hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={nextReview}
                aria-label="Next client review"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition hover:border-white hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <a
                href="./clients.html"
                className="ml-2 inline-flex items-center gap-1.5 text-sm font-medium text-[#2997FF] transition hover:text-white"
              >
                <span>All Reviews</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Clickable Full-Width Active Review Slide -> Opens Dedicated Clients Page */}
          <a
            href={`./clients.html#${currentReview.id}`}
            className="group block border-b border-white/10 py-14 transition-colors hover:bg-white/[0.02] lg:py-16"
          >
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2997FF]">
                  {currentReview.index} — {currentReview.engagement}
                </p>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-white transition group-hover:text-[#2997FF] sm:text-4xl">
                  {currentReview.client}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">{currentReview.sector}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 transition group-hover:text-white">
                  <span>Click to open full client story</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#2997FF] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>

              <div className="lg:col-span-8 lg:border-l lg:border-white/10 lg:pl-12">
                <blockquote className="text-2xl font-normal leading-[1.35] tracking-[-0.025em] text-zinc-100 sm:text-3xl lg:text-4xl">
                  “{currentReview.quote}”
                </blockquote>
                <p className="mt-6 text-sm text-zinc-400">
                  {currentReview.outcome}
                </p>
              </div>
            </div>
          </a>

          {/* Horizontal Client Selector Tabs */}
          <div className="grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
            {CLIENT_TESTIMONIALS.map((item, idx) => {
              const isSelected = idx === activeReview;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveReview(idx)}
                  className={`relative px-4 py-5 text-left transition ${
                    isSelected ? 'opacity-100' : 'opacity-45 hover:opacity-80'
                  }`}
                >
                  <span
                    className={`absolute inset-x-0 top-0 h-[2px] transition-opacity ${
                      isSelected ? 'bg-[#2997FF] opacity-100' : 'opacity-0'
                    }`}
                  />
                  <p className="text-sm font-semibold text-white">{item.client}</p>
                  <p className="mt-1 text-xs text-zinc-500">{item.engagement}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FINAL INFORMATION, EMAIL & LOCATION WITH MAP ================= */}
      <ContactFooter />
    </div>
  );
}
