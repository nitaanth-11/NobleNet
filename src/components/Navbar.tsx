import { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface NavbarProps {
  page: 'home' | 'products' | 'clients';
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
        scrolled
          ? 'border-b border-white/10 bg-black/80 backdrop-blur-2xl'
          : 'border-b border-white/[0.04] bg-black/35 backdrop-blur-md'
      }`}
    >
      <div className="flex w-full items-center justify-between px-6 py-5 sm:px-10 sm:py-6 lg:px-16">
        {/* Top Brand Logo — Unified Inter font */}
        <a
          href="./index.html"
          className="group flex items-center gap-4 focus:outline-none"
          aria-label={COMPANY_INFO.name}
        >
          <img
            src="/assets/noblenet-emblem.png"
            alt="NobleNet Logo"
            className="h-12 w-12 object-contain transition-transform duration-500 group-hover:scale-105 sm:h-14 sm:w-14"
          />
          <div className="leading-none">
            <span className="block text-lg font-semibold tracking-[-0.025em] text-white sm:text-xl">
              NobleNet
            </span>
            <span className="mt-1.5 block text-xs font-medium tracking-[0.03em] text-zinc-400 sm:text-[13px]">
              Software Technologies
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-10 md:flex lg:gap-12" aria-label="Primary Navigation">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-[15px] font-medium tracking-[-0.01em] transition-colors lg:text-base ${
                link.active ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          {page === 'products' ? (
            <a
              href="./index.html"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-2.5 text-sm font-medium text-white transition hover:border-white hover:bg-white hover:text-black lg:text-[15px]"
            >
              <span>NobleNet Home</span>
            </a>
          ) : (
            <a
              href="./products.html"
              className="group inline-flex items-center gap-2 rounded-full bg-[#2997FF] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#1C88F0] lg:text-[15px]"
            >
              <span>SentinelAI</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white md:hidden"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-b border-white/10 bg-black/95 px-6 pb-6 pt-3 backdrop-blur-2xl md:hidden">
          <div className="flex flex-col divide-y divide-white/10">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3.5 text-sm font-medium text-zinc-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="./products.html"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2997FF] px-5 py-2.5 text-sm font-medium text-white"
          >
            <span>Open SentinelAI</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </header>
  );
}
