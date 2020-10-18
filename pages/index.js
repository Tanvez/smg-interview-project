import Head from 'next/head';
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
        <a
          href="https://www.vesnatan.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by {'VT'}
          <img src="" alt="" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
