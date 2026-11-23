import { useEffect, useRef, useState } from 'react';
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
  const touchStartX = useRef<number | null>(null);

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

  const handleReviewTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleReviewTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 45) {
      if (delta < 0) nextReview();
      else prevReview();
    }
    touchStartX.current = null;
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-[#F5F5F7]">
      <Navbar page="home" />

      {/* ================= FULL-BLEED HERO (Mobile-safe 100svh + 3D Silicon PCB) ================= */}
      <section className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-black pt-24 pb-12 sm:pt-28 sm:pb-16">
        {/* Full-screen interactive 3D Silicon Microprocessor & PCB Canvas */}
        <div className="absolute inset-0 z-0 opacity-90">
          <HeroTechCanvas />
        </div>

        {/* Subtle vertical vignette so text remains razor-sharp */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/80 via-black/40 to-black"
        />

        {/* Centered Top Brand Logo + Flagship Display Headline */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-4 text-center sm:px-8">
          <img
            src="/assets/noblenet-logo-darkbg.png"
            alt="NobleNet Software Technologies"
            className="h-24 w-auto object-contain drop-shadow-[0_12px_40px_rgba(41,151,255,0.22)] sm:h-36 md:h-40 lg:h-44"
          />

          <h1 className="mt-5 max-w-4xl text-3xl font-semibold leading-[1.06] tracking-[-0.04em] text-white sm:mt-6 sm:text-5xl md:text-6xl lg:text-7xl">
            Engineering intelligent software at scale.
          </h1>

          <p className="mt-4 max-w-2xl text-sm font-normal text-zinc-400 sm:mt-5 sm:text-lg md:text-xl">
            Enterprise platforms, e-commerce, cloud infrastructure, and{' '}
            <span className="font-medium text-white">SentinelAI</span>.
          </p>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:gap-4">
            <a
              href="./products.html"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition hover:bg-zinc-200 sm:w-auto"
            >
              <span>Explore SentinelAI</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#services"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-black/45 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-md transition hover:border-white/50 hover:bg-white/10 sm:w-auto"
            >
              <span>View Services</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= ABOUT US (Full-Width + 3D NobleNet Logo) ================= */}
      <section
        id="about"
        className="relative w-full border-t border-white/10 bg-[#030508] py-16 sm:py-24 lg:py-32"
      >
        <div className="w-full px-4 sm:px-8 lg:px-16">
          <div className="reveal-up grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left: True 3D Interactive NobleNet Logo */}
            <div className="relative min-w-0 lg:col-span-6">
              <Logo3DCanvas />
            </div>

            {/* Right: Clean Full-Width Typography */}
            <div className="min-w-0 lg:col-span-6 lg:pl-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2997FF]">
                About Us
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:mt-4 sm:text-5xl lg:text-6xl">
                Precision software. Zero bloat.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:mt-6 sm:text-lg">
                NobleNet Software Technologies builds mission-critical websites, e-commerce platforms, cloud infrastructure, and AI-powered DevSecOps systems.
              </p>

              {/* Hairline-divided Architectural Stats Strip */}
              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-white/10 pt-8 sm:mt-12 sm:grid-cols-4 sm:gap-x-8 sm:pt-10">
                {ABOUT_METRICS.map((m) => (
                  <div key={m.label}>
                    <p className="text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl lg:text-3xl">
                      {m.value}
                    </p>
                    <p className="mt-1 text-xs font-medium text-zinc-500">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TECHNICAL SERVICES (HORIZONTAL ON PHONE, TABLET & LAPTOP + 3D STAGE) ================= */}
      <section
        id="services"
        className="relative w-full border-t border-white/10 bg-black py-16 sm:py-24 lg:py-32"
      >
        <div className="w-full px-4 sm:px-8 lg:px-16">
          {/* Header */}
          <div className="reveal-up flex flex-col justify-between gap-4 pb-8 sm:pb-10 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2997FF]">
                Technical Services
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Engineered end to end.
              </h2>
            </div>
            <p className="max-w-lg text-sm text-zinc-400 sm:text-base">
              <span className="sm:hidden">Swipe &amp; tap any capability to inspect its live 3D architecture.</span>
              <span className="hidden sm:inline">Select any capability below to inspect its live 3D technical architecture.</span>
            </p>
          </div>

          {/* Horizontal Services Bar: Swipeable Snap Rail on Phone -> 2x2 Tablet -> 4-Col Laptop */}
          <div className="reveal-up no-scrollbar flex snap-x snap-mandatory overflow-x-auto divide-x divide-white/10 border-y border-white/10 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
            {SERVICES.map((service, index) => {
              const isActive = activeService === index;
              return (
                <button
                  key={service.id}
                  type="button"
                  onMouseEnter={() => setActiveService(index)}
                  onFocus={() => setActiveService(index)}
                  onClick={() => setActiveService(index)}
                  className={`group relative flex min-w-[82vw] shrink-0 snap-start flex-col justify-between px-5 py-6 text-left transition-all sm:min-w-0 sm:px-6 sm:py-8 lg:px-7 ${
                    index >= 2 ? 'sm:border-t sm:border-white/10 lg:border-t-0' : ''
                  } ${
                    isActive
                      ? 'bg-white/[0.04] opacity-100'
                      : 'opacity-60 hover:bg-white/[0.02] hover:opacity-90'
                  }`}
                >
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
                    <h3 className="mt-3 text-lg font-semibold tracking-[-0.03em] text-white sm:mt-4 sm:text-xl lg:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                      {service.brief}
                    </p>
                  </div>

                  <p className="mt-5 border-t border-white/10 pt-3.5 text-xs font-medium text-zinc-500 sm:mt-6 sm:pt-4">
                    {service.spec}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Full-Width Widescreen 3D Technical Stage */}
          <div className="reveal-up relative w-full overflow-hidden border-b border-white/10 bg-tech-grid pt-3 sm:pt-4">
            <div className="flex flex-wrap items-center justify-between gap-2 px-3 pb-2 sm:px-4">
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
        className="relative w-full overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#040812] via-[#060D1E] to-black py-20 sm:py-28 lg:py-36"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-[#2997FF]/12 blur-[140px]"
        />

        <div className="reveal-up relative w-full px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end lg:gap-10">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2997FF]">
                Products • PyPI Package (nitaanth-sentinelai v0.1.1)
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:mt-4 sm:text-6xl lg:text-7xl">
                SentinelAI.
              </h2>
              <p className="mt-4 max-w-2xl text-base text-zinc-400 sm:mt-5 sm:text-lg md:text-xl">
                Deterministic multi-scanner DevSecOps CLI &amp; Python library — orchestrating Semgrep, Bandit, GitLeaks, Trivy, and OSV-Scanner with grounded multi-agent AI analysis and AST-validated remediation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="./products.html"
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#2997FF] px-8 py-4 text-sm font-medium text-white transition hover:bg-[#1C88F0] sm:w-auto"
              >
                <span>Open SentinelAI Docs</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* Inline Hairline Specs */}
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-8 sm:mt-16 sm:grid-cols-4 sm:gap-8 sm:pt-10">
            <div>
              <p className="text-2xl font-semibold text-white sm:text-3xl">5 Scanners</p>
              <p className="mt-1 text-xs font-medium text-zinc-500">
                Semgrep · Bandit · GitLeaks · Trivy · OSV
              </p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white sm:text-3xl">3-Stage AI</p>
              <p className="mt-1 text-xs font-medium text-zinc-500">
                Ollama · Groq · Google Gemini
              </p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white sm:text-3xl">ast.parse</p>
              <p className="mt-1 text-xs font-medium text-zinc-500">
                Syntax-Validated fix / undo
              </p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white sm:text-3xl">SARIF 2.1</p>
              <p className="mt-1 text-xs font-medium text-zinc-500">
                JSON · HTML · Markdown · Terminal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TOUCH-SWIPE CLIENT REVIEWS CAROUSEL -> CLICK TO OPEN CLIENTS PAGE ================= */}
      <section
        className="w-full border-t border-white/10 bg-[#030508] py-16 sm:py-24 lg:py-28"
        onMouseEnter={() => setCarouselPaused(true)}
        onMouseLeave={() => setCarouselPaused(false)}
        onTouchStart={handleReviewTouchStart}
        onTouchEnd={handleReviewTouchEnd}
      >
        <div className="reveal-up w-full px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-end sm:pb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2997FF]">
                What Clients Say
              </p>
              <h2 className="mt-2.5 text-3xl font-semibold tracking-[-0.035em] text-white sm:mt-3 sm:text-4xl lg:text-5xl">
                Trusted across industries.
              </h2>
            </div>

            {/* Carousel Controls */}
            <div className="flex flex-wrap items-center gap-3">
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
                className="ml-1 inline-flex items-center gap-1.5 text-sm font-medium text-[#2997FF] transition hover:text-white sm:ml-2"
              >
                <span>All Reviews</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Clickable Full-Width Active Review Slide */}
          <a
            href={`./clients.html#${currentReview.id}`}
            className="group block border-b border-white/10 py-10 transition-colors hover:bg-white/[0.02] sm:py-14 lg:py-16"
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
              <div className="min-w-0 lg:col-span-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2997FF]">
                  {currentReview.index} — {currentReview.engagement}
                </p>
                <h3 className="mt-2.5 text-2xl font-semibold tracking-[-0.035em] text-white transition group-hover:text-[#2997FF] sm:mt-3 sm:text-3xl lg:text-4xl">
                  {currentReview.client}
                </h3>
                <p className="mt-1.5 text-sm text-zinc-400">{currentReview.sector}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 transition group-hover:text-white sm:mt-6">
                  <span>Tap to open full client story</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#2997FF] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>

              <div className="min-w-0 lg:col-span-8 lg:border-l lg:border-white/10 lg:pl-12">
                <blockquote className="text-xl font-normal leading-[1.4] tracking-[-0.02em] text-zinc-100 sm:text-2xl md:text-3xl lg:text-4xl lg:leading-[1.35]">
                  “{currentReview.quote}”
                </blockquote>
                <p className="mt-5 text-sm text-zinc-400 sm:mt-6">
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
                  className={`relative px-3 py-4 text-left transition sm:px-4 sm:py-5 ${
                    idx >= 2 ? 'border-t border-white/10 sm:border-t-0' : ''
                  } ${isSelected ? 'opacity-100' : 'opacity-45 hover:opacity-80'}`}
                >
                  <span
                    className={`absolute inset-x-0 top-0 h-[2px] transition-opacity ${
                      isSelected ? 'bg-[#2997FF] opacity-100' : 'opacity-0'
                    }`}
                  />
                  <p className="text-xs font-semibold text-white sm:text-sm">{item.client}</p>
                  <p className="mt-1 text-[11px] text-zinc-500 sm:text-xs">{item.engagement}</p>
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
