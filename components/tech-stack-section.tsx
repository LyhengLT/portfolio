"use client"

import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"
import { Code2, Database, Server, Wrench } from "lucide-react"

const techStack = [
  {
    category: "Frontend",
    gradient: "from-[#68795d] to-[#9ca874]",
    color: "text-[#68795d]",
    bg: "bg-[#68795d]/10",
    icon: Code2,
    techs: [
      { name: "Vue.js", level: 80 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "JavaScript", level: 75 },
    ],
  },
  {
    category: "Backend",
    gradient: "from-[#9b5f3d] to-[#c18455]",
    color: "text-[#9b5f3d]",
    bg: "bg-[#9b5f3d]/10",
    icon: Server,
    techs: [
      { name: "Go (Fiber v3)", level: 70 },
      { name: "REST APIs", level: 75 },
    ],
  },
  {
    category: "Database",
    gradient: "from-[#8f6b45] to-[#caa26a]",
    color: "text-[#8f6b45]",
    bg: "bg-[#8f6b45]/10",
    icon: Database,
    techs: [
      { name: "Oracle Database", level: 65 },
      { name: "SQL", level: 70 },
    ],
  },
  {
    category: "Tools",
    gradient: "from-[#374151] to-[#68795d]",
    color: "text-[#374151]",
    bg: "bg-[#374151]/10",
    icon: Wrench,
    techs: [
      { name: "Git", level: 80 },
      { name: "VS Code", level: 90 },
      { name: "macOS / Terminal", level: 85 },
    ],
  },
]

export function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const cards = section.querySelectorAll(".reveal")
    const bars = section.querySelectorAll(".skill-bar")
    const observers: IntersectionObserver[] = []

    cards.forEach((el, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add("visible"), i * 100)
            observer.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    bars.forEach((bar) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const width = (bar as HTMLElement).dataset.width || "0"
            setTimeout(() => { (bar as HTMLElement).style.width = width + "%" }, 200)
            observer.disconnect()
          }
        },
        { threshold: 0.3 }
      )
      observer.observe(bar)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section id="tech-stack" ref={sectionRef} className="section-shell px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-20">
          <p className="reveal section-kicker text-primary font-mono uppercase mb-4">
            02. Skills
          </p>
          <h2 className="reveal section-title font-black mb-6 text-foreground">
            Tech Stack
          </h2>
          <p className="reveal section-subtitle text-muted-foreground">
            Technologies I use to build real applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {techStack.map((stack, i) => (
            <div
              key={stack.category}
              className="reveal modern-card bg-card border border-border rounded-xl p-7 md:p-8 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/20"
              style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-7">
                <div className={`w-14 h-14 rounded-lg ${stack.bg} flex items-center justify-center`}>
                  <stack.icon className={`w-6 h-6 ${stack.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-2xl">{stack.category}</h3>
                  <p className="text-sm text-muted-foreground">{stack.techs.length} technologies</p>
                </div>
              </div>

              {/* Skill bars */}
              <div className="space-y-5">
                {stack.techs.map((tech) => (
                  <div key={tech.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-base md:text-lg text-foreground/80 font-medium">{tech.name}</span>
                      <span className={`text-sm font-bold ${stack.color}`}>{tech.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`skill-bar h-full bg-gradient-to-r ${stack.gradient} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: "0%" }}
                        data-width={tech.level}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
