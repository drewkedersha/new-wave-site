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
    h1: ({ children }) => (
      <h1 style={{ color: '#000D24', fontSize: '2rem', margin: '0 0 1rem' }}>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ color: '#000D24', fontSize: '1.5rem', margin: '1.25rem 0 0.75rem' }}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ color: '#000D24', fontSize: '1.25rem', margin: '1rem 0 0.5rem' }}>{children}</h3>
    ),
    blockquote: ({ children }) => (
      <div style={{
        background: '#f5f9ff',
        borderLeft: '4px solid #0B4BB7',
        padding: '1rem 1.25rem',
        margin: '1rem 0',
        fontStyle: 'italic',
        whiteSpace: 'pre-wrap',
        color: '#0f172a'
      }}>
        {children}
      </div>
    ),
    normal: ({ children }) => (
      <p style={{ margin: '0 0 1rem', lineHeight: 1.7, color: '#1f2937' }}>{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul style={{ paddingLeft: '1.25rem', margin: '0 0 1rem', listStyle: 'disc', color: '#1f2937' }}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol style={{ paddingLeft: '1.25rem', margin: '0 0 1rem', listStyle: 'decimal', color: '#1f2937' }}>
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
    <div style={{ marginTop: '2rem' }}>
      <PortableText value={content} components={components} />
    </div>
  );
}
