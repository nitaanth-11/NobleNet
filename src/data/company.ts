export interface ServiceItem {
  id: number;
  index: string;
  title: string;
  tagline: string;
  spec: string;
  modelLabel: string;
}

export interface PillarItem {
  value: string;
  label: string;
}

export interface SentinelModule {
  id: string;
  code: string;
  title: string;
  summary: string;
  metric: string;
  metricLabel: string;
}

export interface SentinelCommandDoc {
  id: string;
  index: string;
  command: string;
  usage: string;
  category: string;
  summary: string;
  flags: { flag: string; description: string }[];
  sampleOutput: string[];
}

export interface ClientTestimonial {
  id: string;
  index: string;
  client: string;
  sector: string;
  engagement: string;
  quote: string;
  outcome: string;
}

export const COMPANY_INFO = {
  name: 'NobleNet Software Technologies',
  shortName: 'NobleNet',
  tagline: 'Enterprise software, DevSecOps tooling, and AI-powered engineering.',
  email: 'contact@noblenetsoftware.com',
  location: {
    city: 'Hyderabad, Telangana',
    country: 'India',
    addressLine: 'HITEC City Tech Corridor, Hyderabad — 500081',
    timezone: 'IST (UTC+5:30) • Global Engineering',
  },
  year: new Date().getFullYear(),
};

export const SENTINEL_META = {
  packageName: 'nitaanth-sentinelai',
  version: '0.1.1',
  pythonRequires: '>=3.9',
  pypiUrl: 'https://pypi.org/project/nitaanth-sentinelai/',
  dockerUrl: 'https://hub.docker.com/r/nitaanth11/sentinelai',
  repoUrl: 'https://github.com/tanayaparalkar/capstone',
};

export const ABOUT_METRICS: PillarItem[] = [
  { value: 'DevSecOps', label: 'Security DNA' },
  { value: '5 Scanners', label: 'SentinelAI Core + Ext' },
  { value: 'AST-Safe', label: 'Code Remediation' },
  { value: 'Fail-Closed', label: 'Engineering Rigor' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 0,
    index: '01',
    title: 'Custom Software & Platforms',
    tagline: 'Multi-tier web platforms, microservices, and resilient APIs.',
    spec: 'Frontend  →  API Gateway  →  Distributed DB',
    modelLabel: '3D Multi-Tier Application Stack',
  },
  {
    id: 1,
    index: '02',
    title: 'AI & Autonomous Systems',
    tagline: 'Grounded multi-agent LLM pipelines, code intelligence, and automation.',
    spec: 'Input Tensor  →  Hidden Weights  →  Inference',
    modelLabel: '3D Deep Neural Network Graph',
  },
  {
    id: 2,
    index: '03',
    title: 'Cloud & DevOps Infrastructure',
    tagline: 'Reproducible Docker pipelines, Kubernetes clusters, and CI/CD security gates.',
    spec: 'Rack Cluster  →  Fiber Uplink  →  Edge Nodes',
    modelLabel: '3D Enterprise Data-Center Cluster',
  },
  {
    id: 3,
    index: '04',
    title: 'DevSecOps & Security Auditing',
    tagline: 'SAST, secret detection, SCA dependency audits, and SARIF compliance.',
    spec: 'Traffic Stream  →  Firewall Gate  →  Vault',
    modelLabel: '3D Packet-Inspection Firewall',
  },
];

export const SENTINEL_MODULES: SentinelModule[] = [
  {
    id: 'orchestration',
    code: '01',
    title: 'Multi-Scanner Orchestration',
    summary:
      'Runs Semgrep, Bandit, and GitLeaks by default — plus Trivy and OSV-Scanner via --extended — normalized into strict Pydantic contracts.',
    metric: '5 Tools',
    metricLabel: 'Fail-Closed Pipeline',
  },
  {
    id: 'correlation',
    code: '02',
    title: 'Cross-Scanner Correlation',
    summary:
      'Deduplicates overlapping findings across scanners using CWE taxonomy and AST line proximity into unified correlated groups.',
    metric: 'CWE + AST',
    metricLabel: 'Deduplication',
  },
  {
    id: 'ai-agents',
    code: '03',
    title: 'Grounded Multi-Agent AI',
    summary:
      'Opt-in 3-stage pipeline (Evidence Analyst → Exploit & Remediation → Independent Critic) via local Ollama, Groq, or Google Gemini with secret redaction and egress guard.',
    metric: '3-Stage',
    metricLabel: 'Verified Reasoning',
  },
  {
    id: 'ast-fix',
    code: '04',
    title: 'Closed-Loop AST Remediation',
    summary:
      'Generates unified diffs, validates Python syntax via ast.parse, snapshots backups in .sentinelai_backups/, and supports atomic rollback.',
    metric: 'fix / undo',
    metricLabel: 'Atomic Rollback',
  },
  {
    id: 'reporting',
    code: '05',
    title: 'Deterministic CI Reporting',
    summary:
      'Exports Terminal, JSON, Markdown, HTML, and SARIF 2.1.0 with --fail-on gating and clean exit codes (0 pass, 1 findings, 3 provider error).',
    metric: 'SARIF 2.1',
    metricLabel: '5 Output Formats',
  },
];

export const SENTINEL_INSTALL_METHODS = [
  {
    id: 'pip',
    label: 'PyPI (pip)',
    command: 'pip install nitaanth-sentinelai',
  },
  {
    id: 'docker',
    label: 'Docker (Core Scan)',
    command:
      'docker run --rm -v "$(pwd):/workspace:ro" -v "$(pwd)/sentinelai-output:/output" nitaanth11/sentinelai scan /workspace --format json --output /output/scan-result.json',
  },
  {
    id: 'source',
    label: 'Editable (Dev)',
    command: 'cd sentinelai-cli && pip install -e ".[dev]"',
  },
] as const;

export const SENTINEL_COMMANDS: SentinelCommandDoc[] = [
  {
    id: 'scan',
    index: '01',
    command: 'sentinelai scan',
    usage: 'sentinelai scan . --extended --fail-on high --format sarif --output results.sarif',
    category: 'SCANNING & CI GATING',
    summary:
      'Run core scanners (Semgrep, Bandit, GitLeaks) or add Trivy & OSV-Scanner with --extended.',
    flags: [
      { flag: '--extended', description: 'Include dependency & SCA scanners (Trivy + OSV-Scanner)' },
      { flag: '--fail-on <lvl>', description: 'Exit code 1 when findings meet severity (high | critical)' },
      { flag: '--severity <lvl>', description: 'Filter reported findings by minimum severity' },
      { flag: '--format <type>', description: 'Output format: terminal | json | markdown | html | sarif' },
      { flag: '--output <path>', description: 'Write structured report cleanly to file' },
    ],
    sampleOutput: [
      '$ sentinelai scan .',
      '┌─ SentinelAI Security Scan ─────────────────────────────────────────┐',
      '│ Repository  my-python-app  |  Mode: standard  |  Version: 0.1.1    │',
      '└────────────────────────────────────────────────────────────────────┘',
      'Total findings: 10  (CRITICAL: 4 · HIGH: 4 · MEDIUM: 2)',
      'By scanner: bandit (2), gitleaks (1), osv-scanner (1), semgrep (6)',
      'SENT-001  CRITICAL  config/settings.py:14       secret-exposure          gitleaks',
      'SENT-002  CRITICAL  app/db/queries.py:47        sql-injection            semgrep',
      'SENT-008  CRITICAL  app/utils/cache.py:55       insecure-deserialization bandit',
    ],
  },
  {
    id: 'scan-ai',
    index: '02',
    command: 'sentinelai scan --ai',
    usage: 'sentinelai scan . --ai-provider groq --egress allow --details SENT-001',
    category: 'MULTI-AGENT AI',
    summary:
      'Enrich correlated findings via local zero-egress Ollama or remote Groq/Gemini with automatic secret redaction.',
    flags: [
      { flag: '--ai', description: 'Enable local zero-egress 3-stage AI enrichment via Ollama' },
      { flag: '--ai-provider <p>', description: 'Select backend provider (ollama | groq | gemini)' },
      { flag: '--egress allow', description: 'Explicitly opt in before sending redacted context remotely' },
      { flag: '--details <ID>', description: 'Inspect full scanner + AI detail card for a finding (e.g. SENT-001)' },
    ],
    sampleOutput: [
      '$ sentinelai scan . --ai --details SENT-002',
      '▸ Stage 1/3  Evidence Analyst       — verified AST taint sink at app/db/queries.py:47',
      '▸ Stage 2/3  Exploit & Remediation  — mapped CWE-89 SQL injection & parameterized fix',
      '▸ Stage 3/3  Independent Critic     — groundedness & redaction checks passed',
      '✓ Finding SENT-002 enriched (zero secrets egressed)',
    ],
  },
  {
    id: 'fix',
    index: '03',
    command: 'sentinelai fix',
    usage: 'sentinelai fix . --dry-run',
    category: 'AST REMEDIATION',
    summary:
      'Review threat cards and unified diffs interactively, validate Python syntax with ast.parse, and verify patches.',
    flags: [
      { flag: '--dry-run', description: 'Preview color-coded unified diffs without modifying files' },
      { flag: '--no-ai', description: 'Apply fast deterministic rule-based fixes without LLM calls' },
    ],
    sampleOutput: [
      '$ sentinelai fix . --dry-run',
      '▸ Target: SENT-002  app/db/queries.py:47 (sql-injection)',
      '--- a/app/db/queries.py',
      '+++ b/app/db/queries.py',
      '- cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")',
      '+ cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))',
      '✓ ast.parse validation passed  |  Snapshot path: .sentinelai_backups/',
    ],
  },
  {
    id: 'undo',
    index: '04',
    command: 'sentinelai undo',
    usage: 'sentinelai undo .',
    category: 'ATOMIC ROLLBACK',
    summary:
      'Atomically revert the latest fix session using snapshots stored in .sentinelai_backups/.',
    flags: [
      { flag: '<path>', description: 'Target repository directory containing .sentinelai_backups/' },
    ],
    sampleOutput: [
      '$ sentinelai undo .',
      '▸ Restoring snapshot from .sentinelai_backups/latest...',
      '✓ Reverted app/db/queries.py',
      '✓ Working tree restored atomically',
    ],
  },
  {
    id: 'report',
    index: '05',
    command: 'sentinelai report',
    usage: 'sentinelai report scan-result.json --format html --output report.html',
    category: 'REPORT RENDERING',
    summary:
      'Render HTML, SARIF 2.1.0, or Markdown reports from saved JSON scan output without re-running scanners.',
    flags: [
      { flag: '<scan-result.json>', description: 'Previously saved SentinelAI JSON scan artifact' },
      { flag: '--format <type>', description: 'Target format (html | sarif | markdown | terminal)' },
      { flag: '-o, --output <file>', description: 'Destination path for the rendered report' },
    ],
    sampleOutput: [
      '$ sentinelai report scan-result.json --format sarif --output sentinelai-results.sarif',
      '✓ Loaded 10 correlated findings from scan-result.json (no re-scan required)',
      '✓ Exported SARIF 2.1.0 -> sentinelai-results.sarif',
    ],
  },
  {
    id: 'providers',
    index: '06',
    command: 'sentinelai providers',
    usage: 'sentinelai providers',
    category: 'AI BACKENDS & PRIVACY',
    summary:
      'List configured LLM backends (Ollama, Groq, Google Gemini) along with data-retention and egress policies.',
    flags: [
      { flag: '--debug', description: 'App-level flag before subcommand to print full diagnostics on stderr' },
    ],
    sampleOutput: [
      '$ sentinelai providers',
      'PROVIDER   MODE     EGRESS POLICY            STATUS',
      'ollama     local    zero-egress (default)    configured',
      'groq       remote   requires --egress allow  API key checked via GROQ_API_KEY',
      'gemini     remote   requires --egress allow  API key checked via GEMINI_API_KEY',
    ],
  },
  {
    id: 'version',
    index: '07',
    command: 'sentinelai version',
    usage: 'sentinelai version && sentinelai --help',
    category: 'VERIFICATION',
    summary:
      'Verify CLI installation, inspect version metadata, and display all available commands.',
    flags: [
      { flag: '--help', description: 'Display Typer CLI subcommands and options' },
      { flag: '--debug', description: 'Enable full traceback output on stderr while keeping stdout pure' },
    ],
    sampleOutput: [
      '$ sentinelai version',
      'SentinelAI CLI v0.1.1 (Python >=3.9 · Core: Semgrep, Bandit, GitLeaks)',
    ],
  },
];

export const SENTINEL_PYTHON_SNIPPET = `import sentinelai
from sentinelai.providers import LiveFindingsProvider
from sentinelai.contracts import ScanMode, ScannerTier

provider = LiveFindingsProvider()
result = provider.get_scan_result(
    "./my-project",
    mode=ScanMode.STANDARD,
    tier=ScannerTier.CORE,
)

print(f"Raw findings: {len(result.scanner_findings)}")
print(f"Correlated issues: {len(result.correlated_findings)}")`;

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 'adv-jyoti',
    index: '01',
    client: 'Adv. Jyoti',
    sector: 'Legal Practice & Advisory',
    engagement: 'Digital Presence & Case Workflow Automation',
    quote:
      'NobleNet delivered a refined, dependable digital platform with remarkable speed and clarity — every technical detail handled with absolute professionalism.',
    outcome: 'Streamlined client intake & secure digital records',
  },
  {
    id: 'entrust-legal',
    index: '02',
    client: 'Entrust Legal Services',
    sector: 'Corporate & Legal Services',
    engagement: 'Enterprise Web Architecture & Secure Client Portal',
    quote:
      'Precision, confidentiality, and clean engineering. NobleNet transformed how our legal team collaborates with clients online.',
    outcome: 'Encrypted document exchange & zero-downtime reliability',
  },
  {
    id: 'maison-momento',
    index: '03',
    client: 'Maison Momento',
    sector: 'Luxury & Bespoke Experiences',
    engagement: 'Flagship Brand Platform & Interactive Web Engineering',
    quote:
      'They matched our aesthetic standard down to the last pixel while keeping performance effortless across every device.',
    outcome: 'Elevated digital storefront & sub-second load speeds',
  },
  {
    id: 'emerald-green',
    index: '04',
    client: 'Emerald Green Environment Trust',
    sector: 'Environmental & Sustainability Trust',
    engagement: 'Impact Portal & Outreach Infrastructure',
    quote:
      'NobleNet brought modern technology to our environmental mission — making our initiatives visible, transparent, and easy to support.',
    outcome: 'Unified public impact hub & scalable community reach',
  },
];
