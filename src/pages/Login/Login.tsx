import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../components/Button";
import styles from "./Login.module.css";

export default function Login() {
  // Pre-fill for dev purposes
  const [email, setEmail] = useState("emad@example.com");
  const [password, setPassword] = useState("1234");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === true) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (email && password) login(email, password);
  }

  return (
    <main className={styles.login}>
      <form className={styles.form} onSubmit={handleSubmit} autoComplete='off'>
        <div className={styles.row}>
          <label htmlFor='email'>Email address</label>
          <input
            type='text'
            id='email'
            name='email'
            autoComplete='off'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor='password'>Password</label>
          <input
            type='text'
            id='password'
            name='password'
            autoComplete='new-password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button>Login</Button>
        </div>
      </form>
    </main>
  );
}
