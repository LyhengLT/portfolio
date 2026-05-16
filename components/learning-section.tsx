"use client"

import { useEffect, useRef } from "react"
import { BookOpen, Code, Database, Zap } from "lucide-react"

const learning = [
  {
    title: "Go Programming",
    description: "Concurrency, interfaces, and high-performance backend APIs with Fiber.",
    icon: Code,
    progress: 75,
    gradient: "from-cyan-500 to-blue-600",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    status: "Active",
  },
  {
    title: "Database Design",
    description: "Normalization, query optimization, indexing, and advanced SQL patterns.",
    icon: Database,
    progress: 60,
    gradient: "from-orange-500 to-red-500",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    status: "Active",
  },
  {
    title: "Web Development",
    description: "Component architecture, state management, and performance patterns.",
    icon: BookOpen,
    progress: 80,
    gradient: "from-purple-500 to-pink-500",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    status: "Ongoing",
  },
  {
    title: "System Design",
    description: "Architecting scalable systems, APIs, and distributed services.",
    icon: Zap,
    progress: 30,
    gradient: "from-emerald-500 to-teal-500",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    status: "Starting",
  },
]

const statusStyle: Record<string, string> = {
  Active:   "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Ongoing:  "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  Starting: "text-amber-400 bg-amber-400/10 border-amber-400/20",
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
    <section id="learning" ref={sectionRef} className="py-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="reveal text-primary font-mono text-xs tracking-widest uppercase mb-3">
            04. Growth
          </p>
          <h2 className="reveal text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Currently Learning
          </h2>
          <p className="reveal text-muted-foreground">
            Always expanding — knowledge compounds over time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {learning.map((item) => (
            <div
              key={item.title}
              className="reveal bg-card border border-border rounded-xl p-6 hover:border-border/80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center`}>
                    <item.icon className={`w-4.5 h-4.5 ${item.color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusStyle[item.status]}`}>
                  {item.status}
                </span>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                {item.description}
              </p>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-muted-foreground">Progress</span>
                  <span className={`text-xs font-semibold ${item.color}`}>{item.progress}%</span>
                </div>
                <div className="h-1 bg-secondary rounded-full overflow-hidden">
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
