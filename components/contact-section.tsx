"use client"

import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"
import { Mail, Instagram, Github, ArrowUpRight, Send, BriefcaseBusiness, Clock3, MapPin } from "lucide-react"

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "laylyheng88@gmail.com",
    href: "mailto:laylyheng88@gmail.com",
    color: "text-primary",
    bg: "bg-primary/10",
    description: "Best for project discussions",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@lay_lyheng",
    href: "https://instagram.com/lay_lyheng",
    color: "text-[#a65f4a]",
    bg: "bg-[#a65f4a]/10",
    description: "For casual updates & discussions",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "LyhengLT",
    href: "https://github.com/LyhengLT",
    color: "text-[#374151]",
    bg: "bg-[#374151]/10",
    description: "See my code & projects",
  },
]

const availability = [
  {
    icon: BriefcaseBusiness,
    label: "Open for",
    value: "Internship and junior developer opportunities",
  },
  {
    icon: Clock3,
    label: "Best fit",
    value: "Frontend, full-stack practice, and product clone work",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "Phnom Penh, Cambodia",
  },
]

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const elements = section.querySelectorAll(".reveal")
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
    <section id="contact" ref={sectionRef} className="section-shell px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="reveal section-kicker text-primary font-mono uppercase mb-4">
            07. Contact
          </p>
          <h2 className="reveal section-title font-black mb-6 text-foreground">
            Let&apos;s Connect
          </h2>
          <p className="reveal section-subtitle text-muted-foreground mx-auto">
            Whether it&apos;s a project idea, an opportunity, or just saying hi — I&apos;d love to hear from you.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-12">
          {contacts.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="reveal contact-signal-card modern-card group bg-card border border-border rounded-xl p-7 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/20"
              style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`contact-icon w-14 h-14 rounded-lg ${c.bg} flex items-center justify-center`}>
                  <c.icon className={`w-6 h-6 ${c.color}`} />
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-muted-foreground transition-all group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
              </div>
              <h3 className="font-bold text-foreground text-2xl mb-2">{c.label}</h3>
              <p className="text-muted-foreground text-base mb-4">{c.description}</p>
              <p className={`font-mono text-sm font-bold break-words ${c.color}`}>{c.value}</p>
            </a>
          ))}
        </div>

        <div className="reveal mb-12 grid grid-cols-1 gap-3 rounded-2xl border border-border bg-card/55 p-4 shadow-xl shadow-primary/5 md:grid-cols-3 md:p-5">
          {availability.map((item, index) => (
            <div
              key={item.label}
              className="group rounded-xl border border-border/70 bg-background/45 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:bg-background/70"
              style={{ "--reveal-delay": `${(index + contacts.length) * 70}ms` } as CSSProperties}
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="contact-icon flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-xs font-black uppercase tracking-[0.16em] text-primary">
                  {item.label}
                </span>
              </div>
              <p className="text-base font-black leading-snug text-foreground/85">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal text-center">
          <a
            href="mailto:laylyheng88@gmail.com"
            className="pulse-cta inline-flex items-center gap-2.5 px-9 py-4 bg-primary text-primary-foreground rounded-xl text-lg font-bold transition-all duration-300 hover:opacity-90 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/20"
          >
            <Send className="w-5 h-5" />
            Start a Conversation
          </a>
        </div>
      </div>
    </section>
  )
}
