import type { StackItem, TimelineEntry, NavLink } from '@/types'

export const stackItems: StackItem[] = [
  // AI / ML
  { name: 'PyTorch', category: 'AI / ML' },
  { name: 'Scikit-Learn', category: 'AI / ML' },
  { name: 'LightGBM', category: 'AI / ML' },
  { name: 'Pandas / NumPy', category: 'AI / ML' },
  { name: 'Fourier Neural Operators', category: 'AI / ML' },
  { name: 'LangGraph', category: 'AI / ML' },
  { name: 'Ollama', category: 'AI / ML' },
  // Backend
  { name: 'Python', category: 'Backend' },
  { name: 'Flask', category: 'Backend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'REST APIs', category: 'Backend' },
  { name: 'MySQL', category: 'Backend' },
  { name: 'MongoDB', category: 'Backend' },
  { name: 'SQLite', category: 'Backend' },
  // Systems
  { name: 'Apache Kafka', category: 'Systems' },
  { name: 'Docker', category: 'Systems' },
  { name: 'Linux', category: 'Systems' },
  { name: 'Distributed Systems', category: 'Systems' },
  { name: 'Cryptography', category: 'Systems' },
  // Tools
  { name: 'Git', category: 'Tools' },
  { name: 'VS Code', category: 'Tools' },
  { name: 'React', category: 'Tools' },
  { name: 'Next.js', category: 'Tools' },
  { name: 'TypeScript', category: 'Tools' },
  { name: 'AWS EC2', category: 'Tools' },
]

export const timelineEntries: TimelineEntry[] = [
  {
    period: 'Jun – Aug 2026',
    title: 'AFEM · Research Internship',
    domain: 'Digital Forensics',
    domainColor: '#FB923C',
    body: 'Research intern at PESU C-ISFCR. Built a five-phase forensic pipeline for autonomous email agents — tamper-evident SHA-256 evidence chains, deterministic timeline reconstruction, and behaviorally-correlated prompt-injection attribution. 268/268 regression tests passing.',
  },
  {
    period: 'Jan 2026 – Present',
    title: 'Treatment-Conditioned Brain MRI Prediction',
    domain: 'Healthcare AI',
    domainColor: '#4AE3B5',
    body: "4-person PES University capstone: a Treatment-Conditioned 3D U-Net + GAN predicting a patient's next brain MRI from their scan and medication history. Preprocessing on all 10,208 ADNI scans is done; model training is in progress.",
  },
  {
    period: '2025',
    title: 'Aero-FNO · Scientific ML',
    domain: 'Scientific Computing',
    domainColor: '#38BDF8',
    body: 'Trained a Fourier Neural Operator as a CFD surrogate, predicting pressure and velocity fields across 6,400 simulations at millisecond speed — about 3,000x faster than the RANS solver it replaces.',
  },
  {
    period: '2024 – 2025',
    title: 'Kickstarter Success Predictor',
    domain: 'Applied ML',
    domainColor: '#34D399',
    body: '2-person course project (UE23CS352A): MiniLM blurb embeddings + structured features, SMOTE for class imbalance, and an Optuna-tuned LightGBM/Random Forest/Logistic Regression ensemble. 0.708 accuracy and 0.774 ROC-AUC from LightGBM alone; the soft-voting ensemble gave the best F1 at 0.631.',
  },
  {
    period: '2024',
    title: 'Distributed Systems · Kafka',
    domain: 'Backend Engineering',
    domainColor: '#A78BFA',
    body: 'Real-time event-streaming platform on Apache Kafka — broker, producer, consumer, and admin services across four nodes, with dynamic topic provisioning and a Flask dashboard for live monitoring.',
  },
  {
    period: '2023 – 2024',
    title: 'B.Tech CS · PES University',
    domain: 'Foundation',
    domainColor: '#8B95A7',
    body: 'Started Bachelor of Technology in Computer Science at PES University, Bengaluru (2023–2027). Building across AI, distributed systems, cryptography, and scientific computing.',
  },
]

export const marqueeItems = [
  'PyTorch', 'Fourier Neural Operators', 'Apache Kafka', 'RSA · AES-256', 'LangGraph',
  'Medical Imaging', 'SQLite', 'Docker', 'Scientific ML', '3D U-Net',
  'Distributed Systems', 'SHA-256 Hash Chaining', 'Python', 'Digital Forensics', 'Deep Learning',
]

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
  { label: 'GitHub ↗', href: 'https://github.com/giganiga6969', external: true },
]

export const siteConfig = {
  name: 'Ayush Mittal',
  role: 'Computer Science Student',
  university: 'PES University, Bengaluru',
  email: 'ayushmittal1411@gmail.com',
  github: 'https://github.com/giganiga6969',
  linkedin: 'https://linkedin.com/in/ayush-mittal-1249b527a',
  resume: '/resume.pdf',
  tagline: 'Working on a technical problem?',
  taglineSub: "Let's talk.",
}
