import { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface NavbarProps {
  page: 'home' | 'products' | 'clients' | 'privacy';
}

export function Navbar({ page }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu cleanly when resizing up to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const links = [
    {
      label: 'About Us',
      href: page === 'home' ? '#about' : './index.html#about',
      active: false,
    },
    {
      label: 'Services',
      href: page === 'home' ? '#services' : './index.html#services',
      active: false,
    },
    {
      label: 'Products',
      href: './products.html',
      active: page === 'products',
    },
    {
      label: 'Clients',
      href: './clients.html',
      active: page === 'clients',
    },
    {
      label: 'Contact',
      href: '#contact',
      active: false,
    },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'border-b border-white/10 bg-black/88 backdrop-blur-2xl'
          : 'border-b border-white/[0.04] bg-black/40 backdrop-blur-md'
      }`}
    >
      <div className="flex w-full items-center justify-between gap-4 px-4 py-2.5 sm:px-8 sm:py-3.5 lg:px-16">
        {/* Official Full NobleNet Logo — scales smoothly from phone to ultrawide */}
        <a
          href="./index.html"
          className="group flex shrink-0 items-center focus:outline-none"
          aria-label={COMPANY_INFO.name}
        >
          <img
            src="/assets/noblenet-logo-darkbg.png"
            alt={COMPANY_INFO.name}
            className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:h-14 md:h-16 lg:h-[68px]"
          />
        </a>

        {/* Tablet & Desktop Links */}
        <nav
          className="hidden items-center gap-5 md:flex lg:gap-10 xl:gap-12"
          aria-label="Primary Navigation"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`whitespace-nowrap text-sm font-medium tracking-[-0.01em] transition-colors lg:text-[15px] xl:text-base ${
                link.active ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Tablet & Desktop CTA */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          {page === 'products' ? (
            <a
              href="./index.html"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/25 px-4 py-2 text-sm font-medium text-white transition hover:border-white hover:bg-white hover:text-black lg:px-6 lg:py-2.5 lg:text-[15px]"
            >
              <span>NobleNet Home</span>
            </a>
          ) : (
            <a
              href="./products.html"
              className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#2997FF] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1C88F0] lg:px-6 lg:py-2.5 lg:text-[15px]"
            >
              <span>SentinelAI</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
        </div>

        {/* Mobile Menu Toggle (44x44px touch target) */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/40 md:hidden"
          aria-label="Toggle Menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="max-h-[calc(100svh-72px)] overflow-y-auto border-b border-white/10 bg-black/95 px-5 pb-7 pt-2 backdrop-blur-2xl md:hidden">
          <div className="flex flex-col divide-y divide-white/10">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`py-4 text-base font-medium transition ${
                  link.active ? 'text-[#2997FF]' : 'text-zinc-200 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="./privacy.html"
              onClick={() => setMenuOpen(false)}
              className={`py-4 text-base font-medium transition ${
                page === 'privacy' ? 'text-[#2997FF]' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Privacy Policy
            </a>
          </div>
          <a
            href={page === 'products' ? './index.html' : './products.html'}
            onClick={() => setMenuOpen(false)}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2997FF] px-5 py-3.5 text-sm font-medium text-white"
          >
            <span>{page === 'products' ? 'Back to NobleNet Home' : 'Open SentinelAI'}</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </header>
  );
}
