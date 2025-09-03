'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '../lib/ga';

export default function GAListener() {
  const pathname = usePathname();

  useEffect(() => {
    // Read the query string directly from the browser (client-only),
    // avoids useSearchParams so SSR/prerender never touch it.
    const search = typeof window !== 'undefined' ? window.location.search : '';
    const path = pathname + search;
    trackPageView(path);
  }, [pathname]);

  return null;
}
