import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[200] grid place-items-center bg-background"
        >
          <div className="relative">
            <div className="h-24 w-24 animate-spin-slow rounded-full border-2 border-transparent"
              style={{ borderTopColor: "oklch(0.82 0.18 210)", borderRightColor: "oklch(0.65 0.25 290)" }} />
            <div className="absolute inset-3 rounded-full"
              style={{ background: "radial-gradient(circle, oklch(0.65 0.25 290 / 0.5), transparent 70%)" }} />
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-display text-lg font-semibold text-gradient">VGN</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
