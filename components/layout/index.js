import Link from 'next/link';
import styles from '../../styles/Home.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>{children}</main>

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
