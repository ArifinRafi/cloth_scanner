import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = { title: 'How It Works | Cloth Scanner' };

export default function HowItWorks() {
  redirect('/#works');
}
