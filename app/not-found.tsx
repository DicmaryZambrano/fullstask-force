'use client';

import '@/styles/globals.css'; 
import styles from '@/styles/home/not-found.module.css';
import Link from 'next/link';
import { roboto, katibeh } from '@/components/fonts';

export default function NotFound() {
  return (
    <div className={`${roboto.variable} ${katibeh.variable}`}>
      <svg className={styles.svg} width="380px" height="500px" viewBox="0 0 837 1045" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path className={styles.polygon1} d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z" />
          <path className={styles.polygon2} d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z" />
          <path className={styles.polygon3} d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z" />
          <path className={styles.polygon4} d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z" />
          <path className={styles.polygon5} d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z" />
        </g>
      </svg>

      <div className={styles.messageBox}>
        <h1>404</h1>
        <p>Page not found</p>
        <div className={styles.buttonsCon}>
          <div className={styles.actionLinkWrap}>
            <button onClick={() => history.back()} className={styles.linkButton}>Go Back</button>
            <Link href="/" className={styles.linkButton}>Go to Home Page</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
