'use client';

import { useEffect, useState } from 'react';
import { sanity } from '../../lib/sanity';
import Link from 'next/link';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

export default function ArticlesPage() {
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [gridView, setGridView] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const data = await sanity.fetch(`
        *[_type == "post"] | order(publishedAt desc) {
          title,
          slug,
          excerpt,
          publishedAt,
          author->{name},
          categories[]->{title},
          tags
        }
      `);
      setPosts(data);
    }
    fetchPosts();
  }, []);

  const allCategories = ['All', ...new Set(posts.flatMap(post => post.categories?.map(c => c.title) || []))];

  const filteredPosts = posts
    .filter(post =>
      selectedCategory === 'All' ||
      post.categories?.some(c => c.title === selectedCategory)
    )
    .filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1, visibleCount);

  return (
    <>
      <Nav />
      <main style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto', color: 'white' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>ARTICLES</h1>
        <p style={{ marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
          Longform thoughts, artist interviews, New Music Friday roundups, and cultural commentary from The New Wave.
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
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              flex: '1 1 250px',
              fontSize: '1rem'
            }}
          />

          <div style={{ marginBottom: '0rem' }}>
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

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setVisibleCount(6);
              }}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: '1px solid white',
                background: selectedCategory === cat ? '#E3FDA6' : 'transparent',
                color: selectedCategory === cat ? '#000D24' : 'white',
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div
            style={{
              marginBottom: '3rem',
              padding: '2rem',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
              color: '#000D24',
            }}
          >
            <div style={{ fontSize: '0.8rem', color: '#555' }}>
              Featured · {new Date(featuredPost.publishedAt).toLocaleDateString()} · by {featuredPost.author?.name}
            </div>
            <h2 style={{ fontSize: '1.6rem', marginTop: '0.5rem' }}>{featuredPost.title}</h2>
            <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>{featuredPost.excerpt}</p>
            <Link href={`/articles/${featuredPost.slug.current}`} style={{ fontWeight: 'bold', display: 'inline-block', marginTop: '0.5rem' }}>
              Read More →
            </Link>
          </div>
        )}

        {/* Articles List */}
        <div
          style={{
            display: 'grid',
            gap: '2rem',
            gridTemplateColumns: gridView ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr',
          }}
        >
          {remainingPosts.map(post => (
            <div key={post.slug.current} className="card fade-up">
              <div style={{ fontSize: '0.8rem', color: '#888' }}>
                Posted {new Date(post.publishedAt).toLocaleDateString()} · by {post.author?.name}
              </div>
              <h3 style={{ fontSize: '1.2rem', marginTop: '0.5rem', color: '#000D24' }}>{post.title}</h3>
              <p style={{ fontSize: '1rem', color: '#333' }}>{post.excerpt}</p>
              {post.tags?.length > 0 && (
                <span
                  style={{
                    background: '#E3FDA6',
                    color: '#000D24',
                    borderRadius: '6px',
                    padding: '0.25rem 0.75rem',
                    fontSize: '0.8rem',
                    marginTop: '0.5rem',
                    display: 'inline-block',
                  }}
                >
                  #{post.tags[0]}
                </span>
              )}
              <Link href={`/articles/${post.slug.current}`} style={{ display: 'inline-block', marginTop: '0.75rem', fontWeight: 'bold', color: '#000D24' }}>
                Read More →
              </Link>
            </div>
          ))}
        </div>

        {/* Load More */}
        {visibleCount < filteredPosts.length && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              onClick={() => setVisibleCount(visibleCount + 6)}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#E3FDA6',
                color: '#000D24',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Load More
            </button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div style={newsletterStyle} className="fade-up">
          <h2 style={{ color: 'white' }}>Want These in Your Inbox?</h2>
          <p style={{ color: 'white' }}>Sign up for articles, updates, and new music suggestions straight to your inbox.</p>
          <form action="https://newwavechristian.substack.com/subscribe" method="post" target="_blank" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              style={{
                flex: 1,
                minWidth: '180px',
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.9rem',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '0.5rem 1rem',
                background: '#E3FDA6',
                color: '#000D24',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Sign Up
            </button>
          </form>
        </div>
      </main>

      <Footer />

      {/* Animation + Hover */}
      <style jsx global>{`
        .fade-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.6s ease-out forwards;
        }
        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
      `}</style>
    </>
  );
}

const newsletterStyle = {
  marginTop: '4rem',
  padding: '2rem',
  background: 'rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderRadius: '20px',
  textAlign: 'center',
  boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
};
