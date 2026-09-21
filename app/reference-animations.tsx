'use client';

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const AssemblyScene = dynamic(() => import('./assembly-scene'), { ssr: false,
  loading: () => <div className="reference-scene-loading" role="status">Preparing the inspection robot…</div> });
const SortingScene = dynamic(() => import('./reference-sorting-scene'), { ssr: false,
  loading: () => <div className="reference-scene-loading" role="status">Preparing the sorting animation…</div> });

function useSceneVisibility(ref: RefObject<HTMLDivElement | null>) {
  const [near, setNear] = useState(false);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setNear(true);
      setActive(entry.isIntersecting);
    }, { rootMargin: '300px' });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return { near, active };
}

export function AssemblyScroll() {
  const mount = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const { active } = useSceneVisibility(mount);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const hero = mount.current?.closest<HTMLElement>('.hero');
    if (!hero) return;
    const media = gsap.matchMedia();
    media.add({ reduce: '(prefers-reduced-motion: reduce)', full: '(prefers-reduced-motion: no-preference)' }, context => {
      if (context.conditions?.reduce) { progress.current = 1; return; }
      const playhead = { value: 0 };
      gsap.to(playhead, { value: 1, ease: 'none',
        onUpdate: () => { progress.current = playhead.value; },
        scrollTrigger: { id: 'reference-assembly', trigger: hero, pin: hero,
          start: 'top top', end: () => `+=${Math.max(850, window.innerHeight * 1.5)}`,
          scrub: .65, invalidateOnRefresh: true, anticipatePin: 1 },
      });
    });
    document.fonts.ready.then(() => { if (mount.current) ScrollTrigger.refresh(); });
    return () => media.revert();
  }, []);
  return <div ref={mount} className="hero-machine hero-machine-animated" role="img"
    aria-label="The Cloth Scanner robot assembles and zooms into view as you scroll.">
    <AssemblyScene progress={progress} theme="dark" active={active} />
  </div>;
}

const phases = [
  { at: 0, title: 'Intake - Panel Arrives on Bed', desc: 'Panel arrives on the 1.8m x 2.4m working surface' },
  { at: .18, title: 'Grip - Secure All Four Sides', desc: 'Four clip grippers align and gently secure the top cut panel.' },
  { at: .29, title: 'Lift - Pick a Single Panel', desc: 'The gripper lifts one panel from the stack, keeping its edges controlled.' },
  { at: .39, title: 'Position - Place on the Glass', desc: 'The gantry moves the fabric onto the glass inspection surface.' },
  { at: .61, title: 'Capture - Light and Scan', desc: 'Top and bottom lights flash as the cameras capture the fabric for AI inspection.' },
  { at: .735, title: 'Inspect - Panel Accepted', desc: 'The AI inspection completes and the panel is cleared for the next step.' },
  { at: .86, title: 'Sort - Transfer Accepted Panel', desc: 'The robot picks up the accepted panel and places it on the output side.' },
];

export function SortingScroll() {
  const stage = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const { near, active } = useSceneVisibility(stage);
  const [step, setStep] = useState(0);
  const stepRef = useRef(0);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const element = stage.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add({ reduce: '(prefers-reduced-motion: reduce)', full: '(prefers-reduced-motion: no-preference)' }, context => {
      if (context.conditions?.reduce) { progress.current = 0; return; }
      const playhead = { value: 0 };
      gsap.to(playhead, { value: 1, ease: 'none',
        onUpdate: () => {
          progress.current = playhead.value;
          const next = phases.reduce((result, phase, index) => playhead.value >= phase.at ? index : result, 0);
          if (next !== stepRef.current) { stepRef.current = next; setStep(next); }
        },
        scrollTrigger: { id: 'reference-sorting', trigger: element, pin: element,
          start: 'top top', end: () => `+=${Math.max(2600, window.innerHeight * 4)}`,
          scrub: .8, invalidateOnRefresh: true, anticipatePin: 1 },
      });
    });
    return () => media.revert();
  }, []);
  return <div className="works-stage works-stage-animated" ref={stage}>
    <div className="works-machine works-machine-animated" role="img"
      aria-label="Scroll-controlled cloth pickup, placement, camera flash, AI inspection, and sorting animation.">
      {near && <SortingScene progress={progress} active={active} />}
    </div>
    <div className="works-side">
      <div className="scroll-hint"><span>Scroll down to see how the scanner works</span><span className="arrow-circle" aria-hidden="true">↓</span></div>
      <div className="step-card" aria-live="polite" aria-atomic="true">
        <div className="step-top"><span className="step-no">{String(step + 1).padStart(2, '0')}</span><span className="step-title">{phases[step].title}</span><span className="dot" /></div>
        <p className="step-desc">{phases[step].desc}</p>
        {step === 5 && <div className="sort-accepted"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="m7 12 3 3 7-7" /></svg>Accepted</div>}
      </div>
      <a className="skip-animation" href="#specs">Skip to specifications <span aria-hidden="true">↓</span></a>
    </div>
  </div>;
}
