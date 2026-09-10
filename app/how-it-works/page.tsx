import type { Metadata } from 'next';
import { ClientOnly } from '../client';

export const metadata: Metadata = { title: 'How It Works | Cloth Scanner' };

export default function HowItWorks() {
  return <ClientOnly />;
}
