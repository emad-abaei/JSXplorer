import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <main className={styles.notFound}>
      <div>
        <span>404</span>
        <span>404</span>
      </div>
      <h2>Page not found</h2>
      <Link to='/' className='cta'>
        back to home
      </Link>
    </main>
  );
}
