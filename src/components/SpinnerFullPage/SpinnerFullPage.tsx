import Spinner from "../Spinner";
import styles from "./SpinnerFullPage.module.css";

function SpinnerFullPage() {
  return (
    <div className={styles.spinnerFullpage} role='status' aria-live='polite'>
      <Spinner />
      <span className='sr-only'>Loading content, please wait...</span>
    </div>
  );
}

export default SpinnerFullPage;
