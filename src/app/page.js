'use client';

import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { sanity } from '../lib/sanity';
import { urlFor } from '../lib/sanity';
import { fetchRSSFeed } from '../lib/fetchRSS';
import Image from 'next/image';

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchContent() {
      const articleData = await sanity.fetch(`*[_type == "post"] | order(publishedAt desc)[0...4]{
        title, slug, excerpt, publishedAt, coverImage
      }`);

      const episodeData = await fetchRSSFeed();
      setArticles(articleData);
      setEpisodes(episodeData.slice(0, 4));
    }
    fetchContent();
  }, []);

  const recentContent = [...articles, ...episodes]
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 8);

  return (
    <>
      <Nav />
      <main>
        <section
          style={{
            padding: '6rem 2rem 4rem',
            textAlign: 'center',
            color: 'white',
            position: 'relative',
          }}
          className="fade-up"
        >
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: '800', letterSpacing: '-1px' }}>THE NEW WAVE</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
            {"A bold space for faith-fueled music and meaningful creativity. Join us as we discover incredible Christian music, dive deep into art that inspires, and discuss God's heart for creativity and depth in a world that needs it."}
          </p>

          <div
            className="fade-up"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1.25rem',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            {[{ name: 'Articles', href: '/articles' }, { name: 'Podcast', href: '/podcast' }, { name: 'Instagram', href: 'https://instagram.com/newwavechristian' }, { name: 'TikTok', href: 'https://tiktok.com/@newwavechristian' }].map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.2s ease, background 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {link.name}
              </a>
            ))}
          </div>
        </section>

        <section className="fade-up" style={{ padding: '4rem 2rem', background: "black" }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', color: 'white', marginBottom: '2rem' }}>What Kind of Artists Do We Cover?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
            {[
              ['\ud83d\udca1 Innovative', 'Once upon a time, Christianity was on the frontlines of creativity. On The New Wave, we want to be intentional to focus on artists that are reclaiming that calling by taking risks in what they say and how they say it.'],
              ['\ud83d\udd25 Inspired', 'In a world where faith-based music can so often feel cheesy, lazy, and uninspired, we are working to highlight artists that break unspoken boundaries, make music that feels alive, and ultimately let the Holy Spirit be their true guide and co-writer.'],
              ['\ud83c\udfaf Intentional', 'Through the noise and chaos of an entertainment world focused on output and content, these artists are willing to be thoughtful about their music, say things with purpose, and care about the impact that their art can have.']
            ].map(([title, desc]) => (
              <div key={title} className="fade-up" style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)' }}>
                <h3 style={{ marginBottom: '0.75rem', color: '#000D24' }}>{title}</h3>
                <p style={{ color: '#444', fontSize: '0.95rem' }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {recentContent.map((item, idx) => {
          const isArticle = item.slug;
          const isEven = idx % 2 === 0;

          return (
            <section key={idx} className="fade-up" style={{ background: isEven ? '#ffffff' : '#000D24', color: isEven ? '#000D24' : 'white', padding: '4rem 2rem' }}>
              <div style={{ display: 'flex', flexDirection: isEven ? 'row' : 'row-reverse', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto', gap: '2rem' }}>
                <div style={{ width: '40%', flexShrink: 0 }}>
                  {item.coverImage && isArticle ? (
                    <Image
                      src={urlFor(item.coverImage).width(400).url()}
                      alt="Cover"
                      width={400}
                      height={250}
                      style={{ borderRadius: '12px', width: '100%', height: 'auto' }}
                      unoptimized
                    />
                  ) : item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={250}
                      style={{ borderRadius: '12px', width: '100%', height: 'auto' }}
                      unoptimized
                    />
                  ) : null}
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.75rem' }}>{item.title}</h3>
                  {item.excerpt ? (
                    <p style={{ margin: '1rem 0', fontSize: '1rem', opacity: 0.85 }}>{item.excerpt}</p>
                  ) : (
                    <div
                      style={{ margin: '1rem 0', fontSize: '1rem', opacity: 0.85 }}
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  )}
                  <a
                    href={isArticle ? `/articles/${item.slug.current}` : item.link}
                    style={{ display: 'inline-block', marginTop: '1rem', background: isEven ? '#0B4BB7' : '#E3FDA6', color: isEven ? 'white' : '#000D24', padding: '0.6rem 1.25rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}
                  >
                    {isArticle ? 'Read Article →' : 'Listen to Episode →'}
                  </a>
                </div>
              </div>
            </section>
          );
        })}

        <section className="fade-up" style={{ padding: '2rem 2rem', background: 'linear-gradient(to bottom right, #0B4BB7, #02E3A7)', display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: 'rgba(0, 0, 0, 0.35)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: '24px', padding: '3rem', maxWidth: '700px', textAlign: 'center', color: 'white', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Want to Get Involved?</h2>
            <p style={{ fontSize: '1rem' }}>
              {"If you're an artist, label, listener, or friend with something to share — we'd love to hear from you. "}
              Hit the <a href="/contact" style={{ color: '#E3FDA6', fontWeight: 'bold' }}>contact page</a> to pitch an idea, ask a question, or partner up.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
