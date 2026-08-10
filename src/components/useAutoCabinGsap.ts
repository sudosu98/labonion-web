"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, type RefObject } from "react";

gsap.registerPlugin(useGSAP);

type AutoCabinRefs = {
  cabinRef: RefObject<HTMLElement | null>;
  driverRef: RefObject<HTMLElement | null>;
  radioRef: RefObject<HTMLElement | null>;
  isPlaying: boolean;
};

export function useAutoCabinGsap({
  cabinRef,
  driverRef,
  radioRef,
  isPlaying,
}: AutoCabinRefs) {
  const timelinesRef = useRef<gsap.core.Timeline[]>([]);
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  useGSAP(() => {
    const cabin = cabinRef.current;
    const driver = driverRef.current;
    const radio = radioRef.current;
    if (!cabin || !driver || !radio) return;

    gsap.set(cabin, {
      transformOrigin: "50% 50%",
      force3D: true,
    });
    gsap.set(driver, {
      xPercent: -50,
      transformOrigin: "50% 85%",
      force3D: true,
    });
    gsap.set(radio, {
      transformOrigin: "50% 0%",
      force3D: true,
    });

    const mm = gsap.matchMedia();

    // At least one named query must match or GSAP reverts the context.
    // Cover desktop explicitly so animations stay alive above 640px.
    mm.add(
      {
        isDesktop: "(min-width: 640px)",
        isMobile: "(max-width: 639px)",
        isShort: "(max-height: 480px) and (orientation: landscape)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const conditions = context.conditions ?? {};
        const isMobile = Boolean(conditions.isMobile);
        const isShort = Boolean(conditions.isShort);
        if (conditions.reduceMotion) {
          timelinesRef.current = [];
          return;
        }

        const cabinAmp = isShort
          ? { rotation: 0.35, x: 2, y: 1, duration: 2.8 }
          : isMobile
            ? { rotation: 0.5, x: 2.5, y: 1.5, duration: 2.7 }
            : { rotation: 1, x: 6, y: 4, duration: 2.4 };
        const driverAmp = isShort
          ? { rotation: 1.8, x: 2.5, duration: 2.2 }
          : isMobile
            ? { rotation: 2.2, x: 3.5, duration: 2.1 }
            : { rotation: 4, x: 8, duration: 1.8 };
        const radioRotation = isShort ? 5 : isMobile ? 7 : 12;

        const cabinTl = gsap.timeline({ repeat: -1, yoyo: true, paused: true });
        cabinTl.fromTo(
          cabin,
          { rotation: -cabinAmp.rotation, x: -cabinAmp.x, y: -cabinAmp.y },
          {
            rotation: cabinAmp.rotation,
            x: cabinAmp.x,
            y: cabinAmp.y,
            duration: cabinAmp.duration,
            ease: "sine.inOut",
            immediateRender: false,
          },
        );

        const driverTl = gsap.timeline({ repeat: -1, yoyo: true, paused: true });
        driverTl.fromTo(
          driver,
          { rotation: -driverAmp.rotation, x: -driverAmp.x },
          {
            rotation: driverAmp.rotation,
            x: driverAmp.x,
            duration: driverAmp.duration,
            ease: "sine.inOut",
            immediateRender: false,
          },
        );

        const radioTl = gsap.timeline({ repeat: -1, yoyo: true, paused: true });
        radioTl.fromTo(
          radio,
          { rotation: -radioRotation },
          {
            rotation: radioRotation,
            duration: isMobile || isShort ? 1.4 : 1.2,
            ease: "sine.inOut",
            immediateRender: false,
          },
        );

        const timelines = [cabinTl, driverTl, radioTl];
        timelinesRef.current = timelines;

        // Midpoint of each fromTo is the neutral pose.
        if (isPlayingRef.current) {
          for (const tl of timelines) tl.play();
        } else {
          for (const tl of timelines) tl.progress(0.5).pause();
        }

        return () => {
          cabinTl.kill();
          driverTl.kill();
          radioTl.kill();
          timelinesRef.current = [];
        };
      },
    );

    return () => {
      mm.revert();
      timelinesRef.current = [];
    };
  }, []);

  useEffect(() => {
    const timelines = timelinesRef.current;
    if (!timelines.length) return;

    if (isPlaying) {
      for (const tl of timelines) tl.play();
      return;
    }

    for (const tl of timelines) tl.progress(0.5).pause();
  }, [isPlaying]);
}
