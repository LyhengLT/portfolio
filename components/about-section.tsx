"use client"

import { useEffect, useRef } from "react"
import { Code2, Rocket, Heart, Coffee } from "lucide-react"

const traits = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Readable, maintainable code — not just code that works.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    icon: Rocket,
    title: "Ship Fast",
    description: "I build iteratively, shipping real projects that solve real problems.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    icon: Heart,
    title: "Passionate",
    description: "Web development isn't a job to me — it's something I genuinely love.",
    color: "text-rose-400",
    bg: "bg-rose-400/10",
  },
  {
    icon: Coffee,
    title: "Always Learning",
    description: "Every day is a chance to level up with new tools and patterns.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const elements = section.querySelectorAll(".reveal, .reveal-left, .reveal-right")
    const observers: IntersectionObserver[] = []
    elements.forEach((el, i) => {
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
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="reveal text-primary font-mono text-xs tracking-widest uppercase mb-3">
            01. About
          </p>
          <h2 className="reveal text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Who I Am
          </h2>
          <p className="reveal text-muted-foreground">
            A CS student turned builder — turning ideas into working software.
          </p>
        </div>

        {/* Bio + Avatar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="reveal-left space-y-4">
            <p className="text-foreground/80 leading-relaxed">
              I&apos;m <span className="text-primary font-semibold">Lyheng</span>, a developer
              studying at <span className="text-accent font-semibold">BELTEI International University</span>{" "}
              in Phnom Penh, Cambodia.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              My approach: learn by building real things. Instead of toy projects, I clone
              production websites — Nomads.com, WIP.co, BongThom, RemoteOK — and implement
              real features like auth, listing management, and REST APIs from scratch.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              I work with <span className="text-emerald-400 font-medium">Vue.js</span> for
              frontend, <span className="text-cyan-400 font-medium">Go (Fiber v3)</span> for
              backend, and <span className="text-orange-400 font-medium">Oracle Database</span> for
              persistence.
            </p>
            <blockquote className="border-l-2 border-primary/40 pl-4 mt-4">
              <p className="text-muted-foreground text-sm italic">
                &ldquo;The best way to learn is to build something real.&rdquo;
              </p>
            </blockquote>
          </div>

          {/* Avatar */}
          <div className="reveal-right flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-3 rounded-full border border-dashed border-primary/15 animate-spin-slow" />
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-accent p-0.5">
                <div className="w-full h-full rounded-full bg-card flex flex-col items-center justify-center gap-1">
                  <span className="text-5xl font-black bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                    LH
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">Developer</span>
                </div>
              </div>
              <div className="absolute -top-1 -right-3 bg-card border border-border rounded-lg px-2.5 py-1 text-xs font-mono text-emerald-400 shadow-lg">
                Vue.js
              </div>
              <div className="absolute -bottom-1 -left-3 bg-card border border-border rounded-lg px-2.5 py-1 text-xs font-mono text-cyan-400 shadow-lg">
                Go Fiber
              </div>
            </div>
          </div>
        </div>

        {/* Trait cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {traits.map((trait, i) => (
            <div
              key={trait.title}
              className="reveal bg-card border border-border rounded-xl p-5 hover:border-border/80 transition-all duration-200 hover:-translate-y-0.5"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className={`w-9 h-9 rounded-lg ${trait.bg} flex items-center justify-center mb-3`}>
                <trait.icon className={`w-4 h-4 ${trait.color}`} />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{trait.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{trait.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
