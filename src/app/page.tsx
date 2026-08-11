import Navbar from '@/components/ui/Navbar'
import CustomCursor from '@/components/ui/CustomCursor'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import ProjectShowcase from '@/components/sections/ProjectShowcase'
import Timeline from '@/components/sections/Timeline'
import TechStack from '@/components/sections/TechStack'
import GithubShowcase from '@/components/sections/GithubShowcase'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* Fixed navbar */}
      <Navbar />

      <main>
        {/* S1: Hero — typographic-first, particle field, domain topology */}
        <Hero />


        {/* S2: About — who, what, why, 3 stats */}
        <About />

        {/* S3: Experience — AFEM research internship, five-phase case study */}
        <Experience />

        {/* S4: Projects — THE centrepiece. Sticky left + scrolling right. */}
        {/* hardProblem dominates each card. 80% of attention lives here. */}
        <ProjectShowcase />

        {/* S5: Timeline — Research & Build progression */}
        <Timeline />

        {/* S6: Stack — categorized grid, fast, accessible */}
        <TechStack />

        {/* S7: GitHub — repo cards + contribution chart */}
        <GithubShowcase />

        {/* S8: Contact — specific CTA, email copy, conversion */}
        <Contact />
      </main>

      <Footer />
    </>
  )
}
