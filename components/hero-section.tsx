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
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6 lg:px-12 pt-24 pb-14 grid-bg">
      {/* Layered background texture */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-6 right-6 top-24 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-pulse-glow" />
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/25 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-accent/25 to-transparent" />
        <div className="absolute bottom-20 left-6 right-6 h-px bg-gradient-to-r from-primary/0 via-accent/20 to-primary/0" />
      </div>

      <div className="relative z-10 max-w-6xl">
        {/* Status badge */}
        <div className="opacity-0 animate-slide-up mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/25 bg-primary/8 text-primary text-sm font-mono">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
          </span>
          Open to opportunities
        </div>

        {/* Greeting */}
        <p className="opacity-0 animate-slide-up animation-delay-100 text-muted-foreground text-xl md:text-2xl font-mono mb-3">
          Hello, I&apos;m
        </p>

        {/* Name */}
        <h1 className="opacity-0 animate-slide-up animation-delay-200 text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11.5rem] font-black leading-[0.82] mb-8">
          <span className="bg-gradient-to-r from-primary via-cyan-400 to-accent bg-clip-text text-transparent animate-gradient-x">
            Lyheng
          </span>
        </h1>

        {/* Typewriter */}
        <div className="opacity-0 animate-slide-up animation-delay-300 min-h-12 flex items-center mb-7">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground/80 leading-tight">
            {mounted ? typedText : roles[0]}
            <span className="cursor-blink ml-0.5" />
          </h2>
        </div>

        {/* Meta */}
        <div className="opacity-0 animate-slide-up animation-delay-400 flex flex-wrap gap-5 text-base md:text-lg text-muted-foreground mb-6">
          <span className="flex items-center gap-1.5">
            <GraduationCap className="w-5 h-5 text-primary/70" />
            BELTEI International University
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-5 h-5 text-accent/70" />
            Phnom Penh, Cambodia
          </span>
        </div>

        {/* Bio */}
        <p className="opacity-0 animate-slide-up animation-delay-400 text-muted-foreground max-w-3xl text-xl md:text-2xl leading-relaxed mb-10">
          Building real-world web apps with{" "}
          <span className="text-emerald-400 font-medium">Vue.js</span> on the front
          and <span className="text-cyan-400 font-medium">Go (Fiber)</span> on the back.
        </p>

        {/* CTA */}
        <div className="opacity-0 animate-slide-up animation-delay-600 flex flex-wrap gap-3 mb-12">
          <a
            href="mailto:laylyheng88@gmail.com"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-lg text-base md:text-lg font-bold transition-all duration-300 hover:opacity-90 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/20"
          >
            <Mail className="w-5 h-5" />
            Get in Touch
          </a>
          <a
            href="https://github.com/LyhengLT"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-border bg-card/60 text-foreground rounded-lg text-base md:text-lg font-bold transition-all duration-300 hover:border-primary/50 hover:bg-card hover:scale-[1.03]"
          >
            <Github className="w-5 h-5" />
            GitHub
          </a>
        </div>

        {/* Stats */}
        <div className="opacity-0 animate-slide-up animation-delay-800 flex flex-wrap gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div key={stat.label} className={i > 0 ? "pl-8 md:pl-12 border-l border-border" : ""}>
              <div className="text-4xl md:text-5xl font-black text-foreground leading-none">{stat.value}</div>
              <div className="text-sm md:text-base text-muted-foreground mt-2">{stat.label}</div>
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
        <ChevronDown className="w-7 h-7 animate-bounce" />
      </button>
    </section>
  )
}
