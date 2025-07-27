'use client';

import { PortableText } from '@portabletext/react';

const components = {
  types: {},
  marks: {
    link: ({ children, value }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: '#02E3A7',
          textDecoration: 'underline',
          fontWeight: 'bold',
        }}
      >
        {children}
      </a>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{children}</h2>
    ),
    normal: ({ children }) => (
      <p style={{ marginBottom: '1rem', lineHeight: '1.6', color: '#333' }}>
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', listStyle: 'disc' }}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol style={{ paddingLeft: '1.5rem', marginBottom: '1rem', listStyle: 'decimal' }}>
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
