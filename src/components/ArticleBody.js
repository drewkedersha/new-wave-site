'use client';

import { PortableText } from '@portabletext/react';

const components = {
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href || '#'}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#0B4BB7', textDecoration: 'underline', fontWeight: 600 }}
      >
        {children}
      </a>
    ),
  },
  block: {
    // Responsive, dark text (prevents white-on-white)
    h1: ({ children }) => (
      <h1
        style={{
          color: '#000D24',
          fontSize: 'clamp(1.4rem, 2.4vw + 1rem, 2rem)',
          lineHeight: 1.15,
          fontWeight: 800,
          margin: '1.1rem 0 0.6rem',
        }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        style={{
          color: '#000D24',
          fontSize: 'clamp(1.25rem, 1.8vw + 0.9rem, 1.5rem)',
          fontWeight: 800,
          lineHeight: 1.2,
          margin: '1rem 0 0.5rem',
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        style={{
          color: '#000D24',
          fontSize: 'clamp(1.1rem, 1.2vw + 0.8rem, 1.25rem)',
          fontWeight: 700,
          margin: '0.85rem 0 0.4rem',
        }}
      >
        {children}
      </h3>
    ),
    // Use blockquote in Sanity for lyrics/quotes
    blockquote: ({ children }) => (
      <div
        style={{
          background: '#F6FBEC',
          borderLeft: '4px solid #02E3A7',
          padding: '0.9rem 1rem',
          margin: '1rem 0',
          fontStyle: 'italic',
          whiteSpace: 'pre-wrap',
          color: '#374151',
          borderRadius: 10,
        }}
      >
        {children}
      </div>
    ),
    normal: ({ children }) => (
      <p style={{ margin: '0.75rem 0', lineHeight: 1.7, color: '#1f2937' }}>{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', listStyle: 'disc', color: '#1f2937' }}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol style={{ paddingLeft: '1.25rem', margin: '0.75rem 0', listStyle: 'decimal', color: '#1f2937' }}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li style={{ marginBottom: '0.5rem' }}>{children}</li>,
    number: ({ children }) => <li style={{ marginBottom: '0.5rem' }}>{children}</li>,
  },
};

export default function ArticleBody({ content }) {
  return (
    <div style={{ marginTop: '1rem' }}>
      <PortableText value={content} components={components} />
    </div>
  );
}
