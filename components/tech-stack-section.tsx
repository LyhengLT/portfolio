"use client"

import { useEffect, useRef } from "react"

const techStack = [
  {
    category: "Frontend",
    gradient: "from-emerald-500 to-teal-500",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    icon: "⚡",
    techs: [
      { name: "Vue.js", level: 80 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "JavaScript", level: 75 },
    ],
  },
  {
    category: "Backend",
    gradient: "from-cyan-500 to-blue-600",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    icon: "⚙️",
    techs: [
      { name: "Go (Fiber v3)", level: 70 },
      { name: "REST APIs", level: 75 },
    ],
  },
  {
    category: "Database",
    gradient: "from-orange-500 to-red-500",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    icon: "🗄️",
    techs: [
      { name: "Oracle Database", level: 65 },
      { name: "SQL", level: 70 },
    ],
  },
  {
    category: "Tools",
    gradient: "from-purple-500 to-violet-600",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    icon: "🛠️",
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
    <section id="tech-stack" ref={sectionRef} className="py-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="reveal text-primary font-mono text-xs tracking-widest uppercase mb-3">
            02. Skills
          </p>
          <h2 className="reveal text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Tech Stack
          </h2>
          <p className="reveal text-muted-foreground">
            Technologies I use to build real applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {techStack.map((stack) => (
            <div
              key={stack.category}
              className="reveal bg-card border border-border rounded-xl p-6 hover:border-border/80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-lg ${stack.bg} flex items-center justify-center text-lg`}>
                  {stack.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{stack.category}</h3>
                  <p className="text-xs text-muted-foreground">{stack.techs.length} technologies</p>
                </div>
              </div>

              {/* Skill bars */}
              <div className="space-y-3.5">
                {stack.techs.map((tech) => (
                  <div key={tech.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm text-foreground/70">{tech.name}</span>
                      <span className={`text-xs font-semibold ${stack.color}`}>{tech.level}%</span>
                    </div>
                    <div className="h-1 bg-secondary rounded-full overflow-hidden">
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
