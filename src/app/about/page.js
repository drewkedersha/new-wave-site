'use client';

import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main
        style={{
          padding: '4rem 2rem',
          background: 'linear-gradient(to bottom right, #0B4BB7, #02E3A7, #E3FDA6)',
          color: 'white',
        }}
      >
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <section
            className="fade-up"
            style={{
              padding: '3rem',
              borderRadius: '24px',
              background: 'rgba(0, 0, 0, 0.35)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              marginBottom: '3rem',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
              textAlign: 'center',
            }}
          >
            <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>What Is The New Wave?</h1>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
              The New Wave is a creative project spotlighting what God is doing in the margins of the music world.
              We tell stories, interview artists, write commentary, and build tools that help you discover the most honest,
              excellent, and spiritually awake sounds coming out of this generation.
            </p>
          </section>

          <section className="fade-up" style={sectionStyle}>
            <h2 style={headingStyle}>Who Runs This Thing?</h2>
            <p style={textStyle}>
              {"I'm Drew — a songwriter based in Nashville with a deep love for art that’s both theologically grounded and creatively disruptive."}
              {"I started The New Wave because I think Christian music deserves better: not safer, not cheesier, but truer and more alive."}
              {"I care about the sacred and the strange. I live for late-night living room jam sessions, road trips with Buc-ee’s pit stops,"}
              {"and those weird moments when a song feels like it’s reading your soul."}
            </p>
          </section>

          <section className="fade-up" style={{ marginBottom: '3rem' }}>
            <h2 style={headingStyle}>What Kind of Music Do We Cover?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              <div style={musicBoxStyle}>
                <h3 style={bubbleHeading}>💡 Innovative</h3>
                <p style={bubbleText}>
                  We highlight artists who take risks — with sound, lyrics, and form. These are creators making music that surprises, stretches, and stirs the soul.
                </p>
              </div>
              <div style={musicBoxStyle}>
                <h3 style={bubbleHeading}>🛠 Independent</h3>
                <p style={bubbleText}>
                  Whether signed or not, these artists move with the spirit of independence. They build their own lanes and stay true to their convictions.
                </p>
              </div>
              <div style={musicBoxStyle}>
                <h3 style={bubbleHeading}>🔥 Inspired</h3>
                <p style={bubbleText}>
                  The music we feature feels alive — sparked by faith, wrestling, wonder, and holy discontent. It’s not industry filler. It’s born from something deeper.
                </p>
              </div>
              <div style={musicBoxStyle}>
                <h3 style={bubbleHeading}>🎯 Intentional</h3>
                <p style={bubbleText}>
                  Every sound, lyric, and detail is crafted with care. These artists are less concerned with going viral and more concerned with telling the truth.
                </p>
              </div>
            </div>
          </section>


          <section className="fade-up" style={sectionStyle}>
            <h2 style={headingStyle}>Want to Get Involved?</h2>
            <p style={textStyle}>
              If you’re an artist, label, writer, or listener with something to share — we want to hear from you.
              Hit the <a href="/contact" style={linkStyle}>contact page</a> to pitch an idea, ask a question, or partner up.
            </p>
          </section>

          <section className="fade-up" style={newsletterSectionStyle}>
            <h2 style={{ color: 'white' }}>Subscribe to The New Wave Newsletter</h2>
            <p style={{ color: 'white', marginBottom: '1rem' }}>
              Sign up for early drops, articles, and the latest conversations in Christian music.
            </p>
            <form
              action="https://newwavechristian.substack.com/subscribe"
              method="post"
              target="_blank"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}
            >
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: 'none',
                  minWidth: '200px',
                  fontSize: '0.95rem',
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#E3FDA6',
                  color: '#000D24',
                  fontWeight: 'bold',
                  border: 'none',
                  padding: '0.75rem 1.2rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Subscribe
              </button>
            </form>
          </section>
        </div>
      </main>

      <Footer />

      {/* Animations */}
      <style jsx>{`
        .fade-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 1s ease-out forwards;
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

const sectionStyle = {
  marginBottom: '3rem',
  padding: '2rem',
  background: 'rgba(0,0,0,0.25)',
  borderRadius: '16px',
  backdropFilter: 'blur(10px)',
};

const newsletterSectionStyle = {
  marginBottom: '4rem',
  padding: '2rem',
  background: 'rgba(255,255,255,0.05)',
  borderRadius: '20px',
  backdropFilter: 'blur(12px)',
  textAlign: 'center',
};

const headingStyle = {
  fontSize: '1.8rem',
  marginBottom: '1rem',
};

const textStyle = {
  fontSize: '1rem',
  lineHeight: '1.7',
};

const linkStyle = {
  color: '#E3FDA6',
  textDecoration: 'underline',
};

const musicBoxStyle = {
  background: 'white',
  color: '#000D24',
  borderRadius: '16px',
  padding: '1.5rem',
  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
  textAlign: 'left',
};

const bubbleHeading = {
  fontSize: '1.2rem',
  marginBottom: '0.5rem',
};

const bubbleText = {
  fontSize: '0.95rem',
  lineHeight: '1.6',
};

