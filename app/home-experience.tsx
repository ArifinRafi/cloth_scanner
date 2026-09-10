'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import AIModelSection from './ai-model-section';
import TechnicalSpecs from './technical-specs';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const AssemblyScene = dynamic(() => import('./assembly-scene'), {
  ssr: false,
  loading: () => <div className="assembly-loading" role="status">Preparing your inspection robot<span /></div>,
});

const phases = ['The foundation', 'Precision in motion', 'Intelligence, assembled'];
const RobotExperience = dynamic(() => import('./scanner-experience'), {
  ssr: false,
  loading: () => <section className="robot-section-loading" role="status">Preparing the robot workflow…</section>,
});
type Theme = 'light' | 'dark';

export default function HomeExperience() {
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [phase, setPhase] = useState(0);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('weavescan-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
      return;
    }
  }, []);

  const toggleTheme = () => {
    setTheme(current => {
      const next = current === 'light' ? 'dark' : 'light';
      window.localStorage.setItem('weavescan-theme', next);
      return next;
    });
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const element = section.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add({ reduced: '(prefers-reduced-motion: reduce)', motion: '(prefers-reduced-motion: no-preference)' }, context => {
      const reduced = !!context.conditions?.reduced;
      const playhead = { value: 0 };
      const update = () => {
        const p = playhead.value;
        progress.current = reduced ? 1 : p;
        element.style.setProperty('--assembly-progress', String(p));
        element.style.setProperty('--heading-reveal', String(reduced ? 1 : Math.min(1, p / .38)));
        element.style.setProperty('--detail-reveal', String(reduced ? 1 : Math.min(1, Math.max(0, (p - .25) / .35))));
        setPhase(p < .3 ? 0 : p < .7 ? 1 : 2);
      };
      update();
      gsap.to(playhead, {
        value: 1, ease: 'none', onUpdate: update,
        scrollTrigger: { trigger: element, start: 'top top', end: 'bottom bottom', scrub: reduced ? true : .65, invalidateOnRefresh: true },
      });
    });
    return () => media.revert();
  }, []);

  return (
    <main className="home-shell" data-theme={theme}>
      <a className="home-skip" href="#home-copy">Skip to introduction</a>
      <header className="home-header">
        <Link className="home-brand" href="/" aria-label="Cloth Scanner home"><span className="brand-icon" aria-hidden="true"><i /><i /><i /></span><span>Cloth Scanner</span></Link>
        <nav aria-label="Main navigation">
          <Link href="/" aria-current="page">Overview</Link>
          <span aria-disabled="true" title="Coming soon">Technology</span>
          <span aria-disabled="true" title="Coming soon">Applications</span>
          <span aria-disabled="true" title="Coming soon">Contact</span>
        </nav>
        <div className="home-header-actions">
          <div className="home-header-note"><i />Engineered for RMG</div>
          <button
            className="home-theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            aria-pressed={theme === 'dark'}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <span className="theme-toggle-sun" aria-hidden="true">☼</span>
            <span className="theme-toggle-track" aria-hidden="true"><i /></span>
            <span className="theme-toggle-moon" aria-hidden="true">◐</span>
          </button>
        </div>
      </header>

      <section ref={section} className="assembly-journey" aria-label="Meet the cloth inspection robot">
        <div className="assembly-sticky">
          <div className="home-scene-panel">
            <div className="scene-caption"><span>THE INSPECTION ROBOT</span><span>01 / OVERVIEW</span></div>
            <div className="assembly-canvas" role="img" aria-label="3D cloth scanner: the frame, gantry, glass panel and cameras assemble as you scroll"><AssemblyScene progress={progress} theme={theme} /></div>
            <div className="assembly-phase" aria-live="polite"><span className="phase-number">0{phase + 1}</span><div><span>BUILT FOR EVERY CUT</span><p>{phases[phase]}</p></div><span className="phase-plus" aria-hidden="true">+</span></div>
          </div>

          <div id="home-copy" className="home-copy">
            <p className="home-eyebrow"><span />A NEW STANDARD IN TEXTILE INSPECTION</p>
            <h1><span className="home-title-line">Cloth</span><span className="home-title-line home-title-green">Scanner<span className="title-dot">.</span></span></h1>
            <div className="home-heading-secondary"><h2>Every cut.<br /><span>Seen clearly.</span></h2></div>
            <div className="home-detail"><p className="home-product-description">AI-based cut panel inspection robot<br /><strong>for RMG industries.</strong></p><p className="home-description">Precision handling. Dual-view imaging.<br />Intelligent inspection, working as one.</p></div>
            <div className="home-scroll-instruction"><span aria-hidden="true">↓</span><div>SCROLL TO ASSEMBLE<small>You control the motion.</small></div></div>
          </div>

          <footer className="home-stage-footer">
            <span>FROM THE FIRST CUT TO THE FINAL CHECK.</span>
            <ol className="assembly-chapters" aria-label="Assembly stages">{['Structure', 'Assembly', 'Precision'].map((label, index) => <li key={label} aria-current={phase === index ? 'step' : undefined}><span>0{index + 1}</span>{label}</li>)}</ol>
            <div className="assembly-progress-track" aria-hidden="true"><i /></div>
          </footer>
        </div>
      </section>

      <section className="conventional-section" aria-labelledby="conventional-title" id="conventional-inspection">
        <div className="conventional-story">
          <div>
            <p className="conventional-eyebrow">02 / HOW CONVENTIONAL INSPECTION WORKS</p>
            <h2 id="conventional-title">Every panel.<br /><span>Still checked by hand.</span></h2>
          </div>
          <div className="conventional-summary">
            <p>Workers inspect and sort each cut panel by eye. Across every stack, the same checks repeat—making manual inspection repetitive and time-consuming.</p>
            <div className="conventional-stat">
              <strong>4<span>%+</span></strong>
              <div><span>Reported sorting error rate</span><p>Manual checks can still miss defects.</p></div>
            </div>
          </div>
        </div>
        <figure className="conventional-photo">
          <Image src="/images/conventional/manual-inspection-blurred.webp" alt="Workers inspecting stacks of cut fabric by hand, with factory lettering blurred" fill sizes="(max-width: 800px) 94vw, 53vw" />
        </figure>
      </section>
      <AIModelSection />
      <RobotExperience embedded />
      <TechnicalSpecs />
    </main>
  );
}
