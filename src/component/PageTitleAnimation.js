import { useEffect } from "react";
import { gsap } from "gsap";

const wrapTextNode = (node) => {
  const fragment = document.createDocumentFragment();
  const normalizedText = node.textContent.replace(/\s+/g, " ");

  normalizedText.split(/(\s+)/).forEach((part) => {
    if (!part) return;

    if (/^\s+$/.test(part)) {
      fragment.appendChild(document.createTextNode(" "));
      return;
    }

    const clip = document.createElement("span");
    const word = document.createElement("span");

    clip.className = "page-title-word-clip";
    clip.setAttribute("aria-hidden", "true");
    word.className = "page-title-word";
    word.textContent = part;

    clip.appendChild(word);
    fragment.appendChild(clip);
  });

  node.replaceWith(fragment);
};

const PageTitleAnimation = () => {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return undefined;

    const titles = gsap.utils.toArray(".site-main h1");
    const originals = [];
    const timelines = [];
    const metal = document.querySelector(".home-hero__metal");
    const metalWrap = document.querySelector(".home-hero__metal-wrap");
    const heroDetails = document.querySelectorAll(
      ".home-hero__bottom .left > *"
    );
    const heroActions = document.querySelectorAll(
      ".home-hero__bottom .right .home-hero__button"
    );

    if (metal && metalWrap) {
      const metalTimeline = gsap.timeline({ delay: 0.05 });
      metalTimeline
        .fromTo(
          metal,
          { autoAlpha: 0, scale: 0.86, filter: "blur(14px)" },
          {
            autoAlpha: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.65,
            ease: "power3.out",
            clearProps: "opacity,visibility,filter",
          }
        )
        .to(
          metal,
          {
            y: -8,
            scale: 1.018,
            duration: 4.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }
        );
      timelines.push(metalTimeline);
    }

    if (heroDetails.length || heroActions.length) {
      const bottomTimeline = gsap.timeline({ delay: 0.9 });

      bottomTimeline
        .fromTo(
          heroDetails,
          { x: -38, autoAlpha: 0, filter: "blur(6px)" },
          {
            x: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.14,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility,filter",
          }
        )
        .fromTo(
          heroActions,
          { x: 38, y: 10, scale: 0.92, autoAlpha: 0 },
          {
            x: 0,
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.72,
            stagger: 0.12,
            ease: "back.out(1.35)",
            clearProps: "transform,opacity,visibility",
          },
          "-=0.48"
        );

      timelines.push(bottomTimeline);
    }

    titles.forEach((title) => {
      originals.push({
        title,
        html: title.innerHTML,
        ariaLabel: title.getAttribute("aria-label"),
      });

      const accessibleTitle = title.textContent.replace(/\s+/g, " ").trim();
      const walker = document.createTreeWalker(
        title,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) =>
            node.textContent.trim().length
              ? NodeFilter.FILTER_ACCEPT
              : NodeFilter.FILTER_REJECT,
        }
      );
      const textNodes = [];

      while (walker.nextNode()) textNodes.push(walker.currentNode);
      textNodes.forEach(wrapTextNode);
      title.setAttribute("aria-label", accessibleTitle);

      const words = title.querySelectorAll(".page-title-word");
      const timeline = gsap.timeline({ delay: 0.12 });

      timeline.fromTo(
        words,
        {
          yPercent: 112,
          skewY: 5,
          filter: "blur(10px)",
          autoAlpha: 0,
        },
        {
          yPercent: 0,
          skewY: 0,
          filter: "blur(0px)",
          autoAlpha: 1,
          duration: 0.95,
          stagger: {
            each: 0.095,
            from: "start",
          },
          ease: "power4.out",
          clearProps: "transform,opacity,visibility,filter",
        }
      );

      timelines.push(timeline);
    });

    return () => {
      timelines.forEach((timeline) => timeline.kill());
      originals.forEach(({ title, html, ariaLabel }) => {
        title.innerHTML = html;
        if (ariaLabel === null) title.removeAttribute("aria-label");
        else title.setAttribute("aria-label", ariaLabel);
      });
    };
  }, []);

  return null;
};

export default PageTitleAnimation;
