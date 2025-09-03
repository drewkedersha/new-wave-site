// src/app/articles/[slug]/page.js
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Script from 'next/script';

import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';
import ArticleBody from '../../../components/ArticleBody';
import { sanity } from '../../../lib/sanity';
import { urlFor } from '../../../lib/sanity';

// Revalidate occasionally so published posts show up
export const revalidate = 600;

export default async function ArticlePage({ params }) {
  // Fetch the post + suggested (exclude drafts/empties; prefer same-category but fall back if none)
  const { post, suggestedPrimary, suggestedFallback } = await sanity.fetch(
    `{
      "post": *[
        _type == "post" &&
        slug.current == $slug &&
        !(_id in path("drafts.**"))
      ][0]{
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

      // Same-category suggestions
      "suggestedPrimary": *[
        _type == "post" &&
        defined(slug.current) &&
        defined(publishedAt) &&
        !(_id in path("drafts.**")) &&
        slug.current != $slug &&
        count(categories[@._ref in *[_type == "post" && slug.current == $slug][0].categories[]._id]) > 0
      ] | order(publishedAt desc)[0...6]{
        title,
        slug,
        publishedAt,
        excerpt,
        coverImage
      },

      // Fallback suggestions if no category overlap
      "suggestedFallback": *[
        _type == "post" &&
        defined(slug.current) &&
        defined(publishedAt) &&
        !(_id in path("drafts.**")) &&
        slug.current != $slug
      ] | order(publishedAt desc)[0...6]{
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
    notFound();
  }

  const suggested =
    (suggestedPrimary?.length ? suggestedPrimary : suggestedFallback || []).slice(0, 3);

  // ---- JSON-LD Article schema (SEO) ----
  const canonicalUrl = `https://www.newwavechristian.org/articles/${post.slug?.current}`;
  const ogImage =
    post.coverImage ? urlFor(post.coverImage).width(1200).height(630).url() : undefined;

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.publishedAt || undefined,
    author: post.author?.name ? { '@type': 'Person', name: post.author.name } : undefined,
    image: ogImage ? [ogImage] : undefined,
    publisher: { '@type': 'Organization', name: 'The New Wave' },
    mainEntityOfPage: canonicalUrl,
  };

  return (
    <>
      {/* JSON-LD goes in head via Next Script */}
      <Script
        id="article-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />

      <Nav />

      <div
        style={{
          padding: '3rem 1rem',
          background: 'linear-gradient(to bottom right, #0B4BB7, #02E3A7, #E3FDA6)',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: 'clamp(1.25rem, 2vw, 3rem)',
            maxWidth: '860px',
            margin: '0 auto',
            boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
            lineHeight: 1.7,
          }}
        >
          {/* Cover Image: fixed aspect ratio so text on the image stays readable */}
          {post.coverImage && (
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '1rem',
              }}
            >
              <Image
                src={urlFor(post.coverImage).width(1600).url()}
                alt="Post Cover"
                fill
                sizes="(max-width: 900px) 100vw, 900px"
                style={{ objectFit: 'cover' }}
                priority
                unoptimized
              />
            </div>
          )}

          {/* Metadata */}
          <div
            style={{
              fontSize: '0.9rem',
              color: '#555',
              marginBottom: '0.75rem',
              display: 'flex',
              gap: '.5rem',
              flexWrap: 'wrap',
            }}
          >
            {post.author?.name && (
              <span>
                By <strong>{post.author.name}</strong>
              </span>
            )}
            {post.publishedAt && <span>· {new Date(post.publishedAt).toLocaleDateString()}</span>}
            {post.categories?.length ? (
              <span>· {post.categories.map((cat) => cat.title).join(', ')}</span>
            ) : null}
          </div>

          {/* Title (responsive, no overflow on mobile) */}
          <h1
            style={{
              fontSize: 'clamp(1.6rem, 3.2vw + 1rem, 2.2rem)',
              lineHeight: 1.15,
              margin: '0 0 0.75rem',
              color: '#000D24',
              wordWrap: 'break-word',
              overflowWrap: 'anywhere',
            }}
          >
            {post.title}
          </h1>

          {/* Optional excerpt just under title if you ever want it visible */}
          {post.excerpt && (
            <p
              style={{
                margin: '0 0 1rem',
                color: '#334155',
                fontSize: '1rem',
                lineHeight: 1.6,
              }}
            >
              {post.excerpt}
            </p>
          )}

          {/* Article Body */}
          <ArticleBody content={post.body} />

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div style={{ marginTop: '1.75rem', fontSize: '0.9rem' }}>
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

          {/* Author */}
          {post.author?.bio && (
            <div
              style={{
                marginTop: '2rem',
                borderTop: '1px solid #ddd',
                paddingTop: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              {post.author.image && (
                <Image
                  src={urlFor(post.author.image).width(128).height(128).url()}
                  alt={post.author.name}
                  width={64}
                  height={64}
                  style={{ borderRadius: '50%' }}
                  unoptimized
                />
              )}
              <div>
                <p style={{ fontWeight: 700, marginBottom: '0.25rem', color: '#000D24' }}>
                  {post.author.name}
                </p>
                <ArticleBody content={post.author.bio} />
              </div>
            </div>
          )}
        </div>

        {/* Suggested */}
        {suggested.length > 0 && (
          <div style={{ marginTop: '5rem', maxWidth: '960px', marginInline: 'auto' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '1.25rem', color: '#000D24' }}>
              You Might Also Like
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
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
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }}
                  >
                    {item.coverImage && (
                      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9' }}>
                        <Image
                          src={urlFor(item.coverImage).width(800).height(450).url()}
                          alt={item.title}
                          fill
                          sizes="(max-width: 900px) 100vw, 400px"
                          style={{ objectFit: 'cover' }}
                          unoptimized
                        />
                      </div>
                    )}
                    <div style={{ padding: '1rem', flexGrow: 1 }}>
                      <p style={{ fontSize: '0.8rem', color: '#777', marginBottom: '0.4rem' }}>
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

// Page-level metadata for SEO/social
export async function generateMetadata({ params }) {
  const data = await sanity.fetch(
    `*[_type=="post" && slug.current==$slug][0]{ title, excerpt, "slug": slug.current, coverImage }`,
    { slug: params.slug }
  );

  if (!data) return {};

  const url = `https://www.newwavechristian.org/articles/${data.slug}`;
  const ogImage = data.coverImage
    ? urlFor(data.coverImage).width(1200).height(630).url()
    : '/og-image.png';

  return {
    title: data.title,
    description: data.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: data.title,
      description: data.excerpt,
      url,
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630 }],
      siteName: 'The New Wave',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.excerpt,
      images: [ogImage],
    },
  };
}
