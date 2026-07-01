import { SectionHeading } from "./About";
import { motion } from "framer-motion";

const tech = ["HTML", "CSS", "JS", "Java", "SQL", "Git", "Postman", "VS Code", "Three.js", "React", "Tailwind", "HL7"];

export function TechStack() {
  return (
    <section id="stack" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionHeading eyebrow="Tech Stack" title={<>An orbit of tools I <span className="text-gradient">reach for daily</span>.</>} />

        <div className="mt-20 grid place-items-center">
          <div className="relative h-[420px] w-[420px] max-w-full sm:h-[520px] sm:w-[520px]">
            {/* core */}
            <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: "radial-gradient(circle at 30% 30%, white, oklch(0.65 0.25 290) 40%, oklch(0.14 0.03 275) 90%)",
                boxShadow: "0 0 60px oklch(0.65 0.25 290), 0 0 120px oklch(0.82 0.18 210 / 0.6)",
              }}
            />
            <div className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center">
              <div className="text-center font-display font-semibold">
                <div className="text-xs uppercase tracking-widest text-white/70">Core</div>
                <div className="text-lg">Vinay.GN</div>
              </div>
            </div>

            {/* orbits */}
            {[0, 1, 2].map((ring) => {
              const size = 220 + ring * 90;
              const dur = 30 + ring * 12;
              const count = 4 + ring * 2;
              return (
                <div
                  key={ring}
                  className="absolute left-1/2 top-1/2 rounded-full border border-white/10"
                  style={{
                    width: size,
                    height: size,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    className="relative h-full w-full"
                    animate={{ rotate: ring % 2 ? -360 : 360 }}
                    transition={{ duration: dur, repeat: Infinity, ease: "linear" }}
                  >
                    {Array.from({ length: count }).map((_, i) => {
                      const angle = (i / count) * Math.PI * 2;
                      const x = Math.cos(angle) * (size / 2);
                      const y = Math.sin(angle) * (size / 2);
                      const label = tech[(ring * 4 + i) % tech.length];
                      return (
                        <motion.div
                          key={i}
                          className="absolute grid h-14 w-14 place-items-center rounded-2xl glass text-xs font-semibold"
                          style={{ left: `calc(50% + ${x}px - 28px)`, top: `calc(50% + ${y}px - 28px)` }}
                          animate={{ rotate: ring % 2 ? 360 : -360 }}
                          transition={{ duration: dur, repeat: Infinity, ease: "linear" }}
                        >
                          {label}
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
