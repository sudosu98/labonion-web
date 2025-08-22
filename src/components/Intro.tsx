"use client";

import React, { RefObject } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { Logo } from "@/icons/Logo";

export default function Intro() {
  const container = useRef<HTMLElement>();
  const { scrollYProgress } = useScroll({
    target: container as RefObject<HTMLElement>,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "150vh"]);

  return (
    <div className="h-screen overflow-hidden">
      <motion.div
        style={{ y }}
        className="relative h-full flex items-center justify-center"
      >
        <Logo className="font-bold md:text-[100px] sm:text-6xl text-3xl" height="100px" width="" />
      </motion.div>
    </div>
  );
}
