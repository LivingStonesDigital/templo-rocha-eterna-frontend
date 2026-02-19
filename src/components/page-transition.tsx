"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { useRef } from "react";

const variants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 60 : -60,
    filter: "blur(4px)",
  }),
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -60 : 60,
    filter: "blur(4px)",
  }),
};

const transition = {
  duration: 0.4,
  ease: [0.25, 0.1, 0.25, 1],
};

// Mapa de ordem das rotas para determinar direção
const ROUTE_ORDER: Record<string, number> = {
  "/": 0,
  "/about": 1,
  "/work": 2,
};

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  const prevOrder = ROUTE_ORDER[prevPathnameRef.current] ?? 0;
  const currOrder = ROUTE_ORDER[pathname] ?? 0;
  const direction = currOrder >= prevOrder ? 1 : -1;

  if (prevPathnameRef.current !== pathname) {
    prevPathnameRef.current = pathname;
  }

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={pathname}
        custom={direction}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        style={{ width: "100%", willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}