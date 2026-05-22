"use client"

import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"
import { BookOpen, Code, Database, Zap } from "lucide-react"

const learning = [
  {
    title: "Go Programming",
    description: "Concurrency, interfaces, and high-performance backend APIs with Fiber.",
    icon: Code,
    progress: 75,
    gradient: "from-[#9b5f3d] to-[#c18455]",
    color: "text-[#9b5f3d]",
    bg: "bg-[#9b5f3d]/10",
    status: "Active",
  },
  {
    title: "Database Design",
    description: "Normalization, query optimization, indexing, and advanced SQL patterns.",
    icon: Database,
    progress: 60,
    gradient: "from-[#8f6b45] to-[#caa26a]",
    color: "text-[#8f6b45]",
    bg: "bg-[#8f6b45]/10",
    status: "Active",
  },
  {
    title: "Web Development",
    description: "Component architecture, state management, and performance patterns.",
    icon: BookOpen,
    progress: 80,
    gradient: "from-[#a65f4a] to-[#d6a071]",
    color: "text-[#a65f4a]",
    bg: "bg-[#a65f4a]/10",
    status: "Ongoing",
  },
  {
    title: "System Design",
    description: "Architecting scalable systems, APIs, and distributed services.",
    icon: Zap,
    progress: 30,
    gradient: "from-[#68795d] to-[#a4a86f]",
    color: "text-[#68795d]",
    bg: "bg-[#68795d]/10",
    status: "Starting",
  },
]

const statusStyle: Record<string, string> = {
  Active:   "text-[#68795d] bg-[#68795d]/10 border-[#68795d]/20",
  Ongoing:  "text-[#9b5f3d] bg-[#9b5f3d]/10 border-[#9b5f3d]/20",
  Starting: "text-[#8f6b45] bg-[#8f6b45]/10 border-[#8f6b45]/20",
}

export function LearningSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const cards = section.querySelectorAll(".reveal")
    const bars = section.querySelectorAll(".progress-bar")
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
            setTimeout(() => { (bar as HTMLElement).style.width = width + "%" }, 300)
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
    <section id="learning" ref={sectionRef} className="section-shell px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-20">
          <p className="reveal section-kicker text-primary font-mono uppercase mb-4">
            04. Growth
          </p>
          <h2 className="reveal section-title font-black mb-6 text-foreground">
            Currently Learning
          </h2>
          <p className="reveal section-subtitle text-muted-foreground">
            Always expanding — knowledge compounds over time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {learning.map((item, i) => (
            <div
              key={item.title}
              className="reveal modern-card bg-card border border-border rounded-xl p-7 md:p-8 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/20"
              style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-lg ${item.bg} flex items-center justify-center`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h3 className="font-bold text-foreground text-2xl">{item.title}</h3>
                </div>
                <span className={`text-sm font-semibold px-3 py-1.5 rounded-full border ${statusStyle[item.status]}`}>
                  {item.status}
                </span>
              </div>

              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                {item.description}
              </p>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className={`text-sm font-bold ${item.color}`}>{item.progress}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`progress-bar h-full bg-gradient-to-r ${item.gradient} rounded-full transition-all duration-[1200ms] ease-out`}
                    style={{ width: "0%" }}
                    data-width={item.progress}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
