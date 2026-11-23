import { ArrowLeft, Mail } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ContactFooter } from './components/Footer';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useRevealObserver } from './hooks/useReveal';
import { COMPANY_INFO } from './data/company';

interface PolicySection {
  index: string;
  title: string;
  summary: string;
  points: string[];
}

const POLICY_SECTIONS: PolicySection[] = [
  {
    index: '01',
    title: 'Information We Collect',
    summary: 'We collect only the minimum information required to communicate and deliver engineering services.',
    points: [
      'Direct contact details you voluntarily send via email (such as your name, email address, organization, and project requirements).',
      'Standard server access metadata (IP address, browser type, and timestamps) strictly for security and uptime reliability.',
      'We do not sell personal data, run third-party ad networks, or deploy cross-site behavioral tracking cookies.',
    ],
  },
  {
    index: '02',
    title: 'How We Use Information',
    summary: 'Data is used solely to respond to inquiries, deliver software projects, and maintain security.',
    points: [
      'Responding to project inquiries, proposals, and technical support requests sent to noblenettechnologies@gmail.com.',
      'Delivering contracted services including law firm websites, e-commerce platforms, cloud deployments, and security audits.',
      'Complying with applicable legal obligations and protecting our infrastructure against unauthorized access.',
    ],
  },
  {
    index: '03',
    title: 'SentinelAI CLI & Privacy Controls',
    summary: 'SentinelAI (nitaanth-sentinelai) is engineered as a local-first, fail-closed security tool.',
    points: [
      'Core and extended repository scans run locally on your machine or CI runner without transmitting source code to NobleNet servers.',
      'Opt-in AI enrichment defaults to local zero-egress inference via Ollama.',
      'Remote LLM providers (Groq or Google Gemini) remain disabled unless explicitly enabled with --egress allow and apply automatic secret redaction prior to transmission.',
    ],
  },
  {
    index: '04',
    title: 'Third-Party Embeds & External Links',
    summary: 'External tools are clearly marked and governed by their respective policies.',
    points: [
      'Our Contact section includes an embedded Google Map for our Mumbai office location; interacting with the map is subject to Google’s Privacy Policy.',
      'Outbound links to PyPI, Docker Hub, and GitHub direct you to external platforms outside NobleNet’s control.',
    ],
  },
  {
    index: '05',
    title: 'Data Security & Retention',
    summary: 'Client codebases, credentials, and correspondence are protected with strict access controls.',
    points: [
      'Project materials and client communications are accessed only by authorized NobleNet engineers on a need-to-know basis.',
      'We retain inquiry and contract records only for as long as necessary to fulfill project obligations or legal requirements.',
    ],
  },
  {
    index: '06',
    title: 'Your Privacy Rights',
    summary: 'You remain in full control of any personal information you share with us.',
    points: [
      'Request access to, correction of, or deletion of personal contact records held by NobleNet Software Technologies.',
      'Withdraw consent for ongoing communications at any time by writing to noblenettechnologies@gmail.com.',
      'We honor privacy requests in alignment with India’s Digital Personal Data Protection (DPDP) Act and applicable global standards.',
    ],
  },
];

export default function PrivacyApp() {
  useSmoothScroll();
  useRevealObserver();

  return (
    <div className="relative min-h-screen w-full bg-black text-[#F5F5F7]">
      <Navbar page="privacy" />

      {/* ================= HEADER ================= */}
      <section className="relative w-full overflow-hidden border-b border-white/10 bg-black pt-36 pb-20 lg:pt-44 lg:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/4 top-0 h-[380px] w-[620px] rounded-full bg-[#2997FF]/10 blur-[140px]"
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
                Legal &amp; Privacy
              </p>
              <h1 className="mt-4 text-5xl font-semibold leading-[1.03] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                Privacy Policy.
              </h1>
            </div>
            <div className="text-sm text-zinc-400 lg:text-right">
              <p className="font-medium text-white">{COMPANY_INFO.name}</p>
              <p className="mt-1">Effective Date: November 23, 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= POLICY SECTIONS (Full-Width Hairline Layout) ================= */}
      <section className="w-full bg-[#030508]">
        <div className="w-full divide-y divide-white/10">
          {POLICY_SECTIONS.map((sec) => (
            <article
              key={sec.index}
              className="reveal-up w-full px-6 py-16 sm:px-10 lg:px-16 lg:py-20"
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-4">
                  <span className="text-xs font-semibold tracking-[0.14em] text-[#2997FF]">
                    {sec.index}
                  </span>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                    {sec.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {sec.summary}
                  </p>
                </div>

                <div className="lg:col-span-8 lg:border-l lg:border-white/10 lg:pl-12">
                  <ul className="space-y-4">
                    {sec.points.map((pt, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3.5 text-base leading-relaxed text-zinc-300"
                      >
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2997FF]" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= PRIVACY CONTACT STRIP ================= */}
      <section className="w-full border-t border-white/10 bg-black py-20">
        <div className="reveal-up flex w-full flex-col justify-between gap-6 px-6 sm:px-10 lg:flex-row lg:items-center lg:px-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2997FF]">
              Privacy Inquiries
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Questions about how we handle your data?
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              {COMPANY_INFO.location.addressLine}
            </p>
          </div>
          <a
            href={`mailto:${COMPANY_INFO.email}?subject=Privacy%20Inquiry%20—%20NobleNet`}
            className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            <Mail className="h-4 w-4" />
            <span>{COMPANY_INFO.email}</span>
          </a>
        </div>
      </section>

      <ContactFooter />
    </div>
  );
}
