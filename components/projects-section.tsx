"use client"

import { useEffect, useRef } from "react"
import { ExternalLink, Github, Star, Lock } from "lucide-react"

const projects = [
  {
    title: "Nomads Go",
    tagline: "Full-stack Nomads.com clone",
    description:
      "Built with Vue.js and Go Fiber v3. Features user authentication, listing management, search & filter, and a responsive design backed by Oracle Database.",
    tech: ["Vue.js", "Go", "Fiber v3", "Oracle DB"],
    gradient: "from-cyan-500 to-blue-600",
    featured: true,
    number: "01",
    githubUrl: "https://github.com/LyhengLT/nomads-clone",
    demoUrl: "lyhenglt.github.io/nomads-clone/",
  },
  {
    title: "WIP Clone",
    tagline: "Pixel-perfect HTML/CSS/JS",
    description:
      "A meticulous WIP.co clone in vanilla HTML, CSS, and JS. Demonstrates mastery of core web fundamentals without reaching for a framework.",
    tech: ["HTML", "CSS", "JavaScript"],
    gradient: "from-pink-500 to-rose-600",
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
    gradient: "from-emerald-500 to-teal-600",
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
    gradient: "from-violet-500 to-purple-600",
    featured: false,
    number: "04",
    githubUrl: "https://github.com/LyhengLT/remoteok-clone",
    demoUrl: null,
  },
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)

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
    <section id="projects" ref={sectionRef} className="py-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="reveal text-primary font-mono text-xs tracking-widest uppercase mb-3">
            03. Work
          </p>
          <h2 className="reveal text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Projects
          </h2>
          <p className="reveal text-muted-foreground">
            Real-world clones built from scratch — no tutorials, just code
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.title} className="reveal group">
              <div className="bg-card border border-border rounded-2xl p-7 h-full transition-all duration-300 hover:border-border/80 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1">
                {/* Top row */}
                <div className="flex items-start justify-between mb-6">
                  <span className={`text-4xl font-black bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent opacity-40 group-hover:opacity-70 transition-opacity`}>
                    {project.number}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.featured && (
                      <span className="flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-medium">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & tagline */}
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {project.title}
                </h3>
                <p className={`text-sm font-medium bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent mb-4`}>
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-secondary text-secondary-foreground border border-border/50"
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
                      className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground/40 cursor-not-allowed select-none">
                      <Lock className="w-3.5 h-3.5" />
                      Private
                    </span>
                  )}

                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground/40 cursor-not-allowed select-none">
                      <ExternalLink className="w-3.5 h-3.5" />
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
