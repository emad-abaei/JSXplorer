import styles from "./SidebarFooter.module.css";

function SidebarFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        <small>
          &copy; Copyright {new Date().getFullYear()} by JSXplorer Co.
        </small>
      </p>
    </footer>
  );
}

export default SidebarFooter;
