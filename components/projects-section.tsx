"use client"

import { useEffect, useRef } from "react"
import type { CSSProperties, MouseEvent } from "react"
import { ExternalLink, Github, Star, Lock } from "lucide-react"

const projects = [
  {
    title: "Nomads Go",
    tagline: "Full-stack Nomads.com clone",
    description:
      "Built with Vue.js and Go Fiber v3. Features user authentication, listing management, search & filter, and a responsive design backed by Oracle Database.",
    tech: ["Vue.js", "Go", "Fiber v3", "Oracle DB"],
    gradient: "from-[#9b5f3d] to-[#caa26a]",
    previewColor: "#9b5f3d",
    featured: true,
    number: "01",
    githubUrl: "https://github.com/LyhengLT/nomads-clone",
    demoUrl: "https://lyhenglt.github.io/nomads-clone/",
  },
  {
    title: "WIP Clone",
    tagline: "Pixel-perfect HTML/CSS/JS",
    description:
      "A meticulous WIP.co clone in vanilla HTML, CSS, and JS. Demonstrates mastery of core web fundamentals without reaching for a framework.",
    tech: ["HTML", "CSS", "JavaScript"],
    gradient: "from-[#a65f4a] to-[#d6a071]",
    previewColor: "#a65f4a",
    featured: false,
    number: "02",
    githubUrl: null,
    demoUrl: null,
  },
  {
    title: "BongThom Clone",
    tagline: "Full-stack Vue + Go Fiber",
    description:
      "Cambodian jobs & classifieds site clone with a modular REST API architecture built in Go Fiber v3 and a Vue.js frontend.",
    tech: ["Vue.js", "Go", "Fiber v3", "REST API"],
    gradient: "from-[#68795d] to-[#a4a86f]",
    previewColor: "#68795d",
    featured: false,
    number: "03",
    githubUrl: "https://github.com/LyhengLT/bongthom-clone",
    demoUrl: null,
  },
  {
    title: "RemoteOK Clone",
    tagline: "Modular vanilla JS",
    description:
      "Remote jobs board built with clean, modular vanilla JS — separation of concerns, reusable components, and REST API integration from scratch.",
    tech: ["JavaScript", "HTML", "CSS", "REST API"],
    gradient: "from-[#374151] to-[#8f6b45]",
    previewColor: "#374151",
    featured: false,
    number: "04",
    githubUrl: "https://github.com/LyhengLT/remoteok-clone",
    demoUrl: null,
  },
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const handleTiltMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const rotateY = ((x / rect.width) - 0.5) * 9
    const rotateX = ((y / rect.height) - 0.5) * -9

    card.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`)
    card.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`)
    card.style.setProperty("--mx", `${((x / rect.width) * 100).toFixed(2)}%`)
    card.style.setProperty("--my", `${((y / rect.height) * 100).toFixed(2)}%`)
  }

  const resetTilt = (event: MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget
    card.style.setProperty("--rx", "0deg")
    card.style.setProperty("--ry", "0deg")
    card.style.setProperty("--mx", "50%")
    card.style.setProperty("--my", "50%")
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const cards = section.querySelectorAll(".reveal")
    const observers: IntersectionObserver[] = []
    cards.forEach((el, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add("visible"), i * 100)
            observer.disconnect()
          }
        },
        { threshold: 0.08 }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="section-shell px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <p className="reveal section-kicker text-primary font-mono uppercase mb-4">
            03. Work
          </p>
          <h2 className="reveal section-title font-black mb-6 text-foreground">
            Projects
          </h2>
          <p className="reveal section-subtitle text-muted-foreground">
            Real-world clones built from scratch — no tutorials, just code
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="reveal group"
              style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
            >
              <div
                className="modern-card tilt-card bg-card border border-border rounded-2xl p-5 md:p-6 h-full transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-black/20"
                onMouseMove={handleTiltMove}
                onMouseLeave={resetTilt}
              >
                <div
                  className="project-preview mb-7"
                  style={{ color: project.previewColor } as CSSProperties}
                  aria-hidden="true"
                >
                  <div className="project-preview-bar">
                    <span className="project-preview-dot" />
                    <span className="project-preview-dot opacity-70" />
                    <span className="project-preview-dot opacity-40" />
                  </div>
                  <span className="project-preview-label">{project.tagline}</span>
                  <span className="project-preview-shape" />
                </div>

                {/* Top row */}
                <div className="flex items-start justify-between mb-6">
                  <span className={`text-6xl md:text-7xl font-black bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent opacity-40 group-hover:opacity-80 transition-opacity leading-none`}>
                    {project.number}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.featured && (
                      <span className="flex items-center gap-1 px-3 py-1.5 bg-[#b4833f]/10 border border-[#b4833f]/20 rounded-full text-[#8f6b45] text-sm font-semibold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & tagline */}
                <h3 className="text-3xl md:text-4xl font-black text-foreground mb-2 leading-tight">
                  {project.title}
                </h3>
                <p className={`text-lg md:text-xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent mb-5`}>
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm font-semibold rounded-md bg-secondary text-secondary-foreground border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action links */}
                <div className="flex items-center gap-4 pt-5 border-t border-border/40">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-base font-semibold text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      Source Code
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-base text-muted-foreground/40 cursor-not-allowed select-none">
                      <Lock className="w-4 h-4" />
                      Private
                    </span>
                  )}

                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-base font-semibold text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Live Demo
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-base text-muted-foreground/40 cursor-not-allowed select-none">
                      <ExternalLink className="w-4 h-4" />
                      No Demo
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
