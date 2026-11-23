import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check, Copy, Terminal } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ContactFooter } from './components/Footer';
import { SentinelCoreCanvas, type SentinelMode } from './components/three/SentinelCoreCanvas';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useRevealObserver } from './hooks/useReveal';
import {
  SENTINEL_COMMANDS,
  SENTINEL_INSTALL_METHODS,
  SENTINEL_META,
  SENTINEL_MODULES,
  SENTINEL_PYTHON_SNIPPET,
} from './data/company';

const MODES: { id: SentinelMode; label: string; desc: string }[] = [
  { id: 'guard', label: 'Core Tier', desc: 'Semgrep + Bandit + GitLeaks (fast CI gate)' },
  { id: 'radar', label: 'Extended Tier', desc: 'Core + Trivy + OSV-Scanner dependency audit' },
  { id: 'mesh', label: 'Multi-Agent AI', desc: 'Evidence → Remediation → Independent Critic' },
];

export default function ProductsApp() {
  useSmoothScroll();
  useRevealObserver();

  const [mode, setMode] = useState<SentinelMode>('guard');
  const [installTab, setInstallTab] = useState<(typeof SENTINEL_INSTALL_METHODS)[number]['id']>('pip');
  const [activeCmdIdx, setActiveCmdIdx] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const activeCmd = SENTINEL_COMMANDS[activeCmdIdx];
  const activeInstall =
    SENTINEL_INSTALL_METHODS.find((m) => m.id === installTab) ?? SENTINEL_INSTALL_METHODS[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text).catch(() => { });
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((curr) => (curr === key ? null : curr)), 1800);
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-[#F5F5F7]">
      <Navbar page="products" />

      {/* ================= SENTINEL AI HERO + 3D PIPELINE RADAR ================= */}
      <section className="relative w-full overflow-hidden bg-black pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-[560px] w-[620px] rounded-full bg-[#2997FF]/10 blur-[150px]"
        />

        <div className="relative w-full px-6 sm:px-10 lg:px-16">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Copy */}
            <div className="lg:col-span-5">
              <a
                href="./index.html"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-zinc-500 transition hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>NobleNet Products</span>
              </a>

              <div className="mt-5 flex flex-wrap items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em]">
                <span className="text-[#2997FF]">{SENTINEL_META.packageName}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400">v{SENTINEL_META.version}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400">Python {SENTINEL_META.pythonRequires}</span>
              </div>

              <h1 className="mt-4 text-5xl font-semibold leading-[1.03] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                SentinelAI.
              </h1>

              <p className="mt-5 text-lg leading-relaxed text-zinc-400">
                Deterministic multi-scanner DevSecOps CLI and Python library — orchestrating Semgrep, Bandit, GitLeaks, Trivy, and OSV-Scanner with CWE/AST correlation, grounded multi-agent AI, and AST-validated remediation.
              </p>

              {/* Quick pip install line */}
              <div className="mt-7 flex items-center justify-between border border-white/15 bg-[#070B12] px-4 py-3 font-mono text-xs sm:text-sm">
                <code className="text-sky-300">$ pip install nitaanth-sentinelai</code>
                <button
                  type="button"
                  onClick={() => handleCopy('pip install nitaanth-sentinelai', 'hero-pip')}
                  className="ml-3 inline-flex items-center gap-1.5 text-zinc-400 transition hover:text-white"
                >
                  {copiedKey === 'hero-pip' ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* 3D Pipeline Tier Selector */}
              <div className="mt-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  Inspect Pipeline Mode
                </p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {MODES.map((m) => {
                    const active = mode === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMode(m.id)}
                        className={`rounded-full px-4 py-2 text-xs font-medium transition ${active
                          ? 'bg-[#2997FF] text-white'
                          : 'border border-white/15 text-zinc-300 hover:border-white/40 hover:text-white'
                          }`}
                      >
                        {m.label}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2.5 font-mono text-[11px] text-[#2997FF]">
                  {MODES.find((m) => m.id === mode)?.desc}
                </p>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <a
                  href="#docs"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
                >
                  <Terminal className="h-4 w-4" />
                  <span>CLI Documentation</span>
                </a>
                <a
                  href={SENTINEL_META.pypiUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:border-white/50"
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
                  <span>Docker</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Right Full-Width 3D Technical Topology Canvas */}
            <div className="relative border-y border-white/10 bg-tech-grid lg:col-span-7 lg:border-l lg:border-y-0 lg:pl-4">
              <SentinelCoreCanvas mode={mode} />
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-4 py-3 font-mono text-[11px] text-zinc-500">
                <span>FAIL-CLOSED MULTI-SCANNER TOPOLOGY</span>
                <span className="text-emerald-400">PYPI v{SENTINEL_META.version} • PYTHON {SENTINEL_META.pythonRequires}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT SENTINELAI DOES (Real Verified Capabilities) ================= */}
      <section
        id="capabilities"
        className="w-full border-t border-white/10 bg-[#030508] py-24 lg:py-28"
      >
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="reveal-up">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#2997FF]">
              Capabilities
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              What SentinelAI actually does.
            </h2>
          </div>

          <div className="reveal-up mt-14 divide-y divide-white/10 border-y border-white/10">
            {SENTINEL_MODULES.map((mod) => (
              <div
                key={mod.id}
                className="grid gap-6 py-8 lg:grid-cols-12 lg:items-center"
              >
                <span className="font-mono text-xs text-zinc-500 lg:col-span-1">
                  {mod.code}
                </span>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white lg:col-span-3">
                  {mod.title}
                </h3>
                <p className="text-base text-zinc-400 lg:col-span-6">{mod.summary}</p>
                <div className="lg:col-span-2 lg:text-right">
                  <p className="text-2xl font-semibold text-[#2997FF]">{mod.metric}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                    {mod.metricLabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= REAL CLI & PYTHON SDK DOCUMENTATION ================= */}
      <section
        id="docs"
        className="w-full border-t border-white/10 bg-black py-24 lg:py-32"
      >
        <div className="w-full px-6 sm:px-10 lg:px-16">
          {/* Header + Install Switcher */}
          <div className="reveal-up flex flex-col justify-between gap-10 border-b border-white/10 pb-12 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#2997FF]">
                Documentation • CLI Reference
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                Official SentinelAI commands.
              </h2>
              <p className="mt-4 text-base text-zinc-400">
                Built with Typer, Rich, and Pydantic. Run scanner-only CI gates (~4s) or opt-in 3-stage local AI triage.
              </p>
            </div>

            {/* Install Command Switcher */}
            <div className="w-full lg:max-w-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-5">
                  {SENTINEL_INSTALL_METHODS.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setInstallTab(method.id)}
                      className={`pb-1 font-mono text-xs transition ${installTab === method.id
                        ? 'border-b border-[#2997FF] text-white'
                        : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(activeInstall.command, 'install')}
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-400 transition hover:text-white"
                >
                  {copiedKey === 'install' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="mt-3 overflow-x-auto bg-[#070B12] px-4 py-3.5 font-mono text-xs text-sky-300 sm:text-sm">
                <code>$ {activeInstall.command}</code>
              </pre>
            </div>
          </div>

          {/* Interactive Command Reference Split */}
          <div className="reveal-up mt-6 grid gap-12 lg:grid-cols-12">
            {/* Left Command Index */}
            <div className="divide-y divide-white/10 lg:col-span-5">
              {SENTINEL_COMMANDS.map((cmd, idx) => {
                const isSelected = idx === activeCmdIdx;
                return (
                  <button
                    key={cmd.id}
                    type="button"
                    onClick={() => setActiveCmdIdx(idx)}
                    className={`group flex w-full flex-col py-5 text-left transition-all ${isSelected ? 'opacity-100' : 'opacity-55 hover:opacity-90'
                      }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-baseline gap-4">
                        <span
                          className={`font-mono text-xs ${isSelected ? 'text-[#2997FF]' : 'text-zinc-600'
                            }`}
                        >
                          {cmd.index}
                        </span>
                        <span className="font-mono text-base font-medium text-white sm:text-lg">
                          {cmd.command}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                        {cmd.category}
                      </span>
                    </div>
                    <p className="mt-1.5 pl-9 text-sm text-zinc-400">{cmd.summary}</p>
                  </button>
                );
              })}
            </div>

            {/* Right Sticky Command Spec & Output */}
            <div className="lg:col-span-7 lg:border-l lg:border-white/10 lg:pl-12">
              <div className="sticky top-28">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#2997FF]">
                      {activeCmd.category} • COMMAND {activeCmd.index}
                    </span>
                    <h3 className="mt-2 font-mono text-2xl font-semibold text-white sm:text-3xl">
                      {activeCmd.command}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(activeCmd.usage, `usage-${activeCmd.id}`)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 font-mono text-xs text-zinc-300 transition hover:border-white/40 hover:text-white"
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

                {/* Usage */}
                <div className="mt-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Usage
                  </p>
                  <pre className="mt-2.5 overflow-x-auto border border-white/10 bg-[#070B12] px-5 py-4 font-mono text-sm text-white">
                    <code>$ {activeCmd.usage}</code>
                  </pre>
                </div>

                {/* Flags */}
                <div className="mt-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Flags &amp; Options
                  </p>
                  <div className="mt-3 divide-y divide-white/10 border-y border-white/10">
                    {activeCmd.flags.map((f) => (
                      <div
                        key={f.flag}
                        className="grid gap-2 py-3.5 sm:grid-cols-12 sm:items-baseline"
                      >
                        <code className="font-mono text-xs text-[#2997FF] sm:col-span-4">
                          {f.flag}
                        </code>
                        <span className="text-sm text-zinc-400 sm:col-span-8">
                          {f.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Output */}
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                      Sample Terminal Output
                    </p>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                      Exit Codes: 0 Pass · 1 Policy Fail · 3 Provider Error
                    </span>
                  </div>
                  <div className="mt-2.5 overflow-x-auto border border-white/10 bg-[#05080F] p-5 font-mono text-xs leading-7 sm:text-[13px]">
                    {activeCmd.sampleOutput.map((line, i) => {
                      const colorClass = line.startsWith('$')
                        ? 'text-white font-medium'
                        : line.includes('CRITICAL') || line.startsWith('- ')
                          ? 'text-rose-400'
                          : line.startsWith('+ ') || line.startsWith('✓')
                            ? 'text-emerald-400'
                            : line.startsWith('▸') || line.startsWith('┌') || line.startsWith('└') || line.startsWith('│')
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
        </div>
      </section>

      {/* ================= PYTHON LIBRARY + SCANNER TIERS ================= */}
      <section className="w-full border-t border-white/10 bg-[#030508] py-24">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="reveal-up grid gap-14 lg:grid-cols-12 lg:items-start">
            {/* Left: Python Library API */}
            <div className="lg:col-span-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#2997FF]">
                    Python Library
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
                    Programmatic integration.
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(SENTINEL_PYTHON_SNIPPET, 'python-sdk')}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 font-mono text-xs text-zinc-300 transition hover:border-white/40 hover:text-white"
                >
                  {copiedKey === 'python-sdk' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="mt-6 overflow-x-auto border border-white/10 bg-[#05080F] p-6 font-mono text-xs leading-7 text-zinc-200 sm:text-[13px]">
                <code>{SENTINEL_PYTHON_SNIPPET}</code>
              </pre>
            </div>

            {/* Right: Pinned Scanner Tiers & Multi-Agent Architecture */}
            <div className="lg:col-span-6 lg:border-l lg:border-white/10 lg:pl-12">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#2997FF]">
                Scanner Tiers &amp; Grounded AI
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
                Deterministic by default.
              </h2>

              <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
                <div className="py-5">
                  <p className="font-mono text-xs text-[#2997FF]">CORE TIER (DEFAULT)</p>
                  <p className="mt-1 text-lg font-medium text-white">
                    Semgrep 1.172.0 · Bandit 1.9.4 · GitLeaks 8.30.1
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Fast CI gating (~4s), zero API keys required, reproducible in Docker read-only mounts.
                  </p>
                </div>
                <div className="py-5">
                  <p className="font-mono text-xs text-[#2997FF]">EXTENDED TIER (--extended)</p>
                  <p className="mt-1 text-lg font-medium text-white">
                    Core + Trivy 0.74.0 · OSV-Scanner 2.5.1
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Adds dependency &amp; SCA vulnerability scanning across lockfiles, requirements, and SBOMs.
                  </p>
                </div>
                <div className="py-5">
                  <p className="font-mono text-xs text-[#2997FF]">3-STAGE MULTI-AGENT AI (--ai)</p>
                  <p className="mt-1 text-lg font-medium text-white">
                    Evidence Analyst → Exploit &amp; Remediation → Independent Critic
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Local zero-egress Ollama by default; optional Groq &amp; Google Gemini with secret redaction and explicit egress guard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactFooter />
    </div>
  );
}
