import { Link } from "react-router-dom";
import PageNav from "../../components/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <header>
          <h1>Pin Your Journey, Relive the Adventure</h1>
          <h2>
            Map your travels, cherish your memories, and share your story with
            the world. From bustling cities to hidden gems, keep every adventure
            alive and inspire others to follow in your footsteps.
          </h2>
        </header>
        <Link
          to='/login'
          className='cta'
          aria-label='Start tracking your journey'>
          Start tracking now
        </Link>
      </section>
    </main>
  );
}
