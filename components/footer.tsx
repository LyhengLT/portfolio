import { Mail, Instagram, Github, Heart } from "lucide-react"

const socials = [
  { icon: Mail, href: "mailto:laylyheng88@gmail.com", label: "Email" },
  { icon: Instagram, href: "https://instagram.com/lay_lyheng", label: "Instagram" },
  { icon: Github, href: "https://github.com/LyhengLT", label: "GitHub" },
]

export function Footer() {
  return (
    <footer className="py-10 px-6 lg:px-12 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <p className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Lyheng.
            </p>
            <p className="text-muted-foreground text-xs mt-1 font-mono">
              Phnom Penh, Cambodia
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="w-9 h-9 rounded-lg border border-border bg-card/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Right side */}
          <p className="text-muted-foreground text-sm flex items-center gap-1.5">
            Built with{" "}
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />{" "}
            using{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-medium">
              Next.js
            </span>{" "}
            &amp;{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent font-medium">
              Tailwind
            </span>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-border/30 text-center">
          <p className="text-muted-foreground text-xs font-mono">
            &copy; {new Date().getFullYear()} Lyheng — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
