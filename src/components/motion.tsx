"use client";

import { useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** GSAP context прибирає анімації на переходах; reduced-motion залишає контент нерухомим. */
export function Motion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const params = useSearchParams();
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".page-heading, .hero-copy", {
          y: 18,
          opacity: 0,
          duration: 0.65,
          ease: "power2.out",
          clearProps: "all",
        });
        gsap.from(".hero-art", {
          scale: 0.94,
          opacity: 0,
          duration: 0.85,
          ease: "power2.out",
          clearProps: "all",
        });
        gsap.utils
          .toArray<HTMLElement>(
            ".product, .section > .grid-3 > .panel, .stats > .panel",
          )
          .forEach((element, index) => {
            gsap.from(element, {
              y: 24,
              opacity: 0,
              duration: 0.55,
              delay: (index % 3) * 0.06,
              ease: "power2.out",
              scrollTrigger: { trigger: element, start: "top 97%", once: true },
              clearProps: "all",
            });
          });
      });
      return () => media.revert();
    },
    {
      scope,
      dependencies: [pathname, params.toString()],
      revertOnUpdate: true,
    },
  );
  return (
    <div ref={scope} className="motion-scope">
      {children}
    </div>
  );
}
