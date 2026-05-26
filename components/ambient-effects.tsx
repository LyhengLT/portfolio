"use client"

import { useEffect, useMemo, useState } from "react"
import type { CSSProperties } from "react"

const sections = [
  { id: "hero", label: "Intro" },
  { id: "about", label: "About" },
  { id: "tech-stack", label: "Stack" },
  { id: "projects", label: "Work" },
  { id: "learning", label: "Growth" },
  { id: "contact", label: "Contact" },
]

const floatingWords = [
  { text: "BUILD", left: "4%", top: "17%", delay: "-2s", duration: "24s", rotate: "-8deg" },
  { text: "SHIP", left: "67%", top: "13%", delay: "-10s", duration: "28s", rotate: "7deg" },
  { text: "VUE", left: "10%", top: "58%", delay: "-16s", duration: "26s", rotate: "10deg" },
  { text: "GO", left: "77%", top: "52%", delay: "-6s", duration: "22s", rotate: "-11deg" },
  { text: "API", left: "43%", top: "76%", delay: "-13s", duration: "30s", rotate: "5deg" },
]

const runningRows = [
  "VUE GO FIBER ORACLE REST UI BUILD SHIP LEARN",
  "PORTFOLIO DEVELOPER FULL STACK CAMBODIA CLEAN CODE",
]

const typedPopWords = [
  { text: "const builder", left: "13%", top: "29%", delay: "-1s", width: "13ch", rotate: "-5deg" },
  { text: "deploy()", left: "71%", top: "27%", delay: "-7s", width: "8ch", rotate: "6deg" },
  { text: "UI motion", left: "23%", top: "72%", delay: "-12s", width: "9ch", rotate: "4deg" },
  { text: "api.ready", left: "63%", top: "68%", delay: "-17s", width: "9ch", rotate: "-7deg" },
  { text: "ship today", left: "47%", top: "44%", delay: "-22s", width: "10ch", rotate: "2deg" },
]

const popLetters = [
  { text: "L", left: "6%", top: "39%", delay: "-3s" },
  { text: "H", left: "87%", top: "18%", delay: "-8s" },
  { text: "{ }", left: "81%", top: "74%", delay: "-13s" },
  { text: "<>", left: "32%", top: "13%", delay: "-18s" },
  { text: "01", left: "52%", top: "86%", delay: "-23s" },
]

export function AmbientEffects() {
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false })

  const grains = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${(i * 17 + 9) % 100}%`,
        top: `${(i * 29 + 13) % 100}%`,
        delay: `${i * -0.7}s`,
        size: `${10 + (i % 5) * 4}px`,
      })),
    []
  )

  useEffect(() => {
    const updateCursor = (event: PointerEvent) => {
      setCursor({ x: event.clientX, y: event.clientY, visible: true })
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`)
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`)
      document.documentElement.style.setProperty("--mouse-pan-x", `${((event.clientX / window.innerWidth) - 0.5) * 24}px`)
      document.documentElement.style.setProperty("--mouse-pan-y", `${((event.clientY / window.innerHeight) - 0.5) * 24}px`)
    }
    const hideCursor = () => setCursor((current) => ({ ...current, visible: false }))

    window.addEventListener("pointermove", updateCursor)
    window.addEventListener("pointerleave", hideCursor)

    return () => {
      window.removeEventListener("pointermove", updateCursor)
      window.removeEventListener("pointerleave", hideCursor)
    }
  }, [])

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0
      setScrollProgress(Math.round(progress * 100))
      document.documentElement.style.setProperty("--page-progress", progress.toString())
    }

    updateProgress()
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)

    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (!element) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(section.id)
        },
        { rootMargin: "-42% 0px -48% 0px", threshold: 0.01 }
      )
      observer.observe(element)
      observers.push(observer)
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  return (
    <>
      <div className="ambient-stage" aria-hidden="true">
        <div className="ambient-beam ambient-beam-a" />
        <div className="ambient-beam ambient-beam-b" />
        <div className="ambient-wash ambient-wash-a" />
        <div className="ambient-wash ambient-wash-b" />
        <div className="ambient-wash ambient-wash-c" />
        <div className="ambient-type-layer">
          <span className="ambient-mega-word ambient-mega-word-a">DEVELOPER</span>
          <span className="ambient-mega-word ambient-mega-word-b">FULL STACK</span>
          <span className="ambient-mega-word ambient-mega-word-c">LYHENG</span>
          {floatingWords.map((word) => (
            <span
              key={word.text}
              className="ambient-floating-word"
              style={
                {
                  "--word-left": word.left,
                  "--word-top": word.top,
                  "--word-delay": word.delay,
                  "--word-duration": word.duration,
                  "--word-rotate": word.rotate,
                } as CSSProperties
              }
            >
              {word.text}
            </span>
          ))}
          {runningRows.map((row, index) => (
            <div key={row} className={`ambient-word-runner ambient-word-runner-${index + 1}`}>
              <div className="ambient-word-track">
                {Array.from({ length: 3 }, (_, repeatIndex) => (
                  <span key={`${row}-${repeatIndex}`}>{row}</span>
                ))}
              </div>
            </div>
          ))}
          {typedPopWords.map((word) => (
            <span
              key={word.text}
              className="ambient-type-pop"
              style={
                {
                  "--type-left": word.left,
                  "--type-top": word.top,
                  "--type-delay": word.delay,
                  "--type-width": word.width,
                  "--type-rotate": word.rotate,
                } as CSSProperties
              }
            >
              <span className="ambient-type-pop-text">{word.text}</span>
            </span>
          ))}
          {popLetters.map((letter) => (
            <span
              key={letter.text}
              className="ambient-letter-pop"
              style={
                {
                  "--letter-left": letter.left,
                  "--letter-top": letter.top,
                  "--letter-delay": letter.delay,
                } as CSSProperties
              }
            >
              {letter.text}
            </span>
          ))}
        </div>
        <div className="paper-grain">
          {grains.map((grain) => (
            <span
              key={grain.id}
              style={
                {
                  "--grain-left": grain.left,
                  "--grain-top": grain.top,
                  "--grain-delay": grain.delay,
                  "--grain-size": grain.size,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <div
        className={`cursor-orbit ${cursor.visible ? "is-visible" : ""}`}
        style={{ "--cursor-x": `${cursor.x}px`, "--cursor-y": `${cursor.y}px` } as CSSProperties}
        aria-hidden="true"
      />

      <div
        className="live-action-dock"
        style={{ "--dock-progress": `${scrollProgress}%` } as CSSProperties}
        aria-label={`Current section ${activeSection}, page progress ${scrollProgress}%`}
      >
        <span className="live-action-dot" />
        <span className="live-action-section">{sections.find((section) => section.id === activeSection)?.label}</span>
        <span className="live-action-track">
          <span className="live-action-fill" />
        </span>
        <span className="live-action-percent">{scrollProgress}%</span>
      </div>

      <aside className="section-rail" aria-label="Section navigation">
        <div className="section-rail-line" />
        {sections.map((section, index) => {
          const isActive = activeSection === section.id
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`section-rail-item ${isActive ? "is-active" : ""}`}
              style={{ "--rail-index": index } as CSSProperties}
              aria-label={section.label}
            >
              <span className="section-rail-dot" />
              <span className="section-rail-label">{section.label}</span>
            </a>
          )
        })}
      </aside>
    </>
  )
}
