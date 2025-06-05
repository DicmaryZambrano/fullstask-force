'use client'; //By Pablo, i have to switch use client to server side //
import React, { useState } from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from 'react-icons/fa';
import styles from '@/styles/Footer.module.css';
import FootNav from './FootNav';
import Link from 'next/link';

export default function Footer({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('Subscribed:', { name, email });
    setName('');
    setEmail('');
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.subscribe}>
          <h3 className={styles.title}>Crafted with Heart, Shared With You</h3>
          <h3 className={styles.subtitle}>
            Subscribe for Weekly Drops, Maker Spotlights & More
          </h3>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type='text'
              className={styles.input}
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type='email'
              className={styles.input}
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type='submit' className={styles.button}>
              Sign Up
            </button>
          </form>
        </div>
        <div className={styles.social}>
          <h3 className={styles.subtitle}>Let’s Be Friends!</h3>
          <div className={styles.icons}>
            <Link href='#' aria-label='Facebook'>
              <FaFacebookF />
            </Link>
            <Link href='#' aria-label='Instagram'>
              <FaInstagram />
            </Link>
            <Link href='#' aria-label='Twitter'>
              <FaTwitter />
            </Link>
            <Link href='#' aria-label='LinkedIn'>
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.linkMap}>
        <FootNav categories={categories} />
        {/*<div className={styles.column}>
          <h4>Categories</h4>
          <ul>
            <li>
              <Link href="/">Home & Living</Link>
            </li>
            <li>
              <Link href="/">Jewelry & Accessories</Link>
            </li>
            <li>
              <Link href="/">Clothing & Apparel</Link>
            </li>
            <li>
              <Link href="/">Art & Collectibles</Link>
            </li>
            <li>
              <Link href="/">Toys & Games</Link>
            </li>
          </ul>
        </div>
        */}
        <div className={styles.column}>
          <h4>About</h4>
          <ul>
            <li>
              <Link href='/about'>Our Story</Link>
            </li>
            <li>
              <Link href='/team'>Team</Link>
            </li>
            <li>
              <Link href='/careers'>Careers</Link>
            </li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Profile</h4>
          <ul>
            <li>
              <Link href='/profile'>My Profile</Link>
            </li>
            <li>
              <Link href='/listings'>My Listings</Link>
            </li>
            <li>
              <Link href='/favorites'>My Favorites</Link>
            </li>
            <li>
              <Link href='/cart'>My Cart</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomLine}>
        <p>© {new Date().getFullYear()} Handcrafted Haven. Full Stack Force.</p>
      </div>
    </footer>
  );
}
