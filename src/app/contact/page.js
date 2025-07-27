'use client';

import { useState } from 'react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

export default function ContactPage() {
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.target);

    const response = await fetch('https://formspree.io/f/movwbpaz', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData,
    });

    if (response.ok) {
      setStatus('success');
      e.target.reset();
    } else {
      setStatus('error');
    }
  }

  return (
    <>
      <Nav />
      <main style={{ padding: '4rem 6rem', display: 'flex', justifyContent: 'center' }}>
        <div className="form-container fade-up">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Reach Out</h1>
          <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
            Got an artist I need to hear? A podcast idea or theological rabbit hole you want me to chase? Just want to tell me you’re offended by something I said on Instagram? This is your space.
            <br /><br />
            Labels, artists, and collaborators — feel free to reach out for partnerships or submissions too. Let’s build something that lasts.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              style={inputStyle}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              style={inputStyle}
            />
            <select name="category" required style={inputStyle}>
              <option value="">What’s this about?</option>
              <option value="artist-suggestion">Artist Suggestion</option>
              <option value="podcast-idea">Podcast/Article Topic</option>
              <option value="feedback">Feedback (or Offense 😅)</option>
              <option value="partnership">Label/Partnership Inquiry</option>
              <option value="something-else">Something Else</option>
            </select>
            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows="5"
              style={{ ...inputStyle, resize: 'vertical' }}
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                background: '#E3FDA6',
                color: '#000D24',
                fontWeight: 'bold',
                border: 'none',
                padding: '0.75rem',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              {status === 'sending' ? 'Sending...' : 'Send It'}
            </button>
          </form>

          {status === 'success' && (
            <p style={{ marginTop: '1rem', color: '#E3FDA6' }}>Thanks! I’ll be in touch soon.</p>
          )}
          {status === 'error' && (
            <p style={{ marginTop: '1rem', color: 'red' }}>Something went wrong. Please try again.</p>
          )}
        </div>
      </main>
      <Footer />

      {/* Global placeholder and animation styles */}
      <style jsx global>{`
        input::placeholder,
        textarea::placeholder {
          color: rgba(255, 255, 255, 0.85);
        }
        .fade-up {
          opacity: 0;
          transform: translateY(24px);
          animation: fadeUp 0.8s ease-out forwards;
        }
        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

const inputStyle = {
  padding: '0.75rem',
  borderRadius: '8px',
  border: '1px solid rgba(255,255,255,0.3)',
  background: 'rgba(255,255,255,0.15)',
  color: 'white',
  fontSize: '1rem',
  outline: 'none',
};
