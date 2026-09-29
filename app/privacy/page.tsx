import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Statement | Cloth Scanner',
  description: 'How Advanced AI Lab Limited handles information shared through the Cloth Scanner website.',
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <header className="container privacy-nav">
        <Link className="privacy-brand" href="/" aria-label="Cloth Scanner home">
          <Image src="/design-reference/aai-logo-final.svg" alt="Advanced AI Lab" width={190} height={25} />
          <span>Cloth Scanner</span>
        </Link>
        <Link className="privacy-back" href="/">← Back to website</Link>
      </header>

      <article className="container privacy-content">
        <p className="privacy-eyebrow">Your information</p>
        <h1>Privacy Statement</h1>
        <p className="privacy-lead">Here is how Advanced AI Lab Limited handles information you share through the Cloth Scanner website.</p>
        <p className="privacy-date">Last updated 29 September 2026</p>

        <div className="privacy-sections">
          <section aria-labelledby="privacy-collect">
            <h2 id="privacy-collect">What we collect</h2>
            <p>When you contact us, we receive your name, phone number, address, and query. If you email us directly, we also receive your email address and message. Our hosting provider may process technical information, such as your IP address and browser details, to deliver and protect the website.</p>
          </section>
          <section aria-labelledby="privacy-use">
            <h2 id="privacy-use">Why we use it</h2>
            <p>We use your details to respond to your inquiry, discuss your requirements, and follow up on a demonstration or quotation you request. Technical information helps operate and secure the website.</p>
          </section>
          <section aria-labelledby="privacy-share">
            <h2 id="privacy-share">Who handles it</h2>
            <p>Our website is hosted by Vercel. Contact-form submissions are sent through Resend to the Cloth Scanner team at Advanced AI Lab Limited. These providers may process information outside Bangladesh.</p>
          </section>
          <section aria-labelledby="privacy-keep">
            <h2 id="privacy-keep">How long we keep it</h2>
            <p>We keep inquiries as long as reasonably needed to respond and maintain related business correspondence, or longer if required by law.</p>
          </section>
          <section aria-labelledby="privacy-rights">
            <h2 id="privacy-rights">Your choices</h2>
            <p>You may ask to access, correct, or delete your personal information where applicable law allows. To make a request or ask a privacy question, email <a href="mailto:clothscanner@advanced-ai-lab.com">clothscanner@advanced-ai-lab.com</a>.</p>
          </section>
        </div>
      </article>

      <footer className="container privacy-footer">
        <span>© 2026 Advanced AI Lab Limited</span>
        <Link href="/">Return to Cloth Scanner ↗</Link>
      </footer>
    </main>
  );
}
