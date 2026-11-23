import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ContactFooter } from './components/Footer';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useRevealObserver } from './hooks/useReveal';
import { CLIENT_TESTIMONIALS, COMPANY_INFO } from './data/company';

export default function ClientsApp() {
  useSmoothScroll();
  useRevealObserver();

  return (
    <div className="relative min-h-screen w-full bg-black text-[#F5F5F7]">
      <Navbar page="clients" />

      {/* ================= FULL-WIDTH EDITORIAL HEADER ================= */}
      <section className="relative w-full overflow-hidden border-b border-white/10 bg-black pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/3 top-0 h-[400px] w-[640px] rounded-full bg-[#2997FF]/10 blur-[140px]"
        />

        <div className="relative w-full px-6 sm:px-10 lg:px-16">
          <a
            href="./index.html"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-zinc-500 transition hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to NobleNet</span>
          </a>

          <div className="mt-8 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2997FF]">
                What Clients Say
              </p>
              <h1 className="mt-4 text-5xl font-semibold leading-[1.03] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                Trusted by leaders across industries.
              </h1>
            </div>
            <p className="max-w-sm text-base text-zinc-400">
              Firm websites, e-commerce platforms, and digital initiatives engineered by NobleNet.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FULL-WIDTH CLIENT TESTIMONIAL BANDS ================= */}
      <section className="w-full bg-[#030508]">
        <div className="w-full divide-y divide-white/10">
          {CLIENT_TESTIMONIALS.map((item) => (
            <article
              id={item.id}
              key={item.id}
              className="reveal-up w-full scroll-mt-24 px-6 py-20 transition-colors hover:bg-white/[0.015] sm:px-10 lg:px-16 lg:py-24"
            >
              <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
                {/* Client Identity */}
                <div className="lg:col-span-4">
                  <span className="text-xs font-semibold tracking-[0.14em] text-[#2997FF]">
                    {item.index}
                  </span>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
                    {item.client}
                  </h2>
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">
                    {item.sector}
                  </p>
                  <p className="mt-4 text-sm font-medium text-zinc-300">
                    Delivered: {item.engagement}
                  </p>
                </div>

                {/* Large Clean Pull Quote + Outcome */}
                <div className="lg:col-span-8 lg:border-l lg:border-white/10 lg:pl-12">
                  <blockquote className="text-2xl font-normal leading-[1.35] tracking-[-0.025em] text-zinc-100 sm:text-3xl lg:text-4xl">
                    “{item.quote}”
                  </blockquote>
                  <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2997FF]">
                      Outcome
                    </span>
                    <span className="text-zinc-700">—</span>
                    <span className="text-sm text-zinc-400">{item.outcome}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= FULL-WIDTH CLOSING CTA ================= */}
      <section className="w-full border-t border-white/10 bg-black py-24">
        <div className="reveal-up flex w-full flex-col items-start justify-between gap-8 px-6 sm:px-10 lg:flex-row lg:items-center lg:px-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Start a Conversation
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">
              Build your next platform with NobleNet.
            </h2>
          </div>
          <a
            href={`mailto:${COMPANY_INFO.email}?subject=Project%20Inquiry%20—%20NobleNet`}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            <span>Contact Our Team</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </section>

      <ContactFooter />
    </div>
  );
}
