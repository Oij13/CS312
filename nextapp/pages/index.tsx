import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import {Post}  from "./api/handler";

export default function Home({ posts }: { posts: Post[]}) {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name={styles.description} content="Next.js App"/>
      </Head>

      <div className={styles.container}>
        <h1 className={styles.title}>Welcome</h1>
        <div className={styles.imageContainer}>
          <Image 
            src="/next.svg"
            alt="Sample"
            width={400}
            height={300}
            priority/>
        </div>

        <p className={styles.description}>
          This page uses Static Site Generation (SSG)
        </p>

        <div className={styles.links}>
          <Link href="/about" className={styles.link}>
            Go to About Page (SSR)
          </Link>
        </div>

        <h2 className={styles.description}>Recent Posts</h2>
        <ul className={styles.postList}>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`} className={styles.link}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = [
    { id: 1, title: 'First Post'},
    { id: 2, title: 'Second Post'},
    { id: 3, title: 'Third Post'},
  ]
  return  {
    props: {
      posts,
    }
  }
}
