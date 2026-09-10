import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WeaveScan | AI Cloth Scanner for RMG Industries',
  description: 'Meet the AI-based cut panel inspection robot for RMG industries. Precision handling, dual-view imaging, and intelligent cloth inspection.',
  openGraph: {
    title: 'WeaveScan | AI Cloth Scanner for RMG Industries',
    description: 'Precision handling, dual-view imaging, and intelligent cloth inspection for RMG industries.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WeaveScan | AI Cloth Scanner for RMG Industries',
    description: 'Precision handling, dual-view imaging, and intelligent cloth inspection for RMG industries.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
