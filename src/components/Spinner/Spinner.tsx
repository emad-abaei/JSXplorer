import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={styles.spinnerContainer} role='status' aria-live='polite'>
      <div className={styles.spinner}></div>
      <span className='sr-only'>Loading...</span>
    </div>
  );
}

export default Spinner;
