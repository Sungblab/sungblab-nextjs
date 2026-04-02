import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Respect prefers-reduced-motion
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mq.matches) {
    gsap.globalTimeline.timeScale(1000);
    gsap.defaults({ duration: 0 });
  }
}

export { gsap, ScrollTrigger };
