"use client"

import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"
import { CheckCircle2, Database, LayoutDashboard, Server, Sparkles } from "lucide-react"

const buildSteps = [
  {
    number: "01",
    title: "Shape the Interface",
    detail: "Start with the layout, spacing, and user flow so every page feels easy to scan.",
    output: "Clean screens, responsive structure, readable UI",
    icon: LayoutDashboard,
    progress: 92,
    tags: ["layout", "motion", "responsive"],
    color: "#9b5f3d",
  },
  {
    number: "02",
    title: "Connect the API",
    detail: "Build the backend around real actions like auth, listing data, filtering, and updates.",
    output: "Go Fiber routes with clear REST behavior",
    icon: Server,
    progress: 78,
    tags: ["go", "fiber", "rest"],
    color: "#68795d",
  },
  {
    number: "03",
    title: "Model the Data",
    detail: "Plan the tables and relationships so the app can grow without becoming messy.",
    output: "Oracle-backed data with practical SQL thinking",
    icon: Database,
    progress: 68,
    tags: ["oracle", "sql", "schema"],
    color: "#8f6b45",
  },
  {
    number: "04",
    title: "Polish and Ship",
    detail: "Add animation, fix rough edges, check the build, then push a version people can open.",
    output: "Deployed portfolio updates with visual QA",
    icon: Sparkles,
    progress: 86,
    tags: ["qa", "deploy", "github"],
    color: "#a65f4a",
  },
]

export function BuildLogSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = section.querySelectorAll(".reveal")
    const meters = section.querySelectorAll(".build-log-meter-fill")
    const observers: IntersectionObserver[] = []

    cards.forEach((el, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add("visible"), i * 80)
            observer.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    meters.forEach((meter) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const width = (meter as HTMLElement).dataset.width || "0"
            ;(meter as HTMLElement).style.width = `${width}%`
            observer.disconnect()
          }
        },
        { threshold: 0.25 }
      )
      observer.observe(meter)
      observers.push(observer)
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  return (
    <section id="build-log" ref={sectionRef} className="section-shell px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-20">
          <p className="reveal section-kicker text-primary font-mono uppercase mb-4">
            05. Build Log
          </p>
          <h2 className="reveal section-title font-black mb-6 text-foreground">
            How I Turn Ideas Into Working Apps
          </h2>
          <p className="reveal section-subtitle text-muted-foreground">
            A practical build rhythm: design the flow, connect the system, test the details, and ship.
          </p>
        </div>

        <div className="build-log-grid">
          <div className="build-log-rail" aria-hidden="true" />
          {buildSteps.map((step, i) => (
            <article
              key={step.title}
              className="reveal build-log-card modern-card"
              style={
                {
                  "--reveal-delay": `${i * 85}ms`,
                  "--step-color": step.color,
                } as CSSProperties
              }
            >
              <div className="build-log-node" aria-hidden="true">
                <step.icon className="h-5 w-5" />
              </div>

              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <span className="build-log-number">{step.number}</span>
                  <h3 className="mt-3 text-2xl md:text-3xl font-black leading-tight text-foreground">
                    {step.title}
                  </h3>
                </div>
                <span className="build-log-badge">
                  {step.progress}% ready
                </span>
              </div>

              <p className="mb-5 text-base md:text-lg leading-relaxed text-muted-foreground">
                {step.detail}
              </p>

              <div className="mb-6 rounded-lg border border-border/60 bg-background/45 px-4 py-3">
                <div className="mb-2 flex items-center gap-2 text-sm font-black uppercase text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-[#68795d]" />
                  Output
                </div>
                <p className="text-base font-bold leading-relaxed text-foreground/80">
                  {step.output}
                </p>
              </div>

              <div className="mb-5">
                <div className="mb-2 flex items-center justify-between text-sm font-bold">
                  <span className="text-muted-foreground">Build signal</span>
                  <span className="text-foreground/70">{step.progress}%</span>
                </div>
                <div className="build-log-meter">
                  <div
                    className="build-log-meter-fill"
                    style={{ width: "0%" }}
                    data-width={step.progress}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {step.tags.map((tag) => (
                  <span key={tag} className="build-log-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
