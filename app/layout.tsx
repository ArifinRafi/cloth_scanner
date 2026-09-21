import type { Metadata } from 'next';
import './reference.css';
import './reference-animations.css';
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  : new URL('http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: 'Cloth Scanner',
  title: 'Cloth Scanner | AI Cut Panel Inspection for RMG Industries',
  description: 'Meet the AI-based cut panel inspection robot for RMG industries. Precision handling, dual-view imaging, and intelligent cloth inspection.',
  openGraph: {
    type: 'website',
    siteName: 'Cloth Scanner',
    title: 'Cloth Scanner | AI Cut Panel Inspection for RMG Industries',
    description: 'Precision handling, dual-view imaging, and intelligent cloth inspection for RMG industries.',
    images: [{ url: '/og.png?v=cloth-scanner', width: 1200, height: 630, alt: 'Cloth Scanner — from fabric to verified quality' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cloth Scanner | AI Cut Panel Inspection for RMG Industries',
    description: 'Precision handling, dual-view imaging, and intelligent cloth inspection for RMG industries.',
    images: ['/og.png?v=cloth-scanner'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
