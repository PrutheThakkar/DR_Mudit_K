import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SiteScrollReveal = () => {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const createReveals = ({ distance, duration, stagger, start }) => {
        const sections = gsap.utils.toArray(
          ".site-main section:not(.home-hero):not(.why-choose-mudit-khanna):not(.faq-section)"
        );

        sections.forEach((section) => {
          const container = section.querySelector(":scope > .container");
          if (!container) return;

          let targets = Array.from(container.children).filter(
            (element) =>
              !element.matches(
                ".swiper, .swiper-wrapper, .column-wrap, .expertise-listing__item, .insights-faq__list"
              )
          );

          if (!targets.length) targets = [container];

          gsap.from(targets, {
            y: distance,
            autoAlpha: 0,
            duration,
            stagger,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: section,
              start,
              once: true,
            },
          });
        });

        const revealGroups = [
          ".precision-every-joint .columns",
          ".expertise-listing__item",
          ".insights-grid > *",
          ".insights-faq__item",
          ".faq-list > *",
          ".contact-details-grid > *",
          ".contact-location-grid > *",
          ".blog-detail__section > *",
          ".map-section li",
          ".expertise-tabs .tabs-list--desktop > button",
          ".expertise-content > *",
          ".membership-card",
          ".personal-grid > *",
        ];

        revealGroups.forEach((selector) => {
          gsap.utils.toArray(selector).forEach((item, index) => {
            gsap.from(item, {
              y: distance * 0.8,
              autoAlpha: 0,
              scale: 0.985,
              duration,
              delay: Math.min(index % 2, 1) * stagger,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility",
              scrollTrigger: {
                trigger: item,
                start,
                once: true,
              },
            });
          });
        });

        gsap.utils.toArray(".why-choose-mudit-khanna").forEach(section => {
          const heading = section.querySelector(".section-heading");
          const slider = section.querySelector(".why-choose-slider");
          const targets = [heading, slider].filter(Boolean);

          if (!targets.length) return;

          gsap.from(targets, {
            y: distance,
            autoAlpha: 0,
            scale: 0.985,
            duration: duration + 0.08,
            stagger: stagger + 0.04,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: section,
              start,
              once: true,
            },
          });
        });

        gsap.utils.toArray(".faq-section").forEach(section => {
          const intro = section.querySelectorAll(".faq-section__intro > *");
          const items = section.querySelectorAll(".faq-accordion__item");

          if (!intro.length && !items.length) return;

          const faqTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              end: "center 52%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          });

          if (intro.length) {
            faqTimeline.from(
              intro,
              {
                x: -distance * 0.65,
                y: distance * 0.2,
                autoAlpha: 0,
                duration: 1,
                stagger,
                ease: "power3.out",
              },
              0
            );
          }

          if (items.length) {
            faqTimeline.from(
              items,
              {
                x: distance * 0.65,
                y: distance * 0.16,
                autoAlpha: 0,
                duration: 1,
                stagger: stagger * 0.75,
                ease: "power3.out",
              },
              0.12
            );
          }
        });

        const footerGroups = document.querySelectorAll(
          ".site-footer__top > *, .site-footer__bottom > *"
        );

        if (footerGroups.length) {
          gsap.from(footerGroups, {
            y: distance * 0.7,
            autoAlpha: 0,
            duration,
            stagger,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: ".site-footer",
              start,
              once: true,
            },
          });
        }

        gsap.utils
          .toArray(
            ".site-main section:not(.home-hero) .inside-banner img, .site-main .expertise-listing__image img, .expertise-content .content-image img, .personal-grid img"
          )
          .forEach((image) => {
            gsap.from(image, {
              scale: 1.055,
              autoAlpha: 0,
              duration: duration + 0.25,
              ease: "power2.out",
              clearProps: "transform,opacity,visibility",
              scrollTrigger: {
                trigger: image,
                start,
                once: true,
              },
            });
          });
      };

      mm.add("(min-width: 1025px)", () =>
        createReveals({
          distance: 58,
          duration: 0.95,
          stagger: 0.12,
          start: "top 86%",
        })
      );

      mm.add("(min-width: 768px) and (max-width: 1024px)", () =>
        createReveals({
          distance: 40,
          duration: 0.82,
          stagger: 0.09,
          start: "top 89%",
        })
      );

      mm.add("(max-width: 767px)", () =>
        createReveals({
          distance: 26,
          duration: 0.72,
          stagger: 0.06,
          start: "top 92%",
        })
      );

      return () => mm.revert();
    });

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    const refreshOnLoad = () => ScrollTrigger.refresh();

    window.addEventListener("load", refreshOnLoad, { once: true });

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", refreshOnLoad);
      ctx.revert();
    };
  }, []);

  return null;
};

export default SiteScrollReveal;
