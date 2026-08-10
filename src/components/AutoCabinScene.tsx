"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useAutoCabinGsap } from "./useAutoCabinGsap";

export default function AutoCabinScene() {
  const cabinRef = useRef<HTMLDivElement>(null);
  const driverRef = useRef<HTMLDivElement>(null);
  const radioRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useAutoCabinGsap({ cabinRef, driverRef, radioRef, isPlaying });

  const togglePlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [isPlaying]);

  return (
    <div className="auto-cabin relative h-[100dvh] w-full overflow-hidden bg-black">
      <audio
        ref={audioRef}
        src="/song.mp3"
        preload="metadata"
        loop
        onEnded={() => setIsPlaying(false)}
      >
        <track kind="captions" srcLang="en" label="Captions" />
      </audio>

      <div ref={cabinRef} className="auto-cabin__bg absolute will-change-transform">
        <Image
          src="/auto-cabin.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div
        ref={driverRef}
        className="auto-cabin__driver pointer-events-none absolute left-1/2 z-10"
      >
        <Image
          src="/auto-driver.png"
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 110vw, (max-width: 1024px) 48vw, 440px"
          className="auto-cabin__driver-img object-cover select-none"
          draggable={false}
        />
      </div>

      {!isPlaying && (
        <div className="auto-cabin__hint pointer-events-none absolute z-30">
          <p className="auto-cabin__hint-text">Enjoy your ride</p>
          <svg
            className="auto-cabin__hint-arrow"
            viewBox="0 0 120 90"
            fill="none"
            aria-hidden="true"
          >
            <path
              className="auto-cabin__hint-curve"
              d="M18 18 C 48 12, 78 28, 92 62"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M82 58 L94 66 L88 52"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      <button
        ref={radioRef}
        type="button"
        className="auto-cabin__radio absolute z-20 aspect-square cursor-pointer border-0 bg-transparent p-0"
        onClick={togglePlayback}
        aria-label={isPlaying ? "Pause song" : "Play song"}
        aria-pressed={isPlaying}
      >
        <Image
          src="/auto-radio.png"
          alt=""
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 28vw, 240px"
          className="auto-cabin__radio-img object-cover select-none"
          draggable={false}
        />
      </button>
    </div>
  );
}
