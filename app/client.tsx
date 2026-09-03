'use client';

import dynamic from 'next/dynamic';

const ScannerExperience = dynamic(() => import('./scanner-experience'), {
  ssr: false,
  loading: () => (
    <main className="loading-shell" role="status" aria-live="polite">
      <div className="loading-mark" aria-hidden="true" />
      <p>Preparing the scanner</p>
    </main>
  ),
});

export function ClientOnly() {
  return <ScannerExperience />;
}
