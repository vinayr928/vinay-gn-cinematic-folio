import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 700);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] grid place-items-center bg-background"
        >
          <div className="h-8 w-8 animate-spin-slow rounded-full border-2 border-[color:var(--border)] border-t-[color:var(--primary)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
