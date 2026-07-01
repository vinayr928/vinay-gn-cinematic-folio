import { Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Rocket } from "lucide-react";
import avatar from "@/assets/avatar.jpg";

const words = ["Project Implementation Engineer", "ERP Consultant", "Implementation Specialist", "Technical Trainer", "Software Deployment Engineer", "Problem Solver"];

function Typewriter() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i];
    const t = setTimeout(() => {
      if (!del) {
        setText(w.slice(0, text.length + 1));
        if (text.length + 1 === w.length) setTimeout(() => setDel(true), 1400);
      } else {
        setText(w.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDel(false); setI((i + 1) % words.length); }
      }
    }, del ? 40 : 70);
    return () => clearTimeout(t);
  }, [text, del, i]);
  return (
    <span className="text-gradient">
      {text}
      <span className="animate-blink text-[oklch(0.82_0.18_210)]">|</span>
    </span>
  );
}

function Scene3D() {
  const [Mod, setMod] = useState<null | {
    Canvas: any; OrbitControls: any; Float: any; Icosahedron: any; Torus: any; Box: any; MeshDistortMaterial: any; Environment: any;
  }>(null);
  useEffect(() => {
    let alive = true;
    Promise.all([import("@react-three/fiber"), import("@react-three/drei")]).then(([f, d]) => {
      if (!alive) return;
      setMod({
        Canvas: f.Canvas,
        OrbitControls: d.OrbitControls,
        Float: d.Float,
        Icosahedron: d.Icosahedron,
        Torus: d.Torus,
        Box: d.Box,
        MeshDistortMaterial: d.MeshDistortMaterial,
        Environment: d.Environment,
      });
    });
    return () => { alive = false; };
  }, []);
  if (!Mod) return null;
  const { Canvas, OrbitControls, Float, Icosahedron, Torus, Box, MeshDistortMaterial, Environment } = Mod;
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#7cd8ff" />
      <pointLight position={[-5, -3, 2]} intensity={2} color="#c084fc" />
      <Suspense fallback={null}>
        <Environment preset="city" />
        <Float speed={2} rotationIntensity={1.5} floatIntensity={1.4}>
          <Icosahedron args={[1.5, 1]} position={[0, 0, 0]}>
            <MeshDistortMaterial color="#7cd8ff" distort={0.35} speed={2} roughness={0.15} metalness={0.9} />
          </Icosahedron>
        </Float>
        <Float speed={1.3} rotationIntensity={2} floatIntensity={1.2}>
          <Torus args={[2.6, 0.03, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
            <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={1.4} />
          </Torus>
        </Float>
        <Float speed={1.6} rotationIntensity={2} floatIntensity={1.8}>
          <Box args={[0.5, 0.5, 0.5]} position={[2.4, 1.2, -1]}>
            <meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={0.6} wireframe />
          </Box>
        </Float>
        <Float speed={1.1} rotationIntensity={2} floatIntensity={1.4}>
          <Icosahedron args={[0.35, 0]} position={[-2.6, -1.1, 0.5]}>
            <meshStandardMaterial color="#7cd8ff" emissive="#7cd8ff" emissiveIntensity={0.8} wireframe />
          </Icosahedron>
        </Float>
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} enableDamping />
    </Canvas>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / r.width;
      const y = (e.clientY - r.top - r.height / 2) / r.height;
      el.style.setProperty("--px", `${x * 20}px`);
      el.style.setProperty("--py", `${y * 20}px`);
    };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, []);

  return (
    <section id="home" ref={ref} className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24">
      {/* light rays */}
      <div aria-hidden className="absolute inset-0 -z-0 overflow-hidden">
        {[0, 20, -20, 40, -40].map((r, i) => (
          <div key={i}
            className="absolute left-1/2 top-1/2 h-[160vh] w-40 origin-top -translate-x-1/2 -translate-y-1/4 blur-2xl opacity-30"
            style={{
              transform: `translateX(-50%) rotate(${r}deg)`,
              background: `linear-gradient(to bottom, oklch(0.82 0.18 210 / 0.6), transparent 70%)`,
              animation: `float-y ${6 + i}s ease-in-out infinite`,
            }} />
        ))}
      </div>

      <div className="container relative z-10 mx-auto grid gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
          style={{ transform: "translate3d(var(--px,0), var(--py,0), 0)" }}
        >
          <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Available for new projects
          </div>
          <h1 className="font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            <span className="block text-foreground">Vinay <span className="text-gradient">GN</span></span>
            <span className="mt-3 block text-2xl font-medium text-muted-foreground sm:text-3xl">
              Project Implementation Engineer II
            </span>
          </h1>
          <p className="mt-4 font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
            ERP · Healthcare IT · Deployment · Training
          </p>
          <div className="mt-8 text-2xl font-medium sm:text-3xl">
            <Typewriter />
          </div>
          <p className="mt-6 max-w-xl text-base text-muted-foreground">
            Transforming businesses through ERP implementation, software deployment,
            technical consulting, and digital transformation.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#experience"
              className="hoverable group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[oklch(0.82_0.18_210)] to-[oklch(0.65_0.25_290)] px-6 py-3 text-sm font-semibold text-[oklch(0.12_0.03_275)] transition-shadow hover:shadow-[0_0_40px_oklch(0.65_0.25_290)]">
              <Rocket className="h-4 w-4" /> View My Journey
            </a>
            <a href="#contact"
              className="hoverable inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-white/5 transition">
              <Mail className="h-4 w-4" /> Contact Me
            </a>
          </div>
        </motion.div>

        {/* Avatar + 3D */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          <div className="absolute inset-0 -z-10">
            <Scene3D />
          </div>
          <div className="relative h-full w-full animate-float">
            <div className="absolute inset-0 rounded-full blur-3xl opacity-60"
              style={{ background: "radial-gradient(circle, oklch(0.65 0.25 290 / 0.6), transparent 70%)" }} />
            <div className="glass absolute inset-6 overflow-hidden rounded-full holo-shine">
              <img src={avatar} alt="Vinay GN" width={768} height={768}
                className="h-full w-full object-cover" />
            </div>
            {/* orbit ring */}
            <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-white/20" />
            <div className="absolute -inset-6 animate-spin-slow rounded-full border border-white/10"
              style={{ animationDirection: "reverse", animationDuration: "40s" }} />
          </div>
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        <div className="flex flex-col items-center gap-2">
          <span>Scroll</span>
          <span className="h-8 w-px animate-pulse bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
