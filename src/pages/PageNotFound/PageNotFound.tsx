import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <main className={styles.notFound}>
      <h1>
        <span>404</span>
        <span>404</span>
      </h1>
      <h2>Page not found</h2>
      <Link to='/' className='cta' aria-label='Go back to the homepage'>
        back to home
      </Link>
    </main>
  );
}
