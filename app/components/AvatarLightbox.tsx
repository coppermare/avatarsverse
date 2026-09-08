"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export interface LightboxAvatar {
  alt: string;
  src: string;
}

interface AvatarLightboxProps {
  avatars: LightboxAvatar[];
  initialIndex: number;
  onClose: () => void;
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden
      className={direction === "right" ? "rotate-180" : undefined}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path
        d="m15 18-6-6 6-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden fill="none" height="20" viewBox="0 0 20 20" width="20">
      <path
        d="m5 5 10 10M15 5 5 15"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

function LightboxImage({ avatar }: { avatar: LightboxAvatar }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-zinc-900 shadow-2xl">
      {!loaded && (
        <div
          aria-hidden
          className="absolute inset-0 animate-pulse bg-zinc-800"
        />
      )}
      <Image
        alt={avatar.alt}
        className={`h-full w-full object-cover transition-opacity duration-200 ${loaded ? "opacity-100" : "opacity-0"}`}
        height={1024}
        onLoad={() => setLoaded(true)}
        priority
        sizes="(max-width: 768px) 88vw, 72vh"
        src={avatar.src}
        unoptimized
        width={1024}
      />
    </div>
  );
}

export function AvatarLightbox({
  avatars,
  initialIndex,
  onClose,
}: AvatarLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastSwipeAtRef = useRef(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const currentAvatar = avatars[currentIndex];

  const navigate = useCallback(
    (direction: -1 | 1) => {
      setCurrentIndex(
        (index) => (index + direction + avatars.length) % avatars.length
      );
    },
    [avatars.length]
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") navigate(-1);
      if (event.key === "ArrowRight") navigate(1);
      if (event.key === "Tab") {
        const focusableElements =
          dialogRef.current?.querySelectorAll<HTMLElement>(
            "button:not([disabled])"
          );
        if (!focusableElements?.length) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [navigate, onClose]);

  if (!currentAvatar) return null;

  function handleTouchStart(event: React.TouchEvent) {
    if ((event.target as Element).closest("button")) return;

    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event: React.TouchEvent) {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const horizontalDistance = touch.clientX - start.x;
    const verticalDistance = touch.clientY - start.y;
    const isHorizontalSwipe =
      Math.abs(horizontalDistance) >= 40 &&
      Math.abs(horizontalDistance) > Math.abs(verticalDistance) * 1.25;

    if (isHorizontalSwipe) {
      lastSwipeAtRef.current = Date.now();
      navigate(horizontalDistance > 0 ? -1 : 1);
    }
  }

  return (
    <div
      aria-label="Avatar preview"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex touch-pan-y items-center justify-center bg-black/90 p-3 pb-20 pt-16 backdrop-blur-sm sm:p-8"
      onClick={(event) => {
        const justSwiped = Date.now() - lastSwipeAtRef.current < 500;
        if (event.target === event.currentTarget && !justSwiped) onClose();
      }}
      onTouchCancel={() => {
        touchStartRef.current = null;
      }}
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
      ref={dialogRef}
      role="dialog"
    >
      <button
        aria-label="Close preview"
        className="absolute right-3 top-3 z-10 inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-zinc-900/90 text-zinc-300 transition hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-8 sm:top-8"
        onClick={onClose}
        ref={closeButtonRef}
        type="button"
      >
        <CloseIcon />
      </button>

      <button
        aria-label="Previous avatar"
        className="absolute bottom-3 left-3 z-10 inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-zinc-900/90 text-zinc-200 transition hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:bottom-auto sm:left-8 sm:top-1/2 sm:size-12 sm:-translate-y-1/2"
        onClick={() => navigate(-1)}
        type="button"
      >
        <ChevronIcon direction="left" />
      </button>

      <div className="flex w-full max-w-[min(92vw,calc(100dvh-9rem),44rem)] flex-col items-center gap-4 sm:max-w-[min(72vh,44rem)]">
        <LightboxImage avatar={currentAvatar} key={currentAvatar.src} />
        <span
          aria-live="polite"
          className="shrink-0 text-center text-sm text-zinc-400"
        >
          {currentIndex + 1} / {avatars.length}
        </span>
      </div>

      <button
        aria-label="Next avatar"
        className="absolute bottom-3 right-3 z-10 inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-zinc-900/90 text-zinc-200 transition hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:bottom-auto sm:right-8 sm:top-1/2 sm:size-12 sm:-translate-y-1/2"
        onClick={() => navigate(1)}
        type="button"
      >
        <ChevronIcon direction="right" />
      </button>
    </div>
  );
}
