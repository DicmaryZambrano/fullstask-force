"use client"; //By Pablo, i have to switch use client to server side //
import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import styles from "../styles/Footer.module.css";
import FootNav from "./FootNav"

export default function Footer({ categories }: { categories: { id: number; name: string }[] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Subscribed:", { name, email });
    setName("");
    setEmail("");
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
              type="text"
              className={styles.input}
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              className={styles.input}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.button}>
              Sign Up
            </button>
          </form>
        </div>
        <div className={styles.social}>
          <h3 className={styles.subtitle}>Let’s Be Friends!</h3>
          <div className={styles.icons}>
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.linkMap}>
        <FootNav categories={categories}/>
        {/*<div className={styles.column}>
          <h4>Categories</h4>
          <ul>
            <li>
              <a href="/">Home & Living</a>
            </li>
            <li>
              <a href="/">Jewelry & Accessories</a>
            </li>
            <li>
              <a href="/">Clothing & Apparel</a>
            </li>
            <li>
              <a href="/">Art & Collectibles</a>
            </li>
            <li>
              <a href="/">Toys & Games</a>
            </li>
          </ul>
        </div>
        */}
        <div className={styles.column}>
          <h4>About</h4>
          <ul>
            <li>
              <a href="/about">Our Story</a>
            </li>
            <li>
              <a href="/team">Team</a>
            </li>
            <li>
              <a href="/careers">Careers</a>
            </li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Profile</h4>
          <ul>
            <li>
              <a href="/profile">My Profile</a>
            </li>
            <li>
              <a href="/listings">My Listings</a>
            </li>
            <li>
              <a href="/favorites">My Favorites</a>
            </li>
            <li>
              <a href="/cart">My Cart</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomLine}>
        <p>
          © {new Date().getFullYear()} Handcrafted Haven. Full Stack Force.
        </p>
      </div>
    </footer>
  );
}
