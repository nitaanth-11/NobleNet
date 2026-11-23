import { useState } from 'react';
import { Check, Copy, ArrowUpRight, MapPin } from 'lucide-react';
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
      {/* Full-width Architectural Contact + Interactive Map Section */}
      <div className="w-full px-4 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Brand + Email + Address */}
          <div className="min-w-0 lg:col-span-5">
            <img
              src="/assets/noblenet-logo-darkbg.png"
              alt={COMPANY_INFO.name}
              className="h-20 w-auto object-contain sm:h-24"
            />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
              {COMPANY_INFO.tagline}
            </p>

            {/* Email Block */}
            <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-7">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                Email
              </p>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="mt-2 block break-all text-lg font-medium tracking-[-0.02em] text-white transition hover:text-[#2997FF] sm:text-xl md:text-2xl"
              >
                {COMPANY_INFO.email}
              </a>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 transition hover:text-white"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
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

            {/* Address Block */}
            <div className="mt-7 border-t border-white/10 pt-6 sm:mt-8 sm:pt-7">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                Location
              </p>
              <p className="mt-2 text-base font-medium leading-snug tracking-[-0.015em] text-white sm:text-lg md:text-xl">
                {COMPANY_INFO.location.addressLine}
              </p>
              <a
                href={COMPANY_INFO.location.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#2997FF] transition hover:text-white"
              >
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span>Open directions in Google Maps</span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
              </a>
            </div>
          </div>

          {/* Embedded Interactive Map to G/17A Express Zone, Malad East, Mumbai */}
          <div className="min-w-0 lg:col-span-7 lg:pl-6">
            <div className="overflow-hidden border border-white/10 bg-[#070B12]">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3 sm:px-5">
                <span className="text-xs font-medium text-zinc-300">
                  Express Zone, Malad East, Mumbai
                </span>
                <a
                  href={COMPANY_INFO.location.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#2997FF] hover:text-white"
                >
                  <span>View larger map</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
              <div className="relative h-[250px] w-full sm:h-[320px] lg:h-[380px]">
                <iframe
                  title="NobleNet Software Technologies — G/17A Express Zone, Malad East, Mumbai"
                  src={COMPANY_INFO.location.mapsEmbedUrl}
                  className="h-full w-full border-0 grayscale invert contrast-[0.92] opacity-85 transition-opacity duration-300 hover:opacity-100"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hairline Strip */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-7 text-xs text-zinc-500 sm:mt-16 sm:flex-row sm:items-center sm:pt-8">
          <p>
            © {COMPANY_INFO.year} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
            <a href="./index.html" className="transition hover:text-white">
              Home
            </a>
            <a href="./products.html" className="transition hover:text-white">
              SentinelAI
            </a>
            <a href="./clients.html" className="transition hover:text-white">
              What Clients Say
            </a>
            <a href="./privacy.html" className="transition hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
