import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./About";
import { X, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Healthcare Integration Hub",
    tag: "HL7 · Mirth Connect",
    color: "oklch(0.82 0.18 210)",
    desc: "Central HL7 routing layer that connects EMRs, LIS, and radiology systems across multiple hospital branches with real-time monitoring and retry logic.",
  },
  {
    title: "ERP Implementation Rollout",
    tag: "ERP · Multi-site",
    color: "oklch(0.65 0.25 290)",
    desc: "Deployed a hospital ERP covering billing, inventory, and pharmacy across a chain of clinics — including data migration and staff training.",
  },
  {
    title: "Laboratory Automation",
    tag: "LIS · Analyzer Interfaces",
    color: "oklch(0.70 0.28 340)",
    desc: "Automated bidirectional integration for 20+ lab analyzers via serial and TCP protocols, eliminating manual result entry and turnaround delays.",
  },
  {
    title: "Hospital Software Deployment",
    tag: "HIS · Go-live",
    color: "oklch(0.78 0.15 160)",
    desc: "Managed full-stack HIS go-live for a 200-bed hospital — from server setup and network config to OPD, IPD, and pharmacy modules.",
  },
  {
    title: "API Integration Platform",
    tag: "REST · Webhooks",
    color: "oklch(0.75 0.20 60)",
    desc: "Designed and documented REST integrations connecting internal systems with insurance TPAs, payment gateways, and external labs.",
  },
];

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const on = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -14;
      el.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
    };
    const off = () => { el.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)"; };
    el.addEventListener("mousemove", on); el.addEventListener("mouseleave", off);
    return () => { el.removeEventListener("mousemove", on); el.removeEventListener("mouseleave", off); };
  }, []);
  return <div ref={ref} className="h-full transition-transform duration-200 will-change-transform">{children}</div>;
}

export function Projects() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="projects" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionHeading eyebrow="Featured Projects" title={<>Systems that <span className="text-gradient">quietly power</span> hospitals every day.</>} />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.button
              key={p.title}
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="text-left"
            >
              <TiltCard>
                <div className="glass holo-shine group relative h-full overflow-hidden rounded-3xl p-6">
                  <div className="mb-6 h-40 overflow-hidden rounded-2xl border border-border/60"
                    style={{ background: `radial-gradient(circle at 30% 30%, ${p.color} 0%, oklch(0.15 0.05 275) 70%)` }}>
                    <div className="grid h-full w-full place-items-center">
                      <div className="h-24 w-24 rounded-2xl bg-white/10 backdrop-blur"
                        style={{ boxShadow: `0 0 40px ${p.color}` }} />
                    </div>
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{p.tag}</div>
                  <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs text-[oklch(0.82_0.18_210)]">
                    View case <ExternalLink className="h-3 w-3" />
                  </div>
                </div>
              </TiltCard>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-black/70 backdrop-blur-md p-4"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ y: 40, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 40, scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
              className="glass-strong relative max-w-lg rounded-3xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setOpen(null)} className="absolute right-4 top-4 rounded-full p-2 hover:bg-white/10">
                <X className="h-4 w-4" />
              </button>
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{projects[open].tag}</div>
              <h3 className="mt-2 text-2xl font-semibold">{projects[open].title}</h3>
              <p className="mt-4 text-muted-foreground">{projects[open].desc}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
