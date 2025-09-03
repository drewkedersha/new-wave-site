'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '../lib/ga';

export default function GAListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const path = pathname + (searchParams?.toString() ? `?${searchParams}` : '');
    trackPageView(path);
  }, [pathname, searchParams]);

  return null;
}
