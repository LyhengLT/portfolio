"use client"

import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"
import { Code2, Rocket, Heart, Coffee, Target, GitBranch, Layers3, Gauge } from "lucide-react"

const traits = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Readable, maintainable code — not just code that works.",
    color: "text-[#8f6b45]",
    bg: "bg-[#8f6b45]/10",
  },
  {
    icon: Rocket,
    title: "Ship Fast",
    description: "I build iteratively, shipping real projects that solve real problems.",
    color: "text-[#68795d]",
    bg: "bg-[#68795d]/10",
  },
  {
    icon: Heart,
    title: "Passionate",
    description: "Web development isn't a job to me — it's something I genuinely love.",
    color: "text-[#a65f4a]",
    bg: "bg-[#a65f4a]/10",
  },
  {
    icon: Coffee,
    title: "Always Learning",
    description: "Every day is a chance to level up with new tools and patterns.",
    color: "text-[#b4833f]",
    bg: "bg-[#b4833f]/10",
  },
]

const buildApproach = [
  {
    icon: Target,
    title: "Product Thinking",
    detail: "I start with the user flow, then shape the screens, data, and API around that flow.",
  },
  {
    icon: GitBranch,
    title: "Step-by-Step Delivery",
    detail: "I break big ideas into small working milestones so every update has something real to test.",
  },
  {
    icon: Layers3,
    title: "Frontend + Backend",
    detail: "I like building both sides because it helps me understand how the interface and data should meet.",
  },
  {
    icon: Gauge,
    title: "Readable Experiences",
    detail: "I care about clear typography, smooth motion, responsive layouts, and code that stays easy to improve.",
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
    <section id="about" ref={sectionRef} className="section-shell px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <p className="reveal section-kicker text-primary font-mono uppercase mb-4">
            01. About
          </p>
          <h2 className="reveal section-title font-black mb-6 text-foreground">
            Who I Am
          </h2>
          <p className="reveal section-subtitle text-muted-foreground">
            A CS student turned builder — turning ideas into working software.
          </p>
        </div>

        {/* Bio + Avatar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-16 items-center mb-20">
          <div className="reveal-left space-y-6 text-lg md:text-xl">
            <p className="text-foreground/85 leading-relaxed">
              I&apos;m <span className="text-primary font-semibold">Lyheng</span>, a developer
              studying at <span className="text-accent font-semibold">BELTEI International University</span>{" "}
              in Phnom Penh, Cambodia.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My approach: learn by building real things. Instead of toy projects, I clone
              production websites — Nomads.com, WIP.co, BongThom, RemoteOK — and implement
              real features like auth, listing management, and REST APIs from scratch.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I work with <span className="text-[#68795d] font-semibold">Vue.js</span> for
              frontend, <span className="text-[#9b5f3d] font-semibold">Go (Fiber v3)</span> for
              backend, and <span className="text-[#8f6b45] font-semibold">Oracle Database</span> for
              persistence.
            </p>
            <blockquote className="border-l-4 border-primary/40 pl-5 mt-5">
              <p className="text-muted-foreground italic">
                &ldquo;The best way to learn is to build something real.&rdquo;
              </p>
            </blockquote>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="stat-spark-card rounded-lg border border-border/60 bg-card/70 px-4 py-3">
                <p className="text-3xl font-black text-primary">4</p>
                <p className="text-sm font-bold text-muted-foreground">project clones</p>
              </div>
              <div className="stat-spark-card rounded-lg border border-border/60 bg-card/70 px-4 py-3">
                <p className="text-3xl font-black text-[#68795d]">3</p>
                <p className="text-sm font-bold text-muted-foreground">main stack layers</p>
              </div>
            </div>
          </div>

          {/* Avatar */}
          <div className="reveal-right flex justify-center lg:justify-end">
            <div className="avatar-orbit-stage relative">
              <div className="absolute -inset-5 rounded-full border border-dashed border-primary/20 animate-spin-slow" />
              <span className="avatar-orbit-dot avatar-orbit-dot-a" aria-hidden="true" />
              <span className="avatar-orbit-dot avatar-orbit-dot-b" aria-hidden="true" />
              <span className="avatar-orbit-dot avatar-orbit-dot-c" aria-hidden="true" />
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary via-[#caa26a] to-accent p-0.5 shadow-2xl shadow-primary/15">
                <div className="w-full h-full rounded-full bg-card flex flex-col items-center justify-center gap-1">
                  <span className="text-7xl md:text-8xl font-black bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                    LH
                  </span>
                  <span className="text-sm md:text-base text-muted-foreground font-mono">Developer</span>
                </div>
              </div>
              <div className="avatar-chip avatar-chip-a absolute top-6 -right-5 bg-card border border-border rounded-lg px-3.5 py-2 text-sm font-mono text-[#68795d] shadow-lg transition-transform duration-300 hover:-translate-y-1">
                Vue.js
              </div>
              <div className="avatar-chip avatar-chip-b absolute bottom-8 -left-5 bg-card border border-border rounded-lg px-3.5 py-2 text-sm font-mono text-[#9b5f3d] shadow-lg transition-transform duration-300 hover:-translate-y-1">
                Go Fiber
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="reveal mb-8">
            <p className="section-kicker text-primary font-mono uppercase mb-3">
              How I Build
            </p>
            <h3 className="text-4xl md:text-6xl font-black leading-none text-foreground">
              Details matter from idea to deploy.
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {buildApproach.map((item, i) => (
              <div
                key={item.title}
                className="reveal motion-card modern-card border border-border rounded-xl bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-black/15"
                style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <h4 className="mb-2 text-2xl font-black text-foreground">{item.title}</h4>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trait cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {traits.map((trait, i) => (
            <div
              key={trait.title}
              className="reveal trait-motion-card modern-card bg-card border border-border rounded-xl p-6 md:p-7 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/20"
              style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
            >
              <div className={`w-12 h-12 rounded-lg ${trait.bg} flex items-center justify-center mb-4`}>
                <trait.icon className={`w-5 h-5 ${trait.color}`} />
              </div>
              <h3 className="font-bold text-foreground text-xl mb-2">{trait.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed">{trait.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
