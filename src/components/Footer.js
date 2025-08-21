'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: 'rgba(0, 0, 0, 0.6)', color: 'white', padding: '3rem 2rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto', gap: '2rem', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <Image src="https://i.imgur.com/MvrLXgx.png" alt="The New Wave Logo" width={220} height={28} style={{ marginBottom: '1rem' }} />
          <p style={{ fontSize: '0.8rem', color: '#ccc' }}>
            © 2025 The New Wave<br />All rights reserved.
          </p>
        </div>

        <div style={{ flex: 2, minWidth: '250px' }}>
          <div style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.9rem' }}>
            <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
            <Link href="/articles" style={{ color: 'white', textDecoration: 'none' }}>Articles</Link>
            <Link href="/podcast" style={{ color: 'white', textDecoration: 'none' }}>Podcast</Link>
            <Link href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <a href="https://instagram.com/newwavechristian" target="_blank" rel="noopener noreferrer" style={{ marginRight: '0.75rem' }}>
              <Image src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" width={20} height={20} style={{ filter: 'invert(1)' }} />
            </a>
            <a href="https://tiktok.com/@newwavechristian" target="_blank" rel="noopener noreferrer" style={{ marginRight: '0.75rem' }}>
              <Image src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg" alt="TikTok" width={20} height={20} style={{ filter: 'invert(1)' }} />
            </a>
            <a href="https://open.spotify.com/user/31g36r36va3cbwxro2o3drcnvtky?si=f4256c4277384599" target="_blank" rel="noopener noreferrer">
              <Image src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/spotify.svg" alt="Spotify" width={20} height={20} style={{ filter: 'invert(1)' }} />
            </a>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            padding: '1rem',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            maxWidth: '400px',
          }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Sign up for future newsletters & important updates
            </p>
            <form action="https://newwavechristian.substack.com/subscribe" method="post" target="_blank" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                style={{
                  flex: 1,
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '0.9rem',
                  minWidth: '160px',
                }}
              />
              <button type="submit" style={{
                padding: '0.5rem 1rem',
                background: '#E3FDA6',
                color: '#000D24',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
