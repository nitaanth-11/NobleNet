export interface RequirementRow {
  component: string;
  version: string;
  tier: string;
  source: string;
  purpose: string;
}

export interface InstallGuideTab {
  id: string;
  label: string;
  badge: string;
  summary: string;
  steps: {
    step: string;
    title: string;
    note: string;
    command: string;
  }[];
}

export interface RunModeRow {
  aspect: string;
  scannerOnly: string;
  aiEnriched: string;
}

export interface ExitCodeRow {
  code: string;
  name: string;
  meaning: string;
}

export interface EnvVarRow {
  variable: string;
  defaultVal: string;
  purpose: string;
}

export interface VulnClassRow {
  cwe: string;
  name: string;
  remediation: string;
}

export const RUNTIME_REQUIREMENTS: RequirementRow[] = [
  {
    component: 'Python',
    version: '>= 3.9',
    tier: 'Runtime',
    source: 'python.org',
    purpose: 'Core interpreter (GitHub CI verified on Python 3.12)',
  },
  {
    component: 'typer',
    version: '>= 0.12.0',
    tier: 'Core Dep',
    source: 'PyPI',
    purpose: 'CLI subcommands, flags, and --debug error handling',
  },
  {
    component: 'rich',
    version: '>= 13.7.0',
    tier: 'Core Dep',
    source: 'PyPI',
    purpose: 'Terminal summary panels, finding tables, and color unified diffs',
  },
  {
    component: 'pydantic',
    version: '>= 2.6.0',
    tier: 'Core Dep',
    source: 'PyPI',
    purpose: 'Strict ScanResult, finding, and report schema contracts',
  },
  {
    component: 'jinja2',
    version: '>= 3.1.0',
    tier: 'Core Dep',
    source: 'PyPI',
    purpose: 'Offline static HTML report rendering with autoescaping always on',
  },
  {
    component: 'GitPython',
    version: '>= 3.1.0',
    tier: 'Core Dep',
    source: 'PyPI',
    purpose: 'Repository branch, commit hash, and git tree discovery',
  },
  {
    component: 'pytest / pyyaml / jsonschema',
    version: '>= 8.0 / 6.0 / 4.0',
    tier: 'Dev Extra [dev]',
    source: 'PyPI',
    purpose: 'Full test suite and contract schema verification',
  },
];

export const PINNED_SCANNERS: RequirementRow[] = [
  {
    component: 'Semgrep',
    version: '1.172.0',
    tier: 'Core (Default)',
    source: 'PyPI',
    purpose: 'Static Application Security Testing (SAST) across source code',
  },
  {
    component: 'Bandit',
    version: '1.9.4',
    tier: 'Core (Default)',
    source: 'PyPI',
    purpose: 'Python AST security linting for unsafe APIs & weak cryptography',
  },
  {
    component: 'GitLeaks',
    version: '8.30.1',
    tier: 'Core (Default)',
    source: 'GitHub Release (SHA-256 verified)',
    purpose: 'Dedicated hardcoded secret, API key, and credential detection',
  },
  {
    component: 'Trivy',
    version: '0.74.0',
    tier: 'Extended (--extended)',
    source: 'GitHub Release (SHA-256 verified)',
    purpose: 'Filesystem vulnerability SCA (~108 MB local DB cached on first run)',
  },
  {
    component: 'OSV-Scanner',
    version: '2.5.1',
    tier: 'Extended (--extended)',
    source: 'GitHub Release (SHA-256 verified)',
    purpose: 'Recursive transitive dependency advisory lookup via osv.dev',
  },
];

export const INSTALL_GUIDES: InstallGuideTab[] = [
  {
    id: 'pypi',
    label: 'PyPI (Standard)',
    badge: 'Recommended',
    summary:
      'Install globally or inside a Python >=3.9 virtual environment. Core scans need Semgrep, Bandit, and GitLeaks on PATH.',
    steps: [
      {
        step: '01',
        title: 'Verify Python Version (>= 3.9)',
        note: 'SentinelAI requires Python 3.9 or higher (CI runs on Python 3.12).',
        command: 'python --version',
      },
      {
        step: '02',
        title: 'Install nitaanth-sentinelai from PyPI',
        note: 'Installs the CLI and Python library with Typer, Rich, Pydantic, Jinja2, and GitPython.',
        command: 'pip install nitaanth-sentinelai',
      },
      {
        step: '03',
        title: 'Verify CLI Installation',
        note: 'Confirm the sentinelai binary is registered on your PATH.',
        command: 'sentinelai version && sentinelai --help',
      },
      {
        step: '04',
        title: 'Optional: Extended Dependency Scanners',
        note: 'Only required if running --extended (needs Trivy 0.74.0, OSV-Scanner 2.5.1, and a manifest file).',
        command: 'brew install trivy osv-scanner && sentinelai scan . --extended',
      },
    ],
  },
  {
    id: 'docker',
    label: 'Docker (All 5 Scanners Pinned)',
    badge: 'Zero Host Setup',
    summary:
      'Reproducible container image packaging SentinelAI with all 5 pinned scanners. Mounts your repo read-only (:ro) and runs as non-root uid 1000.',
    steps: [
      {
        step: '01',
        title: 'Create Output Directory First',
        note: 'Prevents Docker from creating the bind mount as root so the unprivileged sentinelai user can write reports.',
        command: 'mkdir -p sentinelai-output',
      },
      {
        step: '02',
        title: 'Run Core Tier Scan (Read-Only Repo Mount)',
        note: 'Runs Semgrep, Bandit, and GitLeaks with zero modification to the mounted workspace.',
        command:
          'docker run --rm -v "$(pwd):/workspace:ro" -v "$(pwd)/sentinelai-output:/output" nitaanth11/sentinelai scan /workspace --format json --output /output/scan-result.json',
      },
      {
        step: '03',
        title: 'Run Extended Tier Scan (Adds Trivy & OSV-Scanner)',
        note: 'Requires runtime network access for Trivy vulnerability DB (~108 MB) and osv.dev queries.',
        command:
          'docker run --rm -v "$(pwd):/workspace:ro" -v "$(pwd)/sentinelai-output:/output" nitaanth11/sentinelai scan /workspace --extended --format sarif --output /output/results.sarif',
      },
      {
        step: '04',
        title: 'Build Locally from Source (x86-64 & Apple Silicon)',
        note: 'BuildKit supplies TARGETARCH automatically from the repository root Dockerfile.',
        command: 'docker build -t sentinelai:local .',
      },
    ],
  },
  {
    id: 'ollama',
    label: 'Local AI Enrichment (Ollama)',
    badge: 'Zero-Egress AI',
    summary:
      'AI enrichment is opt-in and runs locally via Ollama with no API keys. Requires two distinct models: one for generation and one dedicated embedding model.',
    steps: [
      {
        step: '01',
        title: 'Start Local Ollama Server',
        note: 'Install Ollama from ollama.com and run the daemon on http://localhost:11434.',
        command: 'ollama serve',
      },
      {
        step: '02',
        title: 'Pull Both Distinct Models',
        note: 'Text-generation models cannot generate embeddings (causes HTTP 501). Pull both exact tags.',
        command: 'ollama pull llama3.1:8b && ollama pull nomic-embed-text',
      },
      {
        step: '03',
        title: 'Export Model Environment Variables',
        note: 'Always match the exact pulled tag shown in `ollama list` (not shorthand like llama3.1).',
        command:
          'export SENTINELAI_AI_LLM_MODEL=llama3.1:8b\nexport SENTINELAI_AI_EMBEDDING_MODEL=nomic-embed-text',
      },
      {
        step: '04',
        title: 'Run Enriched Multi-Agent Scan',
        note: 'Passing --ai makes AI enrichment mandatory (exits 2 if unset); use --no-ai to skip anytime.',
        command: 'sentinelai scan . --ai --format html --output report.html',
      },
    ],
  },
  {
    id: 'dev',
    label: 'From Source (Editable Dev)',
    badge: 'Contributors',
    summary:
      'Set up an isolated virtual environment with pytest and schema validation tooling for local development and CI reproduction.',
    steps: [
      {
        step: '01',
        title: 'Create & Activate Virtual Environment',
        note: 'Isolates SentinelAI dependencies from system Python packages.',
        command: 'cd sentinelai-cli && python3 -m venv .venv',
      },
      {
        step: '02',
        title: 'Install Editable Package with Dev Extras',
        note: 'Registers the sentinelai command live while pulling pytest, pyyaml, and jsonschema.',
        command: '.venv/Scripts/pip install -e ".[dev]"',
      },
      {
        step: '03',
        title: 'Run Full Test Suite & Local CI Gate',
        note: 'Reproduces the exact GitHub Actions CI pipeline locally without re-scanning.',
        command:
          'pytest -v\nsentinelai scan . --format json --output scan-result.json --fail-on high\nsentinelai report scan-result.json --format sarif --output sentinelai-results.sarif',
      },
    ],
  },
];

export const RUN_MODES_COMPARISON: RunModeRow[] = [
  {
    aspect: 'Setup Required',
    scannerOnly: 'None (Semgrep, Bandit, GitLeaks)',
    aiEnriched: 'Local Ollama + 2 distinct models (generation + embeddings)',
  },
  {
    aspect: 'Typical Runtime',
    scannerOnly: '~4s on a small repository',
    aiEnriched: '~285s local median (39 LLM calls across 13 correlated issues)',
  },
  {
    aspect: 'Execution Cost',
    scannerOnly: 'Fixed deterministic scanner startup',
    aiEnriched: '3 sequential multi-agent calls per correlated issue',
  },
  {
    aspect: 'Output Artifacts',
    scannerOnly: 'Correlated findings, severities, all 5 formats, --fail-on gating',
    aiEnriched: 'Same + per-finding explanation, exploit path, and remediation',
  },
  {
    aspect: 'Best Suited For',
    scannerOnly: 'CI/CD pipeline gating — fast, deterministic, zero secrets',
    aiEnriched: 'Local developer triage — deep root-cause review & patching',
  },
];

export const EXIT_CODES: ExitCodeRow[] = [
  {
    code: '0',
    name: 'SUCCESS',
    meaning:
      'Scan completed cleanly (informational by default unless --fail-on threshold is crossed).',
  },
  {
    code: '1',
    name: 'SECURITY_FINDINGS',
    meaning:
      'Scan succeeded, and findings met or exceeded the --fail-on severity gate (policy outcome).',
  },
  {
    code: '2',
    name: 'INVALID_INPUT',
    meaning:
      'Invalid flag, missing path, malformed JSON passed to report, or --ai used without model env vars.',
  },
  {
    code: '3',
    name: 'PROVIDER_ERROR',
    meaning:
      'Scanner binary missing, unreachable Ollama host, missing manifest for OSV-Scanner, or provider crash.',
  },
  {
    code: '4',
    name: 'INTERNAL_ERROR',
    meaning:
      'Unexpected unhandled exception inside SentinelAI — re-run with `sentinelai --debug` for full stderr traceback.',
  },
];

export const AI_ENV_VARS: EnvVarRow[] = [
  {
    variable: 'SENTINELAI_AI_LLM_MODEL',
    defaultVal: 'Required for --ai',
    purpose: 'Ollama generation model tag via /api/generate (e.g. llama3.1:8b)',
  },
  {
    variable: 'SENTINELAI_AI_EMBEDDING_MODEL',
    defaultVal: 'Required for --ai',
    purpose: 'Dedicated Ollama embedding model via /api/embed (e.g. nomic-embed-text)',
  },
  {
    variable: 'SENTINELAI_AI_LLM_HOST',
    defaultVal: 'http://localhost:11434',
    purpose: 'Base URL for local Ollama server (shared by generation & embeddings)',
  },
  {
    variable: 'SENTINELAI_AI_RETRIEVAL_TOP_K',
    defaultVal: '5',
    purpose: 'Security knowledge-base chunks retrieved per finding for RAG context',
  },
  {
    variable: 'SENTINELAI_AI_ENABLE_VERIFICATION',
    defaultVal: 'true',
    purpose: 'Runs independent grounding critic before emitting AI-enriched findings',
  },
  {
    variable: 'SENTINELAI_AI_REQUEST_TIMEOUT_SECONDS',
    defaultVal: '120',
    purpose: 'Per-attempt HTTP timeout for Ollama generation and embedding requests',
  },
  {
    variable: 'SENTINELAI_AI_MAX_ATTEMPTS',
    defaultVal: '2',
    purpose: 'Total attempts on transient errors (5xx/connection); never retries 404/501',
  },
];

export const VULNERABILITY_CLASSES: VulnClassRow[] = [
  { cwe: 'CWE-89', name: 'SQL Injection', remediation: 'Parameterized queries with tuple binding' },
  { cwe: 'CWE-78', name: 'Command Injection', remediation: 'subprocess.run() list args with shell=False' },
  { cwe: 'CWE-502', name: 'Insecure Deserialization', remediation: 'json.loads / yaml.safe_load replacement' },
  { cwe: 'CWE-94', name: 'Arbitrary Code Execution', remediation: 'ast.literal_eval() instead of eval()' },
  { cwe: 'CWE-327', name: 'Weak Cryptography', remediation: 'Upgrades hashlib.md5() to hashlib.sha256()' },
  { cwe: 'CWE-798', name: 'Hardcoded Secrets', remediation: 'Replaces plaintext keys with os.environ.get()' },
  { cwe: 'CWE-79', name: 'Reflected XSS', remediation: 'Escapes untrusted user input via html.escape()' },
  { cwe: 'CWE-639 / 284', name: 'Broken Access Control / IDOR', remediation: 'Scopes DB queries to current_user.id' },
  { cwe: 'CWE-918', name: 'SSRF', remediation: 'URL scheme and domain allowlist validation' },
  { cwe: 'CWE-352', name: 'CSRF', remediation: 'Applies @csrf_protect on state-changing POST routes' },
  { cwe: 'CWE-16 / 400', name: 'Misconfiguration & DoS', remediation: 'Env-guarded DEBUG + Flask/FastAPI/Django/Express rate limiting' },
];
