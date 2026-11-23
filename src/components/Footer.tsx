import { useState } from 'react';
import { Check, Copy, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export function ContactFooter() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText(COMPANY_INFO.email).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      id="contact"
      className="w-full border-t border-white/10 bg-[#04060A] text-[#F5F5F7]"
    >
      {/* Full-width Architectural Contact Grid (Zero Small Cards) */}
      <div className="w-full px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <img
              src="/assets/noblenet-logo-darkbg.png"
              alt={COMPANY_INFO.name}
              className="h-24 w-auto object-contain"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-zinc-400">
              {COMPANY_INFO.tagline}
            </p>
          </div>

          {/* Direct Email Column */}
          <div className="border-t border-white/10 pt-8 lg:col-span-4 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              Email
            </p>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="mt-3 block break-all text-xl font-medium tracking-[-0.02em] text-white transition hover:text-[#2997FF] sm:text-2xl"
            >
              {COMPANY_INFO.email}
            </a>
            <div className="mt-4 flex items-center gap-4">
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 transition hover:text-white"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied to clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy email</span>
                  </>
                )}
              </button>
              <span className="text-zinc-700">•</span>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="inline-flex items-center gap-1 text-xs font-medium text-[#2997FF] hover:underline"
              >
                <span>Write to us</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Direct Location Column */}
          <div className="border-t border-white/10 pt-8 lg:col-span-4 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              Location
            </p>
            <p className="mt-3 text-xl font-medium tracking-[-0.02em] text-white sm:text-2xl">
              {COMPANY_INFO.location.city}, {COMPANY_INFO.location.country}
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              {COMPANY_INFO.location.addressLine}
            </p>
            <p className="mt-3 font-mono text-[11px] text-zinc-500">
              {COMPANY_INFO.location.timezone}
            </p>
          </div>
        </div>

        {/* Bottom Hairline Navigation Strip */}
        <div className="mt-20 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <p>
            © {COMPANY_INFO.year} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-7">
            <a href="./index.html" className="transition hover:text-white">
              Home
            </a>
            <a href="./products.html" className="transition hover:text-white">
              Sentinel AI
            </a>
            <a href="./clients.html" className="transition hover:text-white">
              What Clients Say
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
