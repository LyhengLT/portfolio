"use client"

import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"
import { Code2, DatabaseZap, Gauge, Rocket, Sparkles } from "lucide-react"

const focusItems = [
  {
    title: "Portfolio Motion",
    description: "Keeping the site expressive with scroll reveals, animated project signals, and richer visual rhythm.",
    icon: Sparkles,
    progress: 88,
    note: "Visual polish",
    color: "#9b5f3d",
  },
  {
    title: "Full-Stack Clones",
    description: "Turning real product patterns into Vue, Go Fiber, REST APIs, and database-backed workflows.",
    icon: Code2,
    progress: 76,
    note: "Product practice",
    color: "#68795d",
  },
  {
    title: "Database Thinking",
    description: "Improving schema planning, query structure, persistence, and data flow across projects.",
    icon: DatabaseZap,
    progress: 64,
    note: "Oracle + SQL",
    color: "#8f6b45",
  },
]

const roadmap = [
  "Add stronger project stories",
  "Polish mobile spacing",
  "Improve backend project docs",
  "Ship another clone update",
]

const floatingLabels = ["Vue", "Go Fiber", "Oracle", "REST", "Motion", "Deploy"]

export function NowSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const elements = section.querySelectorAll(".reveal")
    const meters = section.querySelectorAll(".now-meter-fill")
    const observers: IntersectionObserver[] = []

    elements.forEach((el, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add("visible"), i * 80)
            observer.disconnect()
          }
        },
        { threshold: 0.08 }
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
        { threshold: 0.2 }
      )
      observer.observe(meter)
      observers.push(observer)
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  return (
    <section id="now" ref={sectionRef} className="section-shell now-section px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-20">
          <p className="reveal section-kicker text-primary font-mono uppercase mb-4">
            04. Now
          </p>
          <h2 className="reveal section-title font-black mb-6 text-foreground">
            What I&apos;m Sharpening Right Now
          </h2>
          <p className="reveal section-subtitle text-muted-foreground">
            A live-feeling snapshot of the skills, details, and project habits I&apos;m improving next.
          </p>
        </div>

        <div className="now-grid">
          <div className="reveal now-orbit-card modern-card" style={{ "--reveal-delay": "0ms" } as CSSProperties}>
            <div className="now-orbit-stage" aria-hidden="true">
              <span className="now-orbit-ring now-orbit-ring-a" />
              <span className="now-orbit-ring now-orbit-ring-b" />
              {floatingLabels.map((label, index) => (
                <span
                  key={label}
                  className="now-floating-label"
                  style={
                    {
                      "--label-rotate": `${index * 60}deg`,
                      "--label-rotate-inverse": `${index * -60}deg`,
                      "--label-rotate-float": `${index * 60 + 18}deg`,
                      "--label-rotate-float-inverse": `${index * -60 - 18}deg`,
                      "--label-delay": `${index * -0.85}s`,
                    } as CSSProperties
                  }
                >
                  {label}
                </span>
              ))}
              <div className="now-core">
                <Rocket className="h-8 w-8" />
                <span>Next Push</span>
              </div>
            </div>
            <div>
              <span className="now-live-pill">
                <span />
                Live update mode
              </span>
              <h3 className="mt-5 text-3xl md:text-4xl font-black leading-tight text-foreground">
                Build, test, ship, repeat.
              </h3>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                I keep improving this portfolio like a real product: each update should make the work easier to read,
                more polished to explore, and more honest about what I can build.
              </p>
            </div>
          </div>

          <div className="now-focus-list">
            {focusItems.map((item, index) => (
              <article
                key={item.title}
                className="reveal now-focus-card modern-card"
                style={
                  {
                    "--focus-color": item.color,
                    "--reveal-delay": `${index * 90}ms`,
                  } as CSSProperties
                }
              >
                <div className="now-focus-icon">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl md:text-2xl font-black text-foreground">{item.title}</h3>
                    <span className="now-focus-note">{item.note}</span>
                  </div>
                  <p className="text-base leading-relaxed text-muted-foreground">{item.description}</p>
                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-sm font-bold">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Gauge className="h-4 w-4" />
                        Focus level
                      </span>
                      <span className="text-foreground/70">{item.progress}%</span>
                    </div>
                    <div className="now-meter">
                      <div className="now-meter-fill" style={{ width: "0%" }} data-width={item.progress} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="reveal now-roadmap modern-card" style={{ "--reveal-delay": "240ms" } as CSSProperties}>
          <div className="now-roadmap-header">
            <span className="section-kicker text-primary font-mono uppercase">Next Iterations</span>
            <span className="now-live-pill">
              <span />
              Moving
            </span>
          </div>
          <div className="now-roadmap-track">
            {roadmap.map((item, index) => (
              <div
                key={item}
                className="now-roadmap-step"
                style={{ "--roadmap-delay": `${index * 0.18}s` } as CSSProperties}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
