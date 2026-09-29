'use client';

import { useEffect, useRef, useState } from 'react';

const links = [
  { href: '#top', label: 'Overview' },
  { href: '#works', label: 'How it works' },
  { href: '#specs', label: 'Specs' },
  { href: '#model', label: 'The model' },
  { href: '#contact', label: 'Contact' },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function closeOnOutsidePress(event: PointerEvent) {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) setOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    function closeOnDesktop() {
      if (window.innerWidth > 960) setOpen(false);
    }
    document.addEventListener('pointerdown', closeOnOutsidePress);
    document.addEventListener('keydown', closeOnEscape);
    window.addEventListener('resize', closeOnDesktop);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePress);
      document.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('resize', closeOnDesktop);
    };
  }, [open]);

  return <div className="mobile-menu" ref={menuRef}>
    <button className="mobile-menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-site-nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(value => !value)}>
      <span aria-hidden="true" className={open ? 'mobile-menu-icon is-open' : 'mobile-menu-icon'}><i /><i /><i /></span>
    </button>
    <nav id="mobile-site-nav" className={open ? 'mobile-menu-panel is-open' : 'mobile-menu-panel'} aria-label="Mobile navigation" aria-hidden={!open} inert={!open}>
      {links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
      <a className="mobile-menu-contact" href="#contact" onClick={() => setOpen(false)}>Talk to Our Team <span aria-hidden="true">↗</span></a>
    </nav>
  </div>;
}
