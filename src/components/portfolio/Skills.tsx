import { motion } from "framer-motion";
import { SectionHeading } from "./About";
import { Braces, Briefcase } from "lucide-react";

const groups = [
  {
    key: "Technical Skills",
    icon: Braces,
    color: "oklch(0.82 0.18 210)",
    items: ["ERP", "SQL", "HTML", "CSS", "JavaScript", "Java", "C++", "REST APIs", "HL7", "Database Management", "Software Testing"],
  },
  {
    key: "Functional Skills",
    icon: Briefcase,
    color: "oklch(0.65 0.25 290)",
    items: ["ERP Implementation", "Client Training", "Project Coordination", "Technical Support", "Software Deployment", "Product Configuration", "Business Analysis", "Requirement Gathering", "Troubleshooting", "User Acceptance Testing"],
  },
];

function Sphere({ color }: { color: string }) {
  return (
    <div className="relative h-14 w-14 shrink-0 [perspective:600px]">
      <div className="absolute inset-0 rounded-full transition-transform duration-500 group-hover:[transform:rotateY(180deg)_rotateX(20deg)]"
        style={{
          background: `radial-gradient(circle at 30% 25%, white 0%, ${color} 25%, oklch(0.15 0.05 275) 80%)`,
          boxShadow: `0 0 30px -6px ${color}, inset -6px -8px 20px rgba(0,0,0,0.5)`,
        }}
      />
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition"
        style={{ boxShadow: `0 0 60px ${color}` }} />
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionHeading eyebrow="Skills" title={<>A stack tuned for <span className="text-gradient">healthcare-grade reliability</span>.</>} />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {groups.map((g, gi) => (
            <motion.div
              key={g.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: gi * 0.08 }}
              className="glass group/card relative overflow-hidden rounded-3xl p-8"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5" style={{ color: g.color }}>
                  <g.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">{g.key}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {g.items.map((item) => (
                  <div key={item} className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-white/[0.02] p-3 transition-all hover:border-white/20 hover:bg-white/[0.05]">
                    <Sphere color={g.color} />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-30 blur-3xl transition-opacity group-hover/card:opacity-60"
                style={{ background: g.color }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
