'use client';

import { useEffect } from 'react';

// Progressive enhancement of the server-rendered reference markup. All listeners
// have explicit cleanup, including Strict Mode remounts and route transitions.
export default function ReferenceInteractions() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.reference-site');
    if (!root) return;
    const controller = new AbortController();
    const { signal } = controller;
    const q = <T extends HTMLElement = HTMLElement>(selector: string) => root.querySelector<T>(selector)!;
    const qa = <T extends HTMLElement = HTMLElement>(selector: string) => [...root.querySelectorAll<T>(selector)];
    const overlay = q('#inspModal');
    const dialog = q('.insp-modal');
    const single = q('.stage-single');
    const compare = q('.stage-compare');
    const picture = q<HTMLImageElement>('.stage-img');
    const closer = q<HTMLButtonElement>('.closer-look');
    const closeButton = q<HTMLButtonElement>('.insp-close');
    const tabs = qa<HTMLButtonElement>('.insp-seg button');
    const previousOverflow = document.body.style.overflow;
    let opener: HTMLElement | null = null;
    let data: DOMStringMap | null = null;
    let view = 'pred';
    let zoomed = false;
    let closeTimer: ReturnType<typeof setTimeout> | undefined;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    function zoom(value: boolean) {
      zoomed = value;
      single.classList.toggle('zoomed', value);
      q('.cl-label').textContent = value ? 'Fit to Panel' : 'Closer Look';
      closer.setAttribute('aria-pressed', String(value));
      if (!value) picture.style.transformOrigin = 'center center';
    }
    function showView(value: string) {
      if (!data) return;
      view = value;
      zoom(false);
      tabs.forEach(tab => {
        const selected = tab.dataset.view === value;
        tab.classList.toggle('active', selected);
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });
      compare.hidden = value !== 'compare';
      single.hidden = value === 'compare';
      if (value === 'compare') {
        q<HTMLImageElement>('.cmp-orig').src = data.orig!;
        q<HTMLImageElement>('.cmp-pred').src = data.pred!;
      } else picture.src = value === 'orig' ? data.orig! : data.pred!;
      q('.stage-single .defect-badge').hidden = value === 'orig';
      q('.foot-title').textContent = value === 'orig' ? 'Original capture.' : data.foot!;
      q('.foot-text').textContent = value === 'orig'
        ? 'The panel exactly as photographed on the bed, before AI inspection.' : data.text!;
      closer.style.visibility = value === 'pred' ? 'visible' : 'hidden';
    }
    function open(button: HTMLElement) {
      clearTimeout(closeTimer);
      opener = button;
      data = button.dataset;
      q('.insp-title').textContent = data.title!;
      qa('.db-text, .db-text2').forEach(el => { el.textContent = data!.defect!; });
      showView('pred');
      overlay.hidden = false;
      document.body.style.overflow = 'hidden';
      void overlay.offsetHeight;
      overlay.classList.add('show');
      closeButton.focus({ preventScroll: true });
    }
    function close() {
      overlay.classList.remove('show');
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => { overlay.hidden = true; }, 200);
    }
    qa<HTMLButtonElement>('.js-inspect').forEach(button => button.addEventListener('click', () => open(button), { signal }));
    tabs.forEach((tab, index) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', String(tab.classList.contains('active')));
      tab.tabIndex = tab.classList.contains('active') ? 0 : -1;
      tab.addEventListener('click', () => showView(tab.dataset.view!), { signal });
      tab.addEventListener('keydown', event => {
        if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        showView(tabs[next].dataset.view!);
        tabs[next].focus();
      }, { signal });
    });
    closeButton.addEventListener('click', close, { signal });
    overlay.addEventListener('click', event => { if (event.target === overlay) close(); }, { signal });
    document.addEventListener('keydown', event => {
      if (overlay.hidden || !overlay.classList.contains('show')) return;
      if (event.key === 'Escape') close();
      if (event.key === 'Tab') {
        const focusable = [...dialog.querySelectorAll<HTMLElement>('button:not([disabled]), [tabindex="0"]')]
          .filter(el => el.tabIndex >= 0 && getComputedStyle(el).visibility !== 'hidden');
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }, { signal });
    closer.addEventListener('click', () => { if (view === 'pred') zoom(!zoomed); }, { signal });
    single.addEventListener('click', () => { if (view !== 'compare') zoom(!zoomed); }, { signal });
    single.addEventListener('mousemove', event => {
      if (!zoomed) return;
      const bounds = single.getBoundingClientRect();
      picture.style.transformOrigin = `${(event.clientX - bounds.left) / bounds.width * 100}% ${(event.clientY - bounds.top) / bounds.height * 100}%`;
    }, { signal });

    const slides = [
      { no: '01', label: 'DEFECT TRACKING', title: 'Panel → defect → record', desc: 'Records every defect with style, batch, and decision. Builds a traceable QA history.' },
      { no: '02', label: 'PRODUCTION CONTROL', title: 'Panel → order → status', desc: 'Links inspection status to ERP/MES. Keeps production on track.' },
      { no: '03', label: 'TQM', title: 'Defect → pattern → action', desc: 'Turns defect data into insights. Helps you fix recurring issues and improve quality over time.' },
    ];
    const diagrams = qa('#dsFrame .ds-svg');
    const dots = qa<HTMLButtonElement>('#dsDots .d');
    let slide = 0;
    function showSlide(index: number) {
      slide = (index + slides.length) % slides.length;
      const data = slides[slide];
      q('#dsNo').textContent = data.no; q('#dsLabel').textContent = data.label;
      q('#dsTitle').textContent = data.title; q('#dsDesc').textContent = data.desc;
      diagrams.forEach((el, i) => { el.classList.toggle('on', i === slide); });
      dots.forEach((el, i) => { el.classList.toggle('active', i === slide); el.setAttribute('aria-pressed', String(i === slide)); });
      q('#dsPrev').classList.add('active'); q('#dsNext').classList.add('active');
    }
    function reserveHeight() {
      if (signal.aborted) return;
      const title = q('#dsTitle'), desc = q('#dsDesc');
      title.style.minHeight = ''; desc.style.minHeight = '';
      let titleHeight = 0, descHeight = 0;
      slides.forEach(data => {
        title.textContent = data.title; desc.textContent = data.desc;
        titleHeight = Math.max(titleHeight, title.offsetHeight); descHeight = Math.max(descHeight, desc.offsetHeight);
      });
      title.style.minHeight = `${titleHeight}px`; desc.style.minHeight = `${descHeight}px`;
      showSlide(slide);
    }
    q('#dsPrev').addEventListener('click', () => showSlide(slide - 1), { signal });
    q('#dsNext').addEventListener('click', () => showSlide(slide + 1), { signal });
    dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i), { signal }));
    window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(reserveHeight, 120); }, { signal });
    document.fonts.ready.then(reserveHeight);
    reserveHeight();

    const dashboardButtons = qa<HTMLButtonElement>('.dashboard .tg[data-view]');
    const views = qa('#dashApp .da-view');
    dashboardButtons.forEach(button => button.addEventListener('click', () => {
      dashboardButtons.forEach(el => { el.classList.toggle('active', el === button); el.setAttribute('aria-pressed', String(el === button)); });
      views.forEach(el => {
        const active = el.dataset.view === button.dataset.view;
        el.classList.toggle('on', active); el.setAttribute('aria-hidden', String(!active));
      });
    }, { signal }));

    // Preserve the reference's unfinished link labels without jumping to nowhere.
    qa<HTMLAnchorElement>('a[href="#"], a[href="#blog"]').forEach(link => {
      link.setAttribute('aria-disabled', 'true'); link.title = 'Coming soon';
      link.addEventListener('click', event => event.preventDefault(), { signal });
    });
    return () => {
      controller.abort(); clearTimeout(closeTimer); clearTimeout(resizeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);
  return null;
}
