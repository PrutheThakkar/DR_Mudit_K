import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const InteractiveMotion = () => {
  const glowRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (reduceMotion) return undefined;

    const cleanups = [];
    const progress = progressRef.current;
    const setProgress = gsap.quickTo(progress, "scaleX", {
      duration: 0.25,
      ease: "power2.out",
    });

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    cleanups.push(() => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    });

    if (hasFinePointer) {
      const glow = glowRef.current;
      const moveGlowX = gsap.quickTo(glow, "x", { duration: 0.45, ease: "power3.out" });
      const moveGlowY = gsap.quickTo(glow, "y", { duration: 0.45, ease: "power3.out" });

      const followPointer = event => {
        moveGlowX(event.clientX);
        moveGlowY(event.clientY);
        gsap.to(glow, { autoAlpha: 1, duration: 0.25, overwrite: true });
      };
      const hideGlow = () =>
        gsap.to(glow, { autoAlpha: 0, duration: 0.3, overwrite: true });

      window.addEventListener("pointermove", followPointer, { passive: true });
      document.documentElement.addEventListener("mouseleave", hideGlow);
      cleanups.push(() => {
        window.removeEventListener("pointermove", followPointer);
        document.documentElement.removeEventListener("mouseleave", hideGlow);
      });

      const magneticTargets = gsap.utils.toArray(
        ".home-hero__button, .details-btn, .contact-button, .site-footer__cta"
      );

      magneticTargets.forEach(target => {
        const move = event => {
          const bounds = target.getBoundingClientRect();
          const x = event.clientX - (bounds.left + bounds.width / 2);
          const y = event.clientY - (bounds.top + bounds.height / 2);
          gsap.to(target, {
            x: x * 0.16,
            y: y * 0.16,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
        };
        const reset = () =>
          gsap.to(target, {
            x: 0,
            y: 0,
            duration: 0.65,
            ease: "elastic.out(1, 0.45)",
            overwrite: true,
          });

        target.addEventListener("pointermove", move);
        target.addEventListener("pointerleave", reset);
        cleanups.push(() => {
          target.removeEventListener("pointermove", move);
          target.removeEventListener("pointerleave", reset);
          gsap.set(target, { clearProps: "transform" });
        });
      });

    }

    return () => cleanups.forEach(cleanup => cleanup());
  }, []);

  return (
    <>
      <div className="motion-progress" aria-hidden="true">
        <span ref={progressRef} />
      </div>
      <div ref={glowRef} className="motion-pointer-glow" aria-hidden="true" />
    </>
  );
};

export default InteractiveMotion;
