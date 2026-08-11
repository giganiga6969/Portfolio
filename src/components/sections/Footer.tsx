import { siteConfig } from '@/data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.04]">
      <div className="max-content section-x py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-tx-4">AM</span>
            <span className="font-mono text-[10px] text-tx-4">
              © {year} Ayush Mittal
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-tx-4 hover:text-tx-2 transition-colors tracking-wider"
            >
              GitHub ↗
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-tx-4 hover:text-tx-2 transition-colors tracking-wider"
            >
              LinkedIn ↗
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-mono text-[10px] text-tx-4 hover:text-tx-2 transition-colors tracking-wider"
            >
              Email
            </a>
            <a
              href={siteConfig.resume}
              download
              className="font-mono text-[10px] text-tx-4 hover:text-tx-2 transition-colors tracking-wider"
            >
              Resume ↓
            </a>
          </div>
        </div>

        <p className="font-mono text-[9px] text-tx-4 mt-4 opacity-40">
          PES University · B.Tech Computer Science · 2023–2027
        </p>
      </div>
    </footer>
  )
}
