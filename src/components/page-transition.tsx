"use client";

import { motion, AnimatePresence, easeInOut } from "motion/react";
import { usePathname } from "next/navigation";
import { useRef } from "react";

const variants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 30 : -30,
  }),
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -30 : 30,
  }),
};

const transition = {
  duration: 0.2,
  ease: easeInOut,
};

// Mapa de ordem das rotas para determinar direção
const ROUTE_ORDER: Record<string, number> = {
  "/": 0,
  "/membros": 1,
  "/aniversariantes": 2,
  "/settings": 3,
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