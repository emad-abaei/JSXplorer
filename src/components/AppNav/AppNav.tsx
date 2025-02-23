import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <nav className={styles.nav} role='navigation' aria-label='App Navigation'>
      <ul>
        <li>
          <NavLink to='cities' aria-label='View cities list'>
            Cities
          </NavLink>
        </li>
        <li>
          <NavLink to='countries' aria-label='View countries list'>
            Countries
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
