import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { ProjectsSection } from "@/components/projects-section"
import { LearningSection } from "@/components/learning-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { AmbientEffects } from "@/components/ambient-effects"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <AmbientEffects />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ProjectsSection />
      <LearningSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
