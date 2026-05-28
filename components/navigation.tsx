"use client"

import { useState, useEffect } from "react"
import type { CSSProperties } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Projects", href: "#projects" },
  { label: "Build", href: "#build-log" },
  { label: "Learning", href: "#learning" },
  { label: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setIsScrolled(window.scrollY > 50)
      setScrollProgress(maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: "-40% 0px -55% 0px" }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    const selector = ".reveal, .reveal-left, .reveal-right"
    let elements: HTMLElement[] = []
    let observer: IntersectionObserver | undefined
    const markVisible = (el: HTMLElement) => el.classList.add("visible")
    const isInViewport = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect()
      return rect.top < window.innerHeight * 0.92 && rect.bottom > window.innerHeight * 0.08
    }

    const revealCurrentViewport = () => elements.filter(isInViewport).forEach(markVisible)
    const setupReveal = () => {
      elements = Array.from(document.querySelectorAll<HTMLElement>(selector))
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              markVisible(entry.target as HTMLElement)
              observer?.unobserve(entry.target)
            }
          })
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
      )

      elements.forEach((el, index) => {
        if (!el.style.getPropertyValue("--reveal-delay")) {
          el.style.setProperty("--reveal-delay", `${Math.min(index, 8) * 45}ms`)
        }
        if (isInViewport(el)) {
          markVisible(el)
        } else {
          observer?.observe(el)
        }
      })
    }

    const setupTimer = window.setTimeout(setupReveal, 60)
    window.addEventListener("hashchange", revealCurrentViewport)
    window.addEventListener("scroll", revealCurrentViewport, { passive: true })

    return () => {
      window.clearTimeout(setupTimer)
      observer?.disconnect()
      window.removeEventListener("hashchange", revealCurrentViewport)
      window.removeEventListener("scroll", revealCurrentViewport)
    }
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-background/20"
          : "bg-transparent"
      }`}
      style={{ "--scroll-progress": scrollProgress } as CSSProperties}
    >
      <div className="scroll-progress absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-primary via-[#caa26a] to-accent" />
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-[4.5rem]">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }}
            className="relative text-2xl font-black group"
          >
            <span className="bg-gradient-to-r from-primary via-[#8c6a45] to-accent bg-clip-text text-transparent hover:opacity-90 transition-opacity">
              Lyheng.
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const id = link.href.slice(1)
              const isActive = activeSection === id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-3 py-2 text-base font-semibold rounded-lg transition-all duration-300 ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </a>
              )
            })}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:laylyheng88@gmail.com"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-accent text-primary-foreground text-base font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
            >
              Hire Me
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-[4.5rem] left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-6 py-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`block px-4 py-3 rounded-lg text-lg font-semibold transition-colors ${
                  isActive ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-secondary/60"
                }`}
              >
                {link.label}
              </a>
            )
          })}
          <div className="pt-2">
            <a
              href="mailto:laylyheng88@gmail.com"
              className="block text-center px-4 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground text-lg font-bold rounded-lg"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
