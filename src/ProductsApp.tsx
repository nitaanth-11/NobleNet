import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check, Copy, Terminal } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ContactFooter } from './components/Footer';
import { SentinelCoreCanvas, type SentinelMode } from './components/three/SentinelCoreCanvas';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useRevealObserver } from './hooks/useReveal';
import {
  SENTINEL_COMMANDS,
  SENTINEL_META,
  SENTINEL_MODULES,
  SENTINEL_PYTHON_SNIPPET,
} from './data/company';
import {
  AI_ENV_VARS,
  EXIT_CODES,
  INSTALL_GUIDES,
  PINNED_SCANNERS,
  RUN_MODES_COMPARISON,
  RUNTIME_REQUIREMENTS,
  VULNERABILITY_CLASSES,
} from './data/sentinelDocs';

const PIPELINE_MODES: { id: SentinelMode; label: string; desc: string }[] = [
  { id: 'guard', label: 'Core Tier', desc: 'Semgrep 1.172.0 · Bandit 1.9.4 · GitLeaks 8.30.1 (~4s CI gate)' },
  { id: 'radar', label: 'Extended Tier (--extended)', desc: 'Core + Trivy 0.74.0 + OSV-Scanner 2.5.1 dependency audit' },
  { id: 'mesh', label: '3-Stage Multi-Agent AI', desc: 'Evidence Analyst → Exploit & Remediation → Independent Critic' },
];

const CHAPTER_LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Versions & Requirements', href: '#versions' },
  { label: 'Installation', href: '#installation' },
  { label: 'Execution Modes', href: '#modes' },
  { label: 'CLI Reference', href: '#docs' },
  { label: 'AST Remediation', href: '#remediation' },
  { label: 'Exit Codes & CI', href: '#ci' },
];

export default function ProductsApp() {
  useSmoothScroll();
  useRevealObserver();

  const [mode, setMode] = useState<SentinelMode>('guard');
  const [installGuideId, setInstallGuideId] = useState(INSTALL_GUIDES[0].id);
  const [activeCmdIdx, setActiveCmdIdx] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const activeCmd = SENTINEL_COMMANDS[activeCmdIdx];
  const activeGuide =
    INSTALL_GUIDES.find((g) => g.id === installGuideId) ?? INSTALL_GUIDES[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((curr) => (curr === key ? null : curr)), 1800);
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-[#F5F5F7]">
      <Navbar page="products" />

      {/* ================= FLAGSHIP EDITORIAL LAUNCH HERO (Gemini Launch Style) ================= */}
      <section className="relative w-full overflow-hidden bg-black pt-36 pb-16 lg:pt-44 lg:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[#2997FF]/12 blur-[160px]"
        />

        <div className="relative mx-auto max-w-5xl px-6 text-center sm:px-10">
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-zinc-400">
            <a
              href="./index.html"
              className="inline-flex items-center gap-1.5 text-zinc-400 transition hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>NobleNet Products</span>
            </a>
            <span className="text-zinc-700">•</span>
            <span className="text-[#2997FF]">{SENTINEL_META.packageName}</span>
            <span className="text-zinc-700">•</span>
            <span>Release v{SENTINEL_META.version}</span>
            <span className="text-zinc-700">•</span>
            <span>Python {SENTINEL_META.pythonRequires}</span>
          </div>

          <h1 className="mt-7 text-5xl font-semibold leading-[1.03] tracking-[-0.045em] text-white sm:text-7xl lg:text-[80px]">
            Introducing SentinelAI.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-zinc-400 sm:text-2xl sm:leading-[1.45]">
            A deterministic multi-scanner DevSecOps CLI and Python library — combining Semgrep, Bandit, GitLeaks, Trivy, and OSV-Scanner with CWE/AST correlation, opt-in local AI reasoning, and closed-loop AST code remediation.
          </p>

          {/* Flagship Launch Actions + Instant Copyable Install Pill */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-[#070B12] px-5 py-3 text-sm">
              <Terminal className="h-4 w-4 text-[#2997FF]" />
              <code className="font-sans font-medium text-sky-300">
                pip install nitaanth-sentinelai
              </code>
              <button
                type="button"
                onClick={() => handleCopy('pip install nitaanth-sentinelai', 'hero-pip')}
                aria-label="Copy pip install command"
                className="ml-1 text-zinc-400 transition hover:text-white"
              >
                {copiedKey === 'hero-pip' ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            <a
              href="#installation"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              <span>Installation Guide</span>
            </a>

            <a
              href={SENTINEL_META.pypiUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:border-white/50"
            >
              <span>PyPI</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <a
              href={SENTINEL_META.dockerUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:border-white/50 hover:text-white"
            >
              <span>Docker Hub</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Full-Width Framed Interactive 3D Hero Stage (Editorial Media Showcase) */}
        <div className="relative mt-14 w-full px-6 sm:px-10 lg:px-16">
          <div className="overflow-hidden border border-white/10 bg-[#04070E]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
              <div className="flex flex-wrap items-center gap-2">
                {PIPELINE_MODES.map((m) => {
                  const active = mode === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMode(m.id)}
                      className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                        active
                          ? 'bg-[#2997FF] text-white'
                          : 'border border-white/15 text-zinc-400 hover:border-white/40 hover:text-white'
                      }`}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs font-medium text-zinc-400">
                {PIPELINE_MODES.find((m) => m.id === mode)?.desc}
              </p>
            </div>

            <div className="bg-tech-grid">
              <SentinelCoreCanvas mode={mode} />
            </div>
          </div>
        </div>
      </section>

      {/* ================= STICKY EDITORIAL CHAPTER NAVIGATION ================= */}
      <nav
        aria-label="SentinelAI documentation chapters"
        className="sticky top-[88px] z-40 w-full border-y border-white/10 bg-black/85 backdrop-blur-2xl sm:top-[104px]"
      >
        <div className="flex w-full items-center gap-7 overflow-x-auto px-6 py-3.5 sm:px-10 lg:px-16">
          {CHAPTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 text-xs font-medium text-zinc-400 transition hover:text-white sm:text-[13px]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ================= CHAPTER 01: OVERVIEW & CAPABILITIES ================= */}
      <section
        id="overview"
        className="w-full scroll-mt-36 bg-[#030508] py-24 lg:py-28"
      >
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="reveal-up max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2997FF]">
              01 · Overview
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl">
              Deterministic scanning first. Grounded AI when you want it.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-zinc-400">
              SentinelAI decouples industry-standard SAST, secret scanning, and SCA engines behind a strict Pydantic contract (`FindingsProvider`). Scanner-only runs execute in seconds with zero credentials for CI/CD gating, while opt-in multi-agent reasoning enriches correlated issues locally.
            </p>
          </div>

          <div className="reveal-up mt-14 divide-y divide-white/10 border-y border-white/10">
            {SENTINEL_MODULES.map((mod) => (
              <div
                key={mod.id}
                className="grid gap-6 py-8 lg:grid-cols-12 lg:items-center"
              >
                <span className="text-xs font-semibold text-zinc-500 lg:col-span-1">
                  {mod.code}
                </span>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white lg:col-span-3">
                  {mod.title}
                </h3>
                <p className="text-base text-zinc-400 lg:col-span-6">{mod.summary}</p>
                <div className="lg:col-span-2 lg:text-right">
                  <p className="text-2xl font-semibold text-[#2997FF]">{mod.metric}</p>
                  <p className="text-xs font-medium text-zinc-500">{mod.metricLabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CHAPTER 02: VERSIONS & SYSTEM REQUIREMENTS ================= */}
      <section
        id="versions"
        className="w-full scroll-mt-36 border-t border-white/10 bg-black py-24 lg:py-28"
      >
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="reveal-up max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2997FF]">
              02 · Versions &amp; Requirements
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Exact runtime &amp; pinned scanner matrix.
            </h2>
            <p className="mt-4 text-base text-zinc-400">
              Every scanner in SentinelAI is pinned to a verified version (never <code className="font-sans text-zinc-200">latest</code>), and GitHub releases are checked with <code className="font-sans text-zinc-200">sha256sum -c</code> in the official Docker build.
            </p>
          </div>

          <div className="reveal-up mt-14 grid gap-14 lg:grid-cols-12">
            {/* Table 1: Python Runtime & Package Dependencies */}
            <div className="lg:col-span-6">
              <h3 className="text-xl font-semibold tracking-[-0.025em] text-white">
                Python Runtime &amp; Core Dependencies
              </h3>
              <p className="mt-1.5 text-sm text-zinc-500">
                Installed automatically via <code className="font-sans text-zinc-300">pip install nitaanth-sentinelai</code>
              </p>
              <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
                {RUNTIME_REQUIREMENTS.map((row) => (
                  <div
                    key={row.component}
                    className="grid gap-2 py-4 sm:grid-cols-12 sm:items-baseline"
                  >
                    <span className="text-sm font-semibold text-white sm:col-span-4">
                      {row.component}
                    </span>
                    <span className="text-sm font-semibold text-[#2997FF] sm:col-span-3">
                      {row.version}
                    </span>
                    <span className="text-sm text-zinc-400 sm:col-span-5">
                      {row.purpose}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Table 2: Pinned Security Scanners */}
            <div className="lg:col-span-6 lg:border-l lg:border-white/10 lg:pl-12">
              <h3 className="text-xl font-semibold tracking-[-0.025em] text-white">
                Pinned Security Scanners (Core &amp; Extended)
              </h3>
              <p className="mt-1.5 text-sm text-zinc-500">
                Core runs offline; <code className="font-sans text-zinc-300">--extended</code> adds Trivy &amp; OSV-Scanner (requires a recognized dependency manifest).
              </p>
              <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
                {PINNED_SCANNERS.map((row) => (
                  <div
                    key={row.component}
                    className="grid gap-2 py-4 sm:grid-cols-12 sm:items-baseline"
                  >
                    <div className="sm:col-span-4">
                      <span className="block text-sm font-semibold text-white">
                        {row.component}
                      </span>
                      <span className="text-xs text-zinc-500">{row.tier}</span>
                    </div>
                    <span className="text-sm font-semibold text-[#2997FF] sm:col-span-2">
                      {row.version}
                    </span>
                    <span className="text-sm text-zinc-400 sm:col-span-6">
                      {row.purpose}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CHAPTER 03: STEP-BY-STEP INSTALLATION PROCESSES ================= */}
      <section
        id="installation"
        className="w-full scroll-mt-36 border-t border-white/10 bg-[#030508] py-24 lg:py-28"
      >
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="reveal-up flex flex-col justify-between gap-6 border-b border-white/10 pb-10 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2997FF]">
                03 · Installation Processes
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                Four ways to install &amp; run SentinelAI.
              </h2>
            </div>
            <p className="max-w-md text-sm text-zinc-400">
              Choose PyPI for direct CLI usage, Docker for zero-config pinned scanners, Ollama for local zero-egress AI, or editable source setup.
            </p>
          </div>

          {/* Horizontal Method Selector Tabs */}
          <div className="reveal-up grid grid-cols-2 divide-x divide-white/10 border-b border-white/10 lg:grid-cols-4">
            {INSTALL_GUIDES.map((tab) => {
              const active = tab.id === installGuideId;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setInstallGuideId(tab.id)}
                  className={`relative px-4 py-5 text-left transition sm:px-6 ${
                    active ? 'bg-white/[0.04] opacity-100' : 'opacity-55 hover:opacity-90'
                  }`}
                >
                  <span
                    className={`absolute inset-x-0 top-0 h-[2px] ${
                      active ? 'bg-[#2997FF]' : 'bg-transparent'
                    }`}
                  />
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#2997FF]">
                    {tab.badge}
                  </span>
                  <span className="mt-1 block text-base font-semibold text-white">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Installation Walkthrough */}
          <div className="reveal-up mt-10">
            <p className="max-w-3xl text-base leading-relaxed text-zinc-300">
              {activeGuide.summary}
            </p>

            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {activeGuide.steps.map((s) => {
                const copyId = `${activeGuide.id}-${s.step}`;
                return (
                  <div
                    key={s.step}
                    className="grid gap-6 py-7 lg:grid-cols-12 lg:items-center"
                  >
                    <div className="lg:col-span-5">
                      <span className="text-xs font-semibold text-[#2997FF]">
                        STEP {s.step}
                      </span>
                      <h3 className="mt-1.5 text-xl font-semibold tracking-[-0.025em] text-white">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm text-zinc-400">{s.note}</p>
                    </div>
                    <div className="lg:col-span-7">
                      <div className="flex items-start justify-between gap-4 border border-white/10 bg-[#060A12] px-5 py-4">
                        <pre className="overflow-x-auto font-sans text-xs leading-6 text-sky-300 sm:text-sm">
                          <code>{s.command}</code>
                        </pre>
                        <button
                          type="button"
                          onClick={() => handleCopy(s.command, copyId)}
                          className="shrink-0 text-xs font-medium text-zinc-400 transition hover:text-white"
                        >
                          {copiedKey === copyId ? (
                            <span className="inline-flex items-center gap-1 text-emerald-400">
                              <Check className="h-3.5 w-3.5" />
                              Copied
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1">
                              <Copy className="h-3.5 w-3.5" />
                              Copy
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CHAPTER 04: TWO WAYS TO RUN (Editorial Comparison Table) ================= */}
      <section
        id="modes"
        className="w-full scroll-mt-36 border-t border-white/10 bg-black py-24 lg:py-28"
      >
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="reveal-up max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2997FF]">
              04 · Execution Modes
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Scanner-only CI gate vs. AI-enriched triage.
            </h2>
            <p className="mt-4 text-base text-zinc-400">
              Scanner-only is a first-class default mode used in SentinelAI&apos;s own CI on every push. AI enrichment is strictly opt-in for deep local remediation and root-cause analysis.
            </p>
          </div>

          <div className="reveal-up mt-12 overflow-x-auto border-y border-white/10">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  <th className="py-5 pr-6">Dimension</th>
                  <th className="py-5 px-6 text-white">Scanner-Only (Default)</th>
                  <th className="py-5 pl-6 text-[#2997FF]">AI-Enriched (--ai)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm sm:text-base">
                {RUN_MODES_COMPARISON.map((row) => (
                  <tr key={row.aspect}>
                    <td className="py-5 pr-6 font-medium text-zinc-400">{row.aspect}</td>
                    <td className="py-5 px-6 text-zinc-200">{row.scannerOnly}</td>
                    <td className="py-5 pl-6 text-zinc-200">{row.aiEnriched}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= CHAPTER 05: INTERACTIVE CLI REFERENCE & PYTHON SDK ================= */}
      <section
        id="docs"
        className="w-full scroll-mt-36 border-t border-white/10 bg-[#030508] py-24 lg:py-28"
      >
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="reveal-up border-b border-white/10 pb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2997FF]">
              05 · CLI Reference &amp; Python SDK
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Official commands &amp; programmatic API.
            </h2>
          </div>

          {/* Interactive Command Reference Split */}
          <div className="reveal-up mt-6 grid gap-12 lg:grid-cols-12">
            <div className="divide-y divide-white/10 lg:col-span-5">
              {SENTINEL_COMMANDS.map((cmd, idx) => {
                const isSelected = idx === activeCmdIdx;
                return (
                  <button
                    key={cmd.id}
                    type="button"
                    onClick={() => setActiveCmdIdx(idx)}
                    className={`group flex w-full flex-col py-5 text-left transition-all ${
                      isSelected ? 'opacity-100' : 'opacity-55 hover:opacity-90'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-baseline gap-4">
                        <span
                          className={`text-xs font-semibold ${
                            isSelected ? 'text-[#2997FF]' : 'text-zinc-600'
                          }`}
                        >
                          {cmd.index}
                        </span>
                        <span className="text-base font-semibold text-white sm:text-lg">
                          {cmd.command}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500">
                        {cmd.category}
                      </span>
                    </div>
                    <p className="mt-1.5 pl-8 text-sm text-zinc-400">{cmd.summary}</p>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 lg:border-l lg:border-white/10 lg:pl-12">
              <div className="sticky top-40">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2997FF]">
                      {activeCmd.category} · Command {activeCmd.index}
                    </span>
                    <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                      {activeCmd.command}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(activeCmd.usage, `usage-${activeCmd.id}`)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-white/40 hover:text-white"
                  >
                    {copiedKey === `usage-${activeCmd.id}` ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Command</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                    Usage
                  </p>
                  <pre className="mt-2.5 overflow-x-auto border border-white/10 bg-[#070B12] px-5 py-4 font-sans text-sm text-white">
                    <code>$ {activeCmd.usage}</code>
                  </pre>
                </div>

                <div className="mt-8">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                    Flags &amp; Options
                  </p>
                  <div className="mt-3 divide-y divide-white/10 border-y border-white/10">
                    {activeCmd.flags.map((f) => (
                      <div
                        key={f.flag}
                        className="grid gap-2 py-3.5 sm:grid-cols-12 sm:items-baseline"
                      >
                        <code className="font-sans text-xs font-semibold text-[#2997FF] sm:col-span-4">
                          {f.flag}
                        </code>
                        <span className="text-sm text-zinc-400 sm:col-span-8">
                          {f.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                    Sample Output
                  </p>
                  <div className="mt-2.5 overflow-x-auto border border-white/10 bg-[#05080F] p-5 font-sans text-xs leading-7 sm:text-[13px]">
                    {activeCmd.sampleOutput.map((line, i) => {
                      const colorClass = line.startsWith('$')
                        ? 'text-white font-medium'
                        : line.includes('CRITICAL') || line.startsWith('- ')
                          ? 'text-rose-400'
                          : line.startsWith('+ ') || line.startsWith('✓')
                            ? 'text-emerald-400'
                            : line.startsWith('▸') ||
                                line.startsWith('┌') ||
                                line.startsWith('└') ||
                                line.startsWith('│')
                              ? 'text-[#2997FF]'
                              : 'text-zinc-400';
                      return (
                        <div key={i} className={`whitespace-pre ${colorClass}`}>
                          {line}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Python Library Snippet */}
          <div className="reveal-up mt-16 border-t border-white/10 pt-14">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                  Programmatic Python Library Usage
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                  Import <code className="font-sans text-zinc-200">LiveFindingsProvider</code> directly inside Python scripts or security automation pipelines.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(SENTINEL_PYTHON_SNIPPET, 'python-sdk')}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-white/40 hover:text-white"
              >
                {copiedKey === 'python-sdk' ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Python Snippet</span>
                  </>
                )}
              </button>
            </div>
            <pre className="mt-5 overflow-x-auto border border-white/10 bg-[#05080F] p-6 font-sans text-xs leading-7 text-zinc-200 sm:text-sm">
              <code>{SENTINEL_PYTHON_SNIPPET}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ================= CHAPTER 06: CLOSED-LOOP AST REMEDIATION & CWE COVERAGE ================= */}
      <section
        id="remediation"
        className="w-full scroll-mt-36 border-t border-white/10 bg-black py-24 lg:py-28"
      >
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="reveal-up max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2997FF]">
              06 · Closed-Loop AST Remediation
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Syntax-validated patches with atomic rollback.
            </h2>
            <p className="mt-4 text-base text-zinc-400">
              Every patch generated by <code className="font-sans text-zinc-200">sentinelai fix</code> is parsed with <code className="font-sans text-zinc-200">ast.parse</code> before touching disk, backed up in <code className="font-sans text-zinc-200">.sentinelai_backups/</code>, and automatically re-scanned to verify no regressions. Interactive prompt keys: <code className="font-sans text-zinc-200">[y]es</code>, <code className="font-sans text-zinc-200">[n]o/[s]kip</code>, <code className="font-sans text-zinc-200">[a]ll</code>, <code className="font-sans text-zinc-200">[d]etails</code>, <code className="font-sans text-zinc-200">[q]uit</code>.
            </p>
          </div>

          <div className="reveal-up mt-12 grid gap-x-10 divide-y divide-white/10 border-y border-white/10 sm:grid-cols-2">
            {VULNERABILITY_CLASSES.map((v) => (
              <div
                key={v.cwe}
                className="flex flex-col justify-between gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-4"
              >
                <div>
                  <span className="text-xs font-semibold text-[#2997FF]">{v.cwe}</span>
                  <h3 className="text-base font-semibold text-white">{v.name}</h3>
                </div>
                <p className="text-sm text-zinc-400 sm:text-right">{v.remediation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CHAPTER 07: EXIT CODES, AI ENV VARS & CI/CD ================= */}
      <section
        id="ci"
        className="w-full scroll-mt-36 border-t border-white/10 bg-[#030508] py-24 lg:py-28"
      >
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="reveal-up max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2997FF]">
              07 · Exit Codes, Environment Variables &amp; CI/CD
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Built for deterministic pipelines.
            </h2>
          </div>

          <div className="reveal-up mt-14 grid gap-14 lg:grid-cols-12">
            {/* Exit Codes */}
            <div className="lg:col-span-6">
              <h3 className="text-xl font-semibold text-white">Named Exit Codes</h3>
              <p className="mt-1.5 text-sm text-zinc-500">
                CI pipelines branch cleanly between security policy failures (1) and tool/input errors (2, 3, 4).
              </p>
              <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
                {EXIT_CODES.map((ec) => (
                  <div
                    key={ec.code}
                    className="grid gap-2 py-4 sm:grid-cols-12 sm:items-baseline"
                  >
                    <span className="text-base font-semibold text-[#2997FF] sm:col-span-1">
                      {ec.code}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.08em] text-white sm:col-span-4">
                      {ec.name}
                    </span>
                    <span className="text-sm text-zinc-400 sm:col-span-7">
                      {ec.meaning}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Environment Variables */}
            <div className="lg:col-span-6 lg:border-l lg:border-white/10 lg:pl-12">
              <h3 className="text-xl font-semibold text-white">AI Configuration Variables</h3>
              <p className="mt-1.5 text-sm text-zinc-500">
                Optional tuning for Ollama RAG retrieval, verification, and timeouts (defaults match published benchmarks).
              </p>
              <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
                {AI_ENV_VARS.map((env) => (
                  <div key={env.variable} className="py-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <code className="font-sans text-xs font-semibold text-[#2997FF]">
                        {env.variable}
                      </code>
                      <span className="text-xs font-medium text-zinc-300">
                        Default: {env.defaultVal}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-zinc-400">{env.purpose}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactFooter />
    </div>
  );
}
