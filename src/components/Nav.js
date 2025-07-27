'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 3000) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="nav">
      <Link href="/" className="logo">
        <Image src="https://i.imgur.com/MvrLXgx.png" alt="The New Wave Logo" width={270} height={32} />
      </Link>

      <div className="hamburger" onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </div>

      {isOpen && (
        <div className="dropdown">
          <Link href="/" onClick={closeMenu}>Home</Link>
          <Link href="/articles" onClick={closeMenu}>Articles</Link>
          <Link href="/contact" onClick={closeMenu}>Contact</Link>
          <Link href="/podcast" onClick={closeMenu}>Podcast</Link>
        </div>
      )}

      <style jsx>{`
        .nav {
          position: sticky;
          top: 0;
          z-index: 999;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: .7rem 2rem;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
        }

        .logo :global(img) {
          height: 32px;
        }

        .links {
          display: flex;
          gap: 1.5rem;
        }

        .links a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          position: relative;
          transition: color 0.2s ease;
        }

        .links a:hover {
          color: #E3FDA6;
        }

        .links a::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 0%;
          height: 2px;
          background-color: #E3FDA6;
          transition: width 0.3s ease;
        }

        .links a:hover::after {
          width: 100%;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
          cursor: pointer;
        }

        .hamburger span {
          width: 24px;
          height: 3px;
          background-color: white;
          border-radius: 2px;
        }

        .dropdown {
          position: absolute;
          top: 100%;
          right: 2rem;
          background: rgba(0, 0, 0, 0.95);
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.3);
          animation: slideDown 0.3s ease;
        }

        .dropdown :global(a) {
          display: block;
          color: white;
          font-weight: bold;
          text-decoration: none;
          margin-bottom: 1rem;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 3000px) {
          .links {
            display: none;
          }
          .hamburger {
            display: flex;
          }
        }
      `}</style>
    </nav>
  );
}
