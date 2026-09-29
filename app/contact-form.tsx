'use client';

import { useState, type FormEvent } from 'react';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const [state, setState] = useState<SubmitState>('idle');
  const [message, setMessage] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState('sending');
    setMessage('');

    try {
      const data = Object.fromEntries(new FormData(form));
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message || 'The message could not be sent.');

      form.reset();
      setState('success');
      setMessage('Thank you. Your inquiry has been sent to the Cloth Scanner team.');
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'The message could not be sent. Please try again.');
    }
  }

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-grid-overlay" aria-hidden="true" />
      <div className="container contact-layout">
        <div className="contact-intro">
          <p className="eyebrow">CONTACT</p>
          <h2 id="contact-title">Let&apos;s talk about your production line.</h2>
          <p>Tell us where manual inspection is slowing you down. Your message will go directly to the Cloth Scanner team.</p>
          <a className="contact-direct" href="mailto:clothscanner@advanced-ai-lab.com">
            <span>Email us directly</span>
            <strong>clothscanner@advanced-ai-lab.com</strong>
          </a>
        </div>

        <div className="contact-card">
          <form className="contact-form" onSubmit={submit}>
            <div className="contact-field-row">
              <label>
                <span>Name</span>
                <input name="name" type="text" autoComplete="name" maxLength={100} required placeholder="Your full name" />
              </label>
              <label>
                <span>Phone number</span>
                <input name="phone" type="tel" autoComplete="tel" maxLength={40} required placeholder="+880 1XXX XXXXXX" />
              </label>
            </div>
            <label>
              <span>Address</span>
              <textarea name="address" autoComplete="street-address" rows={3} maxLength={300} required placeholder="Factory or office address" />
            </label>
            <label>
              <span>How can we help?</span>
              <textarea name="query" rows={6} maxLength={3000} required placeholder="Tell us about your inspection volume, current process, or questions." />
            </label>
            <label className="contact-honeypot" aria-hidden="true">
              Website
              <input name="website" type="text" tabIndex={-1} autoComplete="off" />
            </label>
            <button className="contact-submit" type="submit" disabled={state === 'sending'}>
              <span>{state === 'sending' ? 'Sending inquiry…' : 'Send inquiry'}</span>
              <span aria-hidden="true">↗</span>
            </button>
            <p className="contact-privacy-note">We use your details to respond to your inquiry. Read our <a href="/privacy">Privacy Statement</a>.</p>
            <p className={`contact-status ${state}`} role="status" aria-live="polite">{message}</p>
          </form>

          <div className="contact-info" aria-label="Contact information">
            <div><span>Company</span><strong>Advanced AI Lab Limited</strong></div>
            <div><span>Phone</span><a href="tel:+8801314996600">+880 1314-996600</a></div>
            <div><span>Email</span><a href="mailto:clothscanner@advanced-ai-lab.com">clothscanner@advanced-ai-lab.com</a></div>
          </div>
        </div>
      </div>
    </section>
  );
}
