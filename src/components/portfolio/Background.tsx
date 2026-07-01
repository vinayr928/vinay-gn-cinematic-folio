import { useEffect, useRef } from "react";

export function Background() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Deterministic pseudo-random particles
  const particles = Array.from({ length: 60 }, (_, i) => {
    const s = Math.sin(i * 12.9898) * 43758.5453;
    const rx = s - Math.floor(s);
    const ry = (Math.sin(i * 78.233) * 43758.5453) % 1;
    return {
      left: `${(rx * 100).toFixed(2)}%`,
      top: `${((ry < 0 ? -ry : ry) * 100).toFixed(2)}%`,
      delay: `${(rx * 6).toFixed(2)}s`,
      size: (rx * 2 + 1).toFixed(1),
    };
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden bg-background"
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%" }}
    >
      {/* Aurora blobs */}
      <div className="absolute -top-1/4 -left-1/4 h-[70vmax] w-[70vmax] rounded-full opacity-40 blur-3xl animate-aurora"
        style={{ background: "radial-gradient(circle, oklch(0.65 0.25 290) 0%, transparent 60%)" }} />
      <div className="absolute -bottom-1/3 -right-1/4 h-[70vmax] w-[70vmax] rounded-full opacity-30 blur-3xl animate-aurora"
        style={{ background: "radial-gradient(circle, oklch(0.82 0.18 210) 0%, transparent 60%)", animationDelay: "-6s" }} />
      <div className="absolute top-1/3 left-1/2 h-[50vmax] w-[50vmax] -translate-x-1/2 rounded-full opacity-20 blur-3xl animate-aurora"
        style={{ background: "radial-gradient(circle, oklch(0.70 0.28 340) 0%, transparent 60%)", animationDelay: "-12s" }} />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }} />

      {/* Mouse light */}
      <div className="absolute inset-0 opacity-60 transition-opacity"
        style={{ background: "radial-gradient(600px circle at var(--mx) var(--my), oklch(0.82 0.18 210 / 0.15), transparent 60%)" }} />

      {/* Particles */}
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/60 animate-float"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: p.delay,
              boxShadow: "0 0 8px rgba(255,255,255,0.6)",
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, oklch(0.09 0.03 275) 100%)" }} />
    </div>
  );
}
