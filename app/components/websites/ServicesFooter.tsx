import styles from './ServicesFooter.module.css';

interface Props {
  locale: string;
}

export default function ServicesFooter({ locale }: Props) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>
            maxon<span className={styles.dot}>.</span>
          </span>
          <p className={styles.tagline}>
            Websites that work as hard as you do.
          </p>
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          <a href={`/${locale}`} className={styles.link}>Portfolio</a>
          <a href={`/${locale}/articles`} className={styles.link}>Articles</a>
          <a href="https://www.linkedin.com/in/maxontorres/" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
          <a href="https://github.com/maxontorres" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
        </nav>

        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} Maximiliano Brito Torres &middot; Freelance Web Developer in Vientiane
        </p>
      </div>
    </footer>
  );
}
