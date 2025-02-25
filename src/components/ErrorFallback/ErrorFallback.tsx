import { FallbackProps } from "react-error-boundary";
import Button from "../Button";
import styles from "./ErrorFallback.module.css";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role='alert' aria-live='assertive' className={styles.error}>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <Button onClick={resetErrorBoundary}>Try Again</Button>
    </div>
  );
}

export default ErrorFallback;
