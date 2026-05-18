"use client"

import { useEffect, useRef } from "react"
import { Mail, Instagram, Github, ArrowUpRight, Send } from "lucide-react"

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
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    description: "For casual updates & discussions",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "LyhengLT",
    href: "https://github.com/LyhengLT",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    description: "See my code & projects",
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
    <section id="contact" ref={sectionRef} className="py-24 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="reveal text-primary font-mono text-xs tracking-widest uppercase mb-3">
            05. Contact
          </p>
          <h2 className="reveal text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Let&apos;s Connect
          </h2>
          <p className="reveal text-muted-foreground max-w-md mx-auto">
            Whether it&apos;s a project idea, an opportunity, or just saying hi — I&apos;d love to hear from you.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="reveal group bg-card border border-border rounded-xl p-6 hover:border-border/80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center`}>
                  <c.icon className={`w-4.5 h-4.5 ${c.color}`} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-200" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{c.label}</h3>
              <p className="text-muted-foreground text-xs mb-3">{c.description}</p>
              <p className={`font-mono text-xs font-semibold ${c.color}`}>{c.value}</p>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal text-center">
          <a
            href="mailto:laylyheng88@gmail.com"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
          >
            <Send className="w-4 h-4" />
            Start a Conversation
          </a>
        </div>
      </div>
    </section>
  )
}
