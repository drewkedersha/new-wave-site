'use client';

import { useEffect } from 'react';
import { isOutbound, trackEvent } from '../lib/ga';

export default function GAEvents() {
  useEffect(() => {
    function onClick(e) {
      const target = e.target;
      const link = target?.closest?.('a');
      if (link && link.href && isOutbound(link.href)) {
        trackEvent('click_outbound', {
          link_url: link.href,
          link_text: link.textContent || '',
          location: window.location.pathname,
        });
      }
    }

    function onSubmit(e) {
      const form = e.target;
      const tag = form?.getAttribute?.('data-ga-event');
      if (tag) {
        trackEvent(tag, {
          location: window.location.pathname,
          form_action: form.action || '',
        });
      }
    }

    document.addEventListener('click', onClick, true);
    document.addEventListener('submit', onSubmit, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('submit', onSubmit, true);
    };
  }, []);

  return null;
}
