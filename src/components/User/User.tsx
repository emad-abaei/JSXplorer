import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useScreen } from "../../contexts/ScreenContext";
import styles from "./User.module.css";

const USER_TIMEOUT = 5000;

function User() {
  const [isUserOpen, setIsUserOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isSmallScreen } = useScreen();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsUserOpen(false);
    }, USER_TIMEOUT);

    return () => clearTimeout(timer);
  }, [isUserOpen]);

  function handleClick() {
    logout();
    navigate("/");
  }

  function toggleUser() {
    setIsUserOpen((isUserOpen) => !isUserOpen);
  }

  return (
    <div
      className={`${styles.user} ${isUserOpen && isSmallScreen ? styles.open : ""}`}>
      <img
        src={user?.avatar}
        alt={user?.name}
        onClick={toggleUser}
        role='button'
        aria-label='Toggle user menu'
      />
      <span>Welcome, {user?.name}</span>
      <button onClick={handleClick} aria-label='Log out of your account'>
        Logout
      </button>
    </div>
  );
}

export default User;
