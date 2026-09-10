import type { Metadata } from 'next';
import { ClientOnly } from '../client';

export const metadata: Metadata = { title: 'How It Works | WeaveScan' };

export default function HowItWorks() {
  return <ClientOnly />;
}
