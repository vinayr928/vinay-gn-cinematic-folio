import { motion } from "framer-motion";
import avatar from "@/assets/avatar.jpg";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-[13px] font-medium uppercase tracking-[0.18em] text-[color:var(--primary)]"
      >
        Project Implementation Engineer II
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="mt-4 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl"
      >
        Vinay GN.
        <br />
        <span className="text-muted-foreground">Building software that ships.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
      >
        ERP implementation, healthcare integration, deployment and training —
        delivered with clarity and care.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[15px]"
      >
        <a
          href="#experience"
          className="rounded-full bg-[color:var(--primary)] px-5 py-2.5 font-medium text-[color:var(--primary-foreground)] transition-opacity hover:opacity-90"
        >
          View my journey
        </a>
        <a
          href="#contact"
          className="font-medium text-[color:var(--primary)] hover:underline"
        >
          Get in touch <span aria-hidden>›</span>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
        className="relative mt-16 aspect-square w-56 sm:w-64"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white to-[color:var(--secondary)] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.15)] ring-1 ring-black/5" />
        <img
          src={avatar}
          alt="Vinay GN — Project Implementation Engineer"
          width={512}
          height={512}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-2 rounded-full object-cover"
        />
      </motion.div>
    </section>
  );
}
