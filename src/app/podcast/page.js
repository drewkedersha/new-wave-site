'use client';

import { useEffect, useState } from 'react';
import Parser from 'rss-parser';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

const parser = new Parser();
const rssUrl = 'https://anchor.fm/s/10757c8a0/podcast/rss';

export default function PodcastPage() {
  const [episodes, setEpisodes] = useState([]);
  const [search, setSearch] = useState('');
  const [gridView, setGridView] = useState(true);

  useEffect(() => {
    async function fetchEpisodes() {
      try {
        const feed = await parser.parseURL(rssUrl);
        setEpisodes(feed.items || []);
      } catch (err) {
        console.error('Error fetching feed:', err);
      }
    }
    fetchEpisodes();
  }, []);

  const filtered = episodes.filter(ep =>
    ep.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Nav />

      {/* Page Wrapper */}
      <main style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto', color: 'white' }}>
        {/* Header */}
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>PODCAST</h1>
        <p style={{ marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
          Interviews, stories, and unfiltered commentary on the future of Christian music —
          from the underground to the breakthrough. Hosted by Drew Kedersha.
        </p>

        {/* Toolbar */}
        <div style={{
          maxWidth: '960px',
          margin: '0 auto 2rem',
          padding: '1.5rem',
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '16px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <input
            type="text"
            placeholder="Search episodes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              flex: '1 1 250px',
              fontSize: '1rem'
            }}
          />

          <div>
            <button
              onClick={() => setGridView(!gridView)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: '#E3FDA6',
                color: '#000D24',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {gridView ? 'List View' : 'Grid View'}
            </button>
          </div>
        </div>

        {/* Episode Grid/List */}
        <div style={{ maxWidth: '960px', margin: '0 auto', paddingBottom: '4rem' }}>
          {filtered.length === 0 ? (
            <p style={{ textAlign: 'center', fontSize: '1rem', color: '#666' }}>
              No episodes found!
            </p>
          ) : (
            <div
              style={{
                display: gridView ? 'grid' : 'block',
                gridTemplateColumns: gridView ? 'repeat(auto-fit, minmax(280px, 1fr))' : 'none',
                gap: '2rem',
              }}
            >
              {filtered.map((ep, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#fff',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                    marginBottom: gridView ? '0' : '2rem',
                  }}
                >
                  <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{ep.title}</h2>
                  <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                    {new Date(ep.pubDate).toLocaleDateString()}
                  </p>
                  <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                    {ep.contentSnippet?.slice(0, 140)}...
                  </p>
                  <iframe
                    src={ep.enclosure?.url || ''}
                    style={{ width: '100%', height: '152px', border: 'none' }}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={`Podcast player for ${ep.title}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
