import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-0.5 origin-left"
        style={{
          scaleX: progress,
          background: "linear-gradient(90deg, oklch(0.82 0.18 210), oklch(0.65 0.25 290), oklch(0.70 0.28 340))",
        }}
      />
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        className={`fixed left-1/2 top-4 z-40 -translate-x-1/2 transition-all ${scrolled ? "top-3" : "top-6"}`}
      >
        <div className="glass flex items-center gap-1 rounded-full px-2 py-2">
          <button
            onClick={() => go("home")}
            className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold"
          >
            <span className="h-2 w-2 rounded-full bg-[oklch(0.82_0.18_210)] shadow-[0_0_10px_oklch(0.82_0.18_210)]" />
            <span className="hidden sm:inline">Vinay<span className="text-gradient">.GN</span></span>
          </button>
          <div className="hidden md:flex items-center">
            {links.slice(1).map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  active === l.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {l.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => go("contact")}
            className="ml-1 rounded-full bg-gradient-to-r from-[oklch(0.82_0.18_210)] to-[oklch(0.65_0.25_290)] px-4 py-1.5 text-xs font-semibold text-[oklch(0.12_0.03_275)] hover:shadow-[0_0_30px_oklch(0.65_0.25_290)] transition-shadow"
          >
            Let's talk
          </button>
        </div>
      </motion.nav>
    </>
  );
}
