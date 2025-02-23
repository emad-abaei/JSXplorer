import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useScreen } from "../../contexts/ScreenContext";
import Logo from "../Logo";
import { NavLinkType } from "../../types";
import { IoClose, IoMenu } from "react-icons/io5";
import styles from "./PageNav.module.css";

function PageNav() {
  const links: NavLinkType[] = [
    { path: "/pricing", label: "Pricing", className: "" },
    { path: "/product", label: "Product", className: "" },
    { path: "/login", label: "Login", className: styles.ctaLink }
  ];

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { isSmallScreen } = useScreen();

  function handleMenu() {
    setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  }

  return (
    <nav className={styles.nav}>
      <Logo />

      {isSmallScreen && (
        <button
          className={styles.menuBtn}
          onClick={handleMenu}
          aria-label='Toggle navigation menu'
          aria-expanded={isMenuOpen}>
          {!isMenuOpen ? <IoMenu size={30} /> : <IoClose size={30} />}
        </button>
      )}

      {isSmallScreen && (
        <ul
          className={`${isMenuOpen ? styles.open : styles.close} `}
          role='menu'>
          {links.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path} className={link.className}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}

      {!isSmallScreen && (
        <ul>
          {links.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path} className={link.className}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default PageNav;
