import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GraduationCap, Stethoscope, Cpu, HeartPulse } from "lucide-react";

const stats = [
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Projects Completed", value: 40, suffix: "+" },
  { label: "Clients Supported", value: 25, suffix: "+" },
  { label: "Technologies", value: 20, suffix: "+" },
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const dur = 1400;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(start + (to - start) * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

const facets = [
  { icon: GraduationCap, label: "Diploma in Computer Science" },
  { icon: Cpu, label: "Full Stack Development Foundation" },
  { icon: Stethoscope, label: "Healthcare Integration · HL7 · LIS" },
  { icon: HeartPulse, label: "ERP Implementation · Training · Support" },
];

export function About() {
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = cardRef.current; if (!el) return;
    const on = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -12;
      el.style.transform = `perspective(1200px) rotateX(${y}deg) rotateY(${x}deg)`;
    };
    const off = () => { el.style.transform = "perspective(1200px) rotateX(0) rotateY(0)"; };
    el.addEventListener("mousemove", on); el.addEventListener("mouseleave", off);
    return () => { el.removeEventListener("mousemove", on); el.removeEventListener("mouseleave", off); };
  }, []);

  return (
    <section id="about" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionHeading eyebrow="About" title={<>Engineer bridging <span className="text-gradient">business, code and implementation</span>.</>} />

        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7 }}
            className="glass lg:col-span-3 rounded-3xl p-8 transition-transform duration-200 will-change-transform"
          >
            <p className="text-lg leading-relaxed text-muted-foreground">
              I'm <span className="text-foreground font-medium">Vinay GN</span> — a technology professional with
              experience spanning software development, ERP implementation, healthcare integration, client
              onboarding, technical support and enterprise software deployment.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              My career has evolved across multiple industries, allowing me to combine technical expertise with
              business understanding to deliver successful implementation projects.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {facets.map((f) => (
                <div key={f.label} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-white/[0.02] p-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.82_0.18_210)]/20 to-[oklch(0.65_0.25_290)]/20 text-[oklch(0.82_0.18_210)]">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm">{f.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass group relative overflow-hidden rounded-2xl p-5"
              >
                <div className="text-4xl font-bold text-gradient">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
                <div className="pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-70"
                  style={{ background: "oklch(0.82 0.18 210)" }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl"
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        <span className="h-1 w-1 rounded-full bg-[oklch(0.82_0.18_210)]" /> {eyebrow}
      </div>
      <h2 className="text-4xl font-bold leading-tight sm:text-5xl">{title}</h2>
    </motion.div>
  );
}
