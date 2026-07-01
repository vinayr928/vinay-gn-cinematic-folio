import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none");
    let rx = 0, ry = 0, dx = 0, dy = 0;
    const move = (e: MouseEvent) => {
      dx = e.clientX; dy = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${dx - 4}px, ${dy - 4}px)`;
      const t = e.target as HTMLElement;
      setHover(!!t.closest('a,button,[role="button"],input,textarea,.hoverable'));
    };
    const loop = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
      raf = requestAnimationFrame(loop);
    };
    let raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-none");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-white mix-blend-difference"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-10 w-10 rounded-full border border-white/60 transition-[width,height,border-color,background,opacity] duration-200"
        style={{
          width: hover ? 56 : 40,
          height: hover ? 56 : 40,
          borderColor: hover ? "oklch(0.82 0.18 210)" : "rgba(255,255,255,0.5)",
          background: hover ? "color-mix(in oklab, oklch(0.82 0.18 210) 15%, transparent)" : "transparent",
          boxShadow: hover ? "0 0 30px oklch(0.82 0.18 210)" : "none",
        }}
      />
    </>
  );
}
