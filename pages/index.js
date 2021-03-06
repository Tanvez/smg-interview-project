import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Uploader from '../components/uploader';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Uploader />
      </main>

      <footer className={styles.footer}>
        <Link href="/">
          <a>
            Powered by
            <img
              className={styles.footerLogo}
              src="/smolurl.png"
              alt="smol url"
            />
          </a>
        </Link>
      </footer>
    </div>
  );
}
