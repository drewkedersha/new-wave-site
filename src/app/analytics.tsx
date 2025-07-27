'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const GA_MEASUREMENT_ID = 'G-2J5PW3JFHH';

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const page_path = pathname + (searchParams?.toString() ? `?${searchParams}` : '');
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path,
      });
    }
  }, [pathname, searchParams]);

  return null;
}
