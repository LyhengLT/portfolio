"use client"

import { useEffect, useState } from "react"
import { Mail, Github, ChevronDown, MapPin, GraduationCap } from "lucide-react"

const roles = [
  "Full-Stack Developer",
  "Go + Vue Builder",
  "Problem Solver",
  "CS Student",
]

const stats = [
  { value: "4+", label: "Projects" },
  { value: "2+", label: "Languages" },
  { value: "1+", label: "Years Coding" },
]

function useTypewriter(words: string[], speed = 80, pause = 2200) {
  const [displayed, setDisplayed] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed)
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2)
    } else {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
    }

    setDisplayed(current.slice(0, charIndex))
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, wordIndex, words, speed, pause])

  return displayed
}

export function HeroSection() {
  const typedText = useTypewriter(roles)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6 lg:px-12 grid-bg">
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl">
        {/* Status badge */}
        <div className="opacity-0 animate-slide-up mb-8 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs font-mono">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
          </span>
          Open to opportunities
        </div>

        {/* Greeting */}
        <p className="opacity-0 animate-slide-up animation-delay-100 text-muted-foreground text-base font-mono mb-2">
          Hello, I&apos;m
        </p>

        {/* Name */}
        <h1 className="opacity-0 animate-slide-up animation-delay-200 text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary via-cyan-400 to-accent bg-clip-text text-transparent animate-gradient-x">
            Lyheng
          </span>
        </h1>

        {/* Typewriter */}
        <div className="opacity-0 animate-slide-up animation-delay-300 h-9 flex items-center mb-6">
          <h2 className="text-xl md:text-2xl font-medium text-foreground/70">
            {mounted ? typedText : roles[0]}
            <span className="cursor-blink ml-0.5" />
          </h2>
        </div>

        {/* Meta */}
        <div className="opacity-0 animate-slide-up animation-delay-400 flex flex-wrap gap-4 text-sm text-muted-foreground mb-5">
          <span className="flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-primary/70" />
            BELTEI International University
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-accent/70" />
            Phnom Penh, Cambodia
          </span>
        </div>

        {/* Bio */}
        <p className="opacity-0 animate-slide-up animation-delay-400 text-muted-foreground max-w-xl leading-relaxed mb-8">
          Building real-world web apps with{" "}
          <span className="text-emerald-400 font-medium">Vue.js</span> on the front
          and <span className="text-cyan-400 font-medium">Go (Fiber)</span> on the back.
        </p>

        {/* CTA */}
        <div className="opacity-0 animate-slide-up animation-delay-600 flex flex-wrap gap-3 mb-12">
          <a
            href="mailto:laylyheng88@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
          >
            <Mail className="w-4 h-4" />
            Get in Touch
          </a>
          <a
            href="https://github.com/LyhengLT"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-border bg-card/60 text-foreground rounded-lg text-sm font-semibold transition-all duration-200 hover:border-border/80 hover:bg-card hover:scale-[1.02]"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>

        {/* Stats */}
        <div className="opacity-0 animate-slide-up animation-delay-800 flex gap-8">
          {stats.map((stat, i) => (
            <div key={stat.label} className={i > 0 ? "pl-8 border-l border-border" : ""}>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  )
}
