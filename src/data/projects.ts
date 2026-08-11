import type { Project } from '@/types'

/**
 * CENTRAL PROJECT REGISTRY
 * ─────────────────────────────────────────────────────────────────────────────
 * This is the ONLY file that needs to change when adding a new project.
 *
 * Steps to add a project:
 *  1. Add a new Project object below (increment id and order)
 *  2. Create a visual component at src/components/three/visuals/<visualType>.tsx
 *  3. Register it in src/components/three/visualRegistry.ts
 *  4. Redeploy
 *
 * Nothing else in the codebase needs to change.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const projects: Project[] = [
  {
    id: 1,
    slug: 'alzheimers-prediction',
    order: 1,
    title: 'Treatment-Conditioned Brain MRI Prediction',
    category: 'Healthcare AI',
    accentColor: '#4AE3B5',
    bgGlow: 'rgba(74,227,181,0.06)',
    hardProblem:
      "Most Alzheimer's models treat a scan as a one-off classification target. We're predicting what a patient's brain will look like at their next visit, conditioned on the drugs they've been taking — which means treatment context has to shape the prediction without overwriting the anatomical detail the skip connections are there to preserve.",
    description:
      "A 4-person capstone project at PES University: a Treatment-Conditioned 3D U-Net with a GAN discriminator that predicts a patient's next brain MRI from their current scan plus treatment history. Free-text medication records get mapped through a rule-based classifier into a 34-feature vector across 17 drug classes; combined with cognitive scores and ApoE4 genotype, that forms a 76-dimensional conditioning vector injected once, at the 512-dim bottleneck. Built on 8,970 longitudinal scan pairs from 10,208 ADNI scans across 1,238 subjects. Preprocessing — skull-stripping, bias correction, registration to MNI152 — is complete and validated on the full dataset; model training is currently in progress, so there are no evaluation numbers yet.",
    techStack: ['PyTorch', '3D U-Net', 'GAN', 'FSL', 'ANTs', 'ADNI Dataset'],
    github: null,
    live: null,
    visualType: 'alzheimer',
  },
  {
    id: 2,
    slug: 'aero-fno',
    order: 2,
    title: 'Aero-FNO',
    category: 'Scientific ML',
    accentColor: '#38BDF8',
    bgGlow: 'rgba(56,189,248,0.06)',
    hardProblem:
      'A standard L2 loss barely penalizes the ~5% of pixels sitting on the airfoil surface, so the first version nailed the easy far-field pressure and missed the boundary values engineers actually care about. Fixing it took a surface-weighted loss term, not more training.',
    description:
      'A Fourier Neural Operator trained on 6,400 CFD simulations to predict pressure and velocity fields around airfoils in ~34ms — about 3,000x faster than the RANS solver it replaces. Adding a surface-weighted loss term cut surface-pressure error from 143.5% to 34.7%. Used the trained model as a fast surrogate for gradient-free inverse design, finding airfoil tweaks that cut drag 2–20% across five held-out test shapes.',
    techStack: ['PyTorch', 'Fourier Neural Operators', 'Scientific ML', 'Python', 'NumPy'],
    github: 'https://github.com/giganiga6969/aero-fno',
    live: null,
    visualType: 'aerofno',
  },
  {
    id: 3,
    slug: 'kafka-streaming',
    order: 3,
    title: 'Kafka Dynamic Streaming',
    category: 'Distributed Systems',
    accentColor: '#A78BFA',
    bgGlow: 'rgba(167,139,250,0.06)',
    hardProblem:
      'Handling concurrent message delivery across multiple topics with offset control — ensuring exactly-once semantics and consumer group rebalancing without dropping events under load.',
    description:
      'A real-time event-streaming platform on Apache Kafka: broker, producer, consumer, and admin services deployed across four nodes, with dynamic topic provisioning, approval workflows for new topics, and multi-user subscriptions exposed over REST. An authenticated Flask dashboard shows live topic/subscription stats and operational logs.',
    techStack: ['Apache Kafka', 'Python', 'Flask', 'SQLite', 'REST APIs'],
    github: 'https://github.com/giganiga6969/Dynamic_Streaming_via_Kafka',
    live: null,
    visualType: 'kafka',
  },
  {
    id: 4,
    slug: 'securechat',
    order: 4,
    title: 'SecureChat',
    category: 'Cybersecurity',
    accentColor: '#F87171',
    bgGlow: 'rgba(248,113,113,0.06)',
    hardProblem:
      'RSA is too slow to encrypt every message, and AES needs a secure way to share its key in the first place. The handshake uses RSA-OAEP purely to hand off a one-time AES-256-GCM session key, then RSA-PSS-signs every message so tampering doesn\'t go unnoticed.',
    description:
      'A multi-client encrypted chat system in Python. RSA-OAEP key exchange bootstraps a per-session AES-256-GCM channel, every message carries an RSA-PSS signature, passwords are hashed with Argon2id, and a lightweight intrusion-detection layer rate-limits connections and logs suspicious activity. Ships with a Tkinter GUI, a SQLite-backed auth layer, and a Dockerfile.',
    techStack: ['RSA-2048', 'AES-256-GCM', 'RSA-PSS', 'Argon2id', 'SQLite', 'Docker'],
    github: 'https://github.com/giganiga6969/SecureChat',
    live: null,
    visualType: 'securechat',
  },
  {
    id: 5,
    slug: 'kickstarter-prediction',
    order: 5,
    title: 'Kickstarter Success Predictor',
    category: 'Applied ML',
    accentColor: '#34D399',
    bgGlow: 'rgba(52,211,153,0.06)',
    hardProblem:
      "Predicting success using only what's known before a campaign launches — goal, category, country, currency, and the blurb text — means there's no funding-progress or backer-count signal to lean on. The blurb had to be turned into something the model could actually use, and the two failure modes (a doomed campaign predicted as a hit, and vice versa) don't cost the same, so accuracy alone was the wrong thing to optimize for.",
    description:
      'A 2-person team project (UE23CS352A – Machine Learning) predicting whether a Kickstarter campaign succeeds using only pre-launch data, on a Kaggle dataset of ~220,000 campaigns. Campaign blurbs are embedded with a MiniLM sentence transformer and combined with structured features (goal, category, country, currency); SMOTE handles the class imbalance. LightGBM, Random Forest, and Logistic Regression are trained individually and combined into a soft-voting ensemble, with LightGBM tuned via 10 Optuna trials under stratified 2-fold CV. On the held-out set, LightGBM alone was the strongest single model (0.708 accuracy, 0.774 ROC-AUC), while the ensemble traded a little of that for the best F1 (0.631) — the more balanced call across both classes.',
    techStack: ['LightGBM', 'MiniLM', 'Optuna', 'SMOTE', 'scikit-learn', 'Python'],
    github: 'https://github.com/giganiga6969/kickstarter-campaign-success-prediction',
    live: null,
    visualType: 'kickstarter',
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getProjectById(id: number): Project | undefined {
  return projects.find((p) => p.id === id)
}

export const orderedProjects = [...projects].sort((a, b) => a.order - b.order)
