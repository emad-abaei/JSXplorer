import { MouseEvent, ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: "primary" | "back" | "position";
}

function Button({ children, onClick, type = "primary" }: ButtonProps) {
  return (
    <button
      className={`${styles.btn} ${styles[type]}`}
      onClick={onClick}
      type='button'>
      {children}
    </button>
  );
}

export default Button;
