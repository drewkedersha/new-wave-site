// src/lib/fetchRSS.js
import { parseStringPromise } from 'xml2js';

export async function fetchRSSFeed() {
  const res = await fetch('https://anchor.fm/s/10757c8a0/podcast/rss');
  const xml = await res.text();
  const result = await parseStringPromise(xml);

  const items = result.rss.channel[0].item;

  return items.map((item) => ({
    title: item.title[0],
    link: item.link[0],
    description: item.description[0],
    publishedAt: new Date(item.pubDate?.[0] || Date.now()),
    image:
      item['itunes:image']?.[0]?.['$']?.href ||
      result.rss.channel[0]['itunes:image']?.[0]?.['$']?.href,
  }));
}
