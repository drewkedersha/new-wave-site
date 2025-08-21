// src/app/articles/[slug]/page.js
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';
import ArticleBody from '../../../components/ArticleBody';
import { sanity } from '../../../lib/sanity';
import { urlFor } from '../../../lib/sanity';

export default async function ArticlePage({ params }) {
  // Fetch the post + suggested posts
  const { post, suggested } = await sanity.fetch(
    `{
      "post": *[_type == "post" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        body,
        tags,
        categories[]->{ _id, title },
        coverImage,
        author->{ name, bio, image }
      },
      "suggested": *[
        _type == "post"
        && defined(slug.current)
        && defined(publishedAt)
        && !(_id in path("drafts.**"))
        && slug.current != $slug
        && count(categories[@._ref in *[_type == "post" && slug.current == $slug][0].categories[]._id]) > 0
      ] | order(publishedAt desc)[0...3]{
        title,
        slug,
        publishedAt,
        excerpt,
        coverImage
      }
    }`,
    { slug: params.slug }
  );

  if (!post) {
    // Use Next.js notFound() so your /_not-found page shows
    notFound();
  }

  return (
    <>
      <Nav />
      <div style={{ padding: '3rem 2rem', background: 'linear-gradient(to bottom right, #0B4BB7, #02E3A7, #E3FDA6)' }}>
        <div
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '3rem',
            maxWidth: '860px',
            margin: '0 auto',
            boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
            lineHeight: '1.7',
          }}
        >
          {/* Cover Image */}
          {post.coverImage && (
            <Image
              src={urlFor(post.coverImage).width(1200).url()}
              alt="Post Cover"
              width={1200}
              height={600}
              style={{
                borderRadius: '16px',
                width: '100%',
                maxHeight: '480px',
                objectFit: 'cover',
                marginBottom: '2rem',
              }}
              priority
              unoptimized
            />
          )}

          {/* Metadata */}
          <div style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem' }}>
            <span>
              By <strong>{post.author?.name}</strong> ·{' '}
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''} ·{' '}
              {post.categories?.map((cat) => cat.title).join(', ')}
            </span>
          </div>

          {/* Title + Excerpt (force dark text) */}
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem', color: '#000D24' }}>
            {post.title}
          </h1>

          {/* Article Body (PortableText with dark-safe styles) */}
          <ArticleBody content={post.body} />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
              <strong>Tags:</strong>{' '}
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: '#E3FDA6',
                    color: '#000D24',
                    borderRadius: '8px',
                    padding: '0.25rem 0.75rem',
                    marginRight: '0.5rem',
                    display: 'inline-block',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author Block */}
          {post.author?.bio && (
            <div
              style={{
                marginTop: '3rem',
                borderTop: '1px solid #ddd',
                paddingTop: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              {post.author.image && (
                <Image
                  src={urlFor(post.author.image).width(64).height(64).url()}
                  alt={post.author.name}
                  width={64}
                  height={64}
                  style={{ borderRadius: '50%' }}
                  unoptimized
                />
              )}
              <div>
                <p style={{ fontWeight: 'bold', marginBottom: '0.25rem', color: '#000D24' }}>
                  {post.author.name}
                </p>
                <ArticleBody content={post.author.bio} />
              </div>
            </div>
          )}
        </div>

        {/* Suggested Articles */}
        {suggested && suggested.length > 0 && (
          <div style={{ marginTop: '5rem', maxWidth: '960px', marginInline: 'auto' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#000D24' }}>
              You Might Also Like
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.75rem',
              }}
            >
              {suggested.map((item) => (
                <Link
                  href={`/articles/${item.slug.current}`}
                  key={item.slug.current}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={{
                      background: '#fff',
                      borderRadius: '16px',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
                      transition: 'all 0.2s ease-in-out',
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {item.coverImage && (
                      <Image
                        src={urlFor(item.coverImage).width(800).height(400).url()}
                        alt={item.title}
                        width={800}
                        height={400}
                        style={{
                          width: '100%',
                          height: '180px',
                          objectFit: 'cover',
                          transition: 'transform 0.3s',
                        }}
                        unoptimized
                      />
                    )}
                    <div style={{ padding: '1rem', flexGrow: 1 }}>
                      <p style={{ fontSize: '0.8rem', color: '#777' }}>
                        {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : ''}
                      </p>
                      <h3 style={{ fontSize: '1.1rem', color: '#000D24', margin: '0.5rem 0' }}>
                        {item.title}
                      </h3>
                      {item.excerpt && (
                        <p style={{ fontSize: '0.9rem', color: '#444' }}>{item.excerpt}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
