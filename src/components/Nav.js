'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="nav">
      <Link href="/" className="logo">
        <Image
          src="https://i.imgur.com/MvrLXgx.png"
          alt="The New Wave Logo"
          width={270}
          height={32}
        />
      </Link>

      <div className="hamburger" onClick={toggleMenu}>
        {!isOpen ? (
          <div className="lines">
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
          </div>
        ) : (
          <div className="close">✕</div>
        )}
      </div>

      {isOpen && (
        <div className="dropdown">
          <Link href="/" onClick={closeMenu}>Home</Link>
          <Link href="/articles" onClick={closeMenu}>Articles</Link>
          <Link href="/podcast" onClick={closeMenu}>Podcast</Link>
          <Link href="/contact" onClick={closeMenu}>Contact</Link>
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
          padding: 0.75rem 2rem;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
        }

        .hamburger {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          cursor: pointer;
        }

        .lines {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
        }

        .bar {
          width: 24px;
          height: 3px;
          background-color: white;
          border-radius: 2px;
        }

        .close {
          font-size: 1.8rem;
          color: white;
          line-height: 1;
        }

        .dropdown {
          position: absolute;
          top: 100%;
          right: 2rem;
          margin-top: 0.75rem;
          padding: 1.5rem;
          border-radius: 16px;
          background: rgba(0, 0, 0, 0.85); /* ← DARKER */
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          animation: slideDown 0.3s ease;
        }

        .dropdown :global(a) {
          display: block;
          color: white;
          font-weight: bold;
          text-decoration: none;
          margin-bottom: 1rem;
          transition: color 0.2s ease;
        }

        .dropdown :global(a):hover {
          color: #E3FDA6;
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
      `}</style>
    </nav>
  );
}
