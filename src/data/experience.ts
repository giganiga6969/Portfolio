export interface ExperiencePhase {
  number: string
  title: string
  summary: string
}

export interface ExperienceMetric {
  value: string
  label: string
}

export const afemExperience = {
  role: 'Research Intern',
  project: 'AFEM — Agentic Forensic Evidence Model',
  org: 'PESU C-ISFCR',
  location: 'Bengaluru, India',
  period: 'Jun 2026 – Aug 2026',
  github: 'https://github.com/giganiga6969/AFEM',
  accentColor: '#FB923C',

  summary:
    'AFEM answers a question existing agent-monitoring tools can\'t: when an autonomous LLM agent does something unexpected, was it authorized, was the evidence trustworthy, and was the agent\'s behavior actually caused by content it read — or did it just observe and resist it? The framework is built around an autonomous LangGraph email agent, but the agent itself isn\'t the contribution: it exists to generate realistic, reproducible action traces for the five-phase forensic pipeline to analyze.',

  phases: [
    {
      number: '01',
      title: 'Runtime Evidence Collection',
      summary:
        'Captures every tool call the agent makes as a structured, per-event Pydantic record — no post-hoc log parsing.',
    },
    {
      number: '02',
      title: 'Tamper-Evident Integrity',
      summary:
        'SHA-256 hash-chains the evidence stream and scores it TRUSTED / DEGRADED / COMPROMISED / UNKNOWN — a four-valued trust model instead of a binary flag.',
    },
    {
      number: '03',
      title: 'Timeline Reconstruction',
      summary:
        'Rebuilds the session ordered by monotonic sequence number, not wall-clock timestamp, so it survives timestamp collisions or manipulation.',
    },
    {
      number: '04',
      title: 'Explainable Attribution',
      summary:
        'Classifies each session AUTH / SCOPE / INJ / AMBIG with a transparent, rule-by-rule confidence breakdown an investigator can trace back to specific evidence.',
    },
    {
      number: '05',
      title: 'Investigation Reporting',
      summary:
        'Generates a machine-readable JSON report and a self-contained HTML report — deterministic, template-driven, zero LLM involvement.',
    },
  ] as ExperiencePhase[],

  metrics: [
    { value: '268 / 268', label: 'Regression tests passing' },
    { value: '1,000+', label: 'Enron emails + synthetic eval data' },
  ] as ExperienceMetric[],

  detail: {
    heading: 'Why "behaviorally correlated," not "keyword matched"',
    body:
      'Most prompt-injection detection flags suspicious content — an email that merely contains an injection-like phrase. That produces a lot of false positives, because content the agent read is not proof the agent acted on it. Phase 4\'s INJ classification requires the full chain: exposure to untrusted content, a matching action requested by that content, a matching action the agent actually took, correct temporal ordering, and no independent user authorization for it. Suspicious content alone gets logged as an "injection attempt detected" annotation — it does not get classified as INJ. That distinction is the actual research contribution; the email agent is just the test subject that produces evidence for the pipeline to reason about. All five phases are fully implemented, and after Phase 1 collects the raw evidence, zero LLM calls are involved — the rest of the pipeline is deterministic, which is what makes the 268/268 regression suite meaningful.',
    stack: [
      'LangGraph', 'Ollama (qwen3:8b)', 'Pydantic v2', 'SQLite + FTS5', 'pandas', 'pytest',
    ],
  },
}
