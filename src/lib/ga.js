export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export function gtag(...args) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  }
}

export function trackPageView(path) {
  if (!GA_ID) return;
  gtag('event', 'page_view', { page_path: path });
}

export function trackEvent(action, params = {}) {
  if (!GA_ID) return;
  gtag('event', action, params);
}

export function isOutbound(href) {
  try {
    const url = new URL(href, window.location.href);
    return url.origin !== window.location.origin;
  } catch {
    return false;
  }
}
