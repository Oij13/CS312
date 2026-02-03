import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function About({ timestamp }: { timestamp: string }) {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="About page with Server-Side Rendering" />
      </Head>

      <div className={styles.container}>
        <h1 className={styles.title}>About Page</h1>
        
        <p className={styles.description}>
          This page uses Server-Side Rendering (SSR)
        </p>

        <p>Page rendered at: <strong>{timestamp}</strong></p>

        <div className={styles.links}>
          <Link href="/" className={styles.link}>
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      timestamp: new Date().toISOString(),
    },
  };
}