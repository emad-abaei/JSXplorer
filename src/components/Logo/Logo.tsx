import * as React from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

interface LogoProps {
  to?: string;
}

function Logo({ to = "/" }: LogoProps) {
  return (
    <Link to={to} className={styles.logoLink}>
      <img
        src='/jsxplorer-logo.png'
        alt='JSXplorer logo - click to go home'
        className={styles.logo}
      />
      <span>
        <strong>JSX</strong>plorer
      </span>
    </Link>
  );
}

export default React.memo(Logo);
