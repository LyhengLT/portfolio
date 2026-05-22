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

export function AmbientEffects() {
  const [activeSection, setActiveSection] = useState("hero")
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
        <div className="ambient-wash ambient-wash-a" />
        <div className="ambient-wash ambient-wash-b" />
        <div className="ambient-wash ambient-wash-c" />
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
