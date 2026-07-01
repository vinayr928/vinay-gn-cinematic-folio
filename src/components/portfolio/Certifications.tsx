import { motion } from "framer-motion";
import { SectionHeading } from "./About";
import { Award, ShieldCheck, BadgeCheck, Sparkles } from "lucide-react";

const certs = [
  { icon: Award, title: "HL7 Fundamentals", org: "Healthcare Interop" },
  { icon: ShieldCheck, title: "Mirth Connect Certified", org: "Integration Engine" },
  { icon: BadgeCheck, title: "ERP Implementation", org: "Hospital ERP" },
  { icon: Sparkles, title: "Lab Integration Specialist", org: "Diagnostics" },
];

export function Certifications() {
  return (
    <section id="certs" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionHeading eyebrow="Certifications" title={<>Credentials, in <span className="text-gradient">holographic glass</span>.</>} />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certs.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass holo-shine group relative overflow-hidden rounded-3xl p-6"
            >
              <div className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  background: "conic-gradient(from 200deg at 50% 50%, transparent, oklch(0.82 0.18 210 / 0.25), transparent 40%, oklch(0.65 0.25 290 / 0.25), transparent 80%)",
                }} />
              <div className="relative">
                <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                  <c.icon className="h-6 w-6 text-[oklch(0.82_0.18_210)]" />
                </div>
                <h3 className="font-semibold">{c.title}</h3>
                <div className="mt-1 text-xs text-muted-foreground">{c.org}</div>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="mt-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  <span>Verified</span>
                  <span>#{(1000 + i * 137).toString(16).toUpperCase()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
