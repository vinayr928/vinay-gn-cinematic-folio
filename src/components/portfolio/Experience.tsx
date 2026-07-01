import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./About";
import { ChevronDown } from "lucide-react";

const items = [
  {
    role: "Project Implementation Engineer II",
    org: "VMEdulife Software",
    period: "May 2026 – Present",
    detail:
      "Driving Education ERP implementation and college ERP deployment — client onboarding, user training, software configuration, requirement analysis, technical support, product implementation, issue resolution and digital transformation.",
  },
  {
    role: "Lab Integration Specialist",
    org: "Bharishnu Tech + Drucare",
    period: "Feb 2025 – May 2026",
    detail:
      "Healthcare software integration: laboratory machine integration, HL7 communication, LIS connectivity, hospital software support, API integrations, interface troubleshooting and technical implementation.",
  },
  {
    role: "Project Coordinator · Core Master Trainer · ERP Financial Transactions",
    org: "Machint Solutions",
    period: "Mar 2024 – Feb 2025",
    detail:
      "ERP solutions for cooperative societies — ERP implementation, financial transaction workflows, user training, project coordination, requirement gathering, client support and software deployment.",
  },
  {
    role: "Cashier & APX",
    org: "Sangeetha Mobiles",
    period: "Mar 30, 2022 – Jun 5, 2023",
    detail:
      "Billing operations, cash management, inventory support, customer service and store operations.",
  },
  {
    role: "Sales Executive",
    org: "Sangeetha Mobiles",
    period: "Sep 20, 2021 – Mar 15, 2022",
    detail:
      "Customer engagement, product consultation, sales and relationship management.",
  },
  {
    role: "Full Stack Developer",
    org: "Elpis Systems",
    period: "1 Year",
    detail:
      "Web application development, frontend and backend development, database management, bug fixing and software testing.",
  },
  {
    role: "Diploma in Computer Science Engineering",
    org: "Education",
    period: "Foundation",
    detail:
      "Built a strong foundation in programming, software development, databases, networking and problem solving.",
  },
];

export function Experience() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="experience" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionHeading eyebrow="Experience" title={<>A timeline of <span className="text-gradient">shipped implementations</span>.</>} />

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 bottom-0 w-px md:left-1/2"
            style={{ background: "linear-gradient(to bottom, transparent, oklch(0.65 0.25 290 / 0.6), transparent)" }} />
          <div className="space-y-8">
            {items.map((it, i) => {
              const side = i % 2 === 0;
              const isOpen = open === i;
              return (
                <motion.div
                  key={it.role}
                  initial={{ opacity: 0, x: side ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className={`relative md:grid md:grid-cols-2 md:gap-10 ${side ? "" : "md:[direction:rtl]"}`}
                >
                  <div className={`pl-12 md:pl-0 ${side ? "md:pr-10 md:text-right" : "md:pl-10 md:[direction:ltr]"}`}>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="glass group w-full rounded-2xl p-6 text-left transition hover:border-white/20"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{it.period}</div>
                          <h3 className="mt-1 text-lg font-semibold">{it.role}</h3>
                          <div className="text-sm text-muted-foreground">{it.org}</div>
                        </div>
                        <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </div>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{it.detail}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                  <div className="hidden md:block" />
                  {/* dot */}
                  <div className="absolute left-4 top-6 md:left-1/2 md:-translate-x-1/2">
                    <div className="relative h-3 w-3 rounded-full bg-[oklch(0.82_0.18_210)] shadow-[0_0_20px_oklch(0.82_0.18_210)]">
                      <div className="absolute inset-0 animate-ping rounded-full bg-[oklch(0.82_0.18_210)] opacity-50" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
