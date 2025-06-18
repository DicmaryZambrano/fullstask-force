
'use client';

import { useState } from 'react';
import { BsFacebook, BsInstagram, BsTwitterX, BsLinkedin } from 'react-icons/bs';
import styles from '@/styles/Footer.module.css';
import FootNav from './FootNav';
import Link from 'next/link';

export default function Footer({ categories }: { categories: { id: number; name: string }[] }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Creamos un objeto FormData y agregamos los datos
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        setStatus('✅ Subscription successful!');
      } else {
        setStatus('❌ Failed to subscribe.');
      }
    } catch (err) {
      setStatus('❌ Error sending subscription.');
      console.error(err);
    }

    // Limpiamos los campos
    setName('');
    setEmail('');
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.subscribe}>
          <h3 className={styles.title}>Crafted with Heart, Shared With You</h3>
          <h3 className={styles.subtitle}>Subscribe for Weekly Drops, Maker Spotlights & More</h3>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              className={styles.input}
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              name="email"
              className={styles.input}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.button}>Sign Up</button>
          </form>
          {status && <p>{status}</p>}
        </div>

        <div className={styles.social}>
          <h3 className={styles.subtitle}>Let’s Be Friends!</h3>
          <div className={styles.icons}>
            <Link href="#" aria-label="Facebook"><BsFacebook /></Link>
            <Link href="#" aria-label="Instagram"><BsInstagram /></Link>
            <Link href="#" aria-label="Twitter"><BsTwitterX /></Link>
            <Link href="#" aria-label="LinkedIn"><BsLinkedin /></Link>
          </div>
        </div>
      </div>

      <div className={styles.linkMap}>
        <FootNav categories={categories} />
        <div className={styles.divider} />
        <div className={styles.column}>
          <h4>About</h4>
          <ul>
            <li><Link href="/about">Our Story</Link></li>
            <li><Link href="/team">Team</Link></li>
            <li><Link href="/careers">Careers</Link></li>
          </ul>
        </div>
        <div className={styles.divider} />
        <div className={styles.column}>
          <h4>Profile</h4>
          <ul>
            <li><Link href="/profile">My Profile</Link></li>
            <li><Link href="/listings">My Listings</Link></li>
            <li><Link href="/favorites">My Favorites</Link></li>
            <li><Link href="/cart">My Cart</Link></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomLine}>
        <p>© {new Date().getFullYear()} Handcrafted Haven. Full Stack Force.</p>
      </div>
    </footer>
  );
}
