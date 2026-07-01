import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./About";
import { Linkedin, Mail, MessageCircle, Send, Check } from "lucide-react";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 900);
  };
  return (
    <section id="contact" className="relative py-32">
      <div className="container mx-auto px-6">
        <SectionHeading eyebrow="Contact" title={<>Let's build something <span className="text-gradient">reliably brilliant</span>.</>} />

        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 lg:col-span-3"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" placeholder="Your name" />
              <Field label="Email" name="email" type="email" placeholder="you@company.com" />
            </div>
            <div className="mt-5">
              <label className="mb-2 block text-xs font-mono uppercase tracking-widest text-muted-foreground">Message</label>
              <textarea
                required rows={5}
                placeholder="Tell me about your project…"
                className="w-full resize-none rounded-2xl border border-border bg-white/[0.03] px-4 py-3 text-sm outline-none transition focus:border-[oklch(0.82_0.18_210)] focus:bg-white/[0.06] focus:ring-2 focus:ring-[oklch(0.82_0.18_210)]/30"
              />
            </div>
            <button
              type="submit"
              disabled={loading || sent}
              className="hoverable group mt-6 inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[oklch(0.82_0.18_210)] to-[oklch(0.65_0.25_290)] px-6 py-3 text-sm font-semibold text-[oklch(0.12_0.03_275)] transition-all hover:shadow-[0_0_40px_oklch(0.65_0.25_290)] disabled:opacity-60"
            >
              {sent ? <><Check className="h-4 w-4" /> Sent</> : loading ? "Sending…" : <><Send className="h-4 w-4 transition-transform group-hover:translate-x-1" /> Send Message</>}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <div className="glass rounded-3xl p-6">
              <h3 className="font-semibold">Reach out directly</h3>
              <p className="mt-1 text-sm text-muted-foreground">I read every message. Typical reply in under 24 hours.</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Social icon={Linkedin} label="LinkedIn" href="https://www.linkedin.com/in/vinay-g-n-096659172/" />
                <Social icon={Mail} label="Email" href="mailto:writeforvinay@gmail.com" />
                <Social icon={MessageCircle} label="WhatsApp" href="https://wa.me/917349466054" />
              </div>
            </div>
            <div className="glass rounded-3xl p-6">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Currently</div>
              <div className="mt-2 text-lg font-semibold">Open to new implementation projects & consulting</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-2 block text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        required
        {...props}
        className="w-full rounded-2xl border border-border bg-white/[0.03] px-4 py-3 text-sm outline-none transition focus:border-[oklch(0.82_0.18_210)] focus:bg-white/[0.06] focus:ring-2 focus:ring-[oklch(0.82_0.18_210)]/30"
      />
    </div>
  );
}

function Social({ icon: Icon, label, href }: { icon: any; label: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer"
      className="hoverable group flex items-center gap-3 rounded-2xl border border-border/60 bg-white/[0.02] p-3 transition hover:border-white/20 hover:bg-white/[0.05]">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 text-[oklch(0.82_0.18_210)] transition group-hover:bg-white/10">
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
}
