import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import type { Post } from '../api/handler';

export default function Post({ post }: { post: Post }) {
  return (
    <>
      <Head>
        <title>{post.title} | Next.js App</title>
        <meta name="description" content={post.content} />
      </Head>

      <div className={styles.container}>
        <h1 className={styles.title}>{post.title}</h1>
        
        <div className={styles.imageContainer}>
          <Image
            src="/globe.svg"
            alt={post.title}
            width={300}
            height={200}
          />
        </div>

        <p className={styles.description}>{post.content}</p>
        <p className={styles.description}>{post.author}</p>

        <div className={styles.links}>
          <Link href="/" className={styles.link}>
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}

const baseUrl = "http://localhost:3000";

export async function getStaticPaths() {
  const res = await fetch(`${baseUrl}/api/handler`);
  const posts: Post[] = await res.json();

  const paths = posts.map((p) => ({ params: { id: String(p.id) } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await fetch(`${baseUrl}/api/handler`);
  const posts: Post[] = await res.json();

  const post = posts.find((p) => String(p.id) === params.id);

  return {
    props: {
      post,
    },
  };
}