// src/lib/fetchRSS.js

export async function fetchRSSFeed() {
  const res = await fetch('https://anchor.fm/s/10757c8a0/podcast/rss');
  const xml = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');
  const items = Array.from(doc.querySelectorAll('item'));

  return items.map((item) => ({
    title: item.querySelector('title')?.textContent,
    link: item.querySelector('link')?.textContent,
    description: item.querySelector('description')?.textContent,
    publishedAt: item.querySelector('pubDate') ? new Date(item.querySelector('pubDate').textContent) : new Date(),
    image: item.querySelector('itunes\\:image')?.getAttribute('href') ||
           doc.querySelector('itunes\\:image')?.getAttribute('href'),
  }));
}
