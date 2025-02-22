import { ErrorBoundary } from "react-error-boundary";
import { useAuth } from "../../contexts/AuthContext";
import Sidebar from "../../components/Sidebar";
import Map from "../../components/Map";
import User from "../../components/User";
import ErrorFallback from "../../components/ErrorFallback";
import styles from "./AppLayout.module.css";

function AppLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.app}>
      <Sidebar />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Map />
      </ErrorBoundary>
      {isAuthenticated && <User />}
    </div>
  );
}

export default AppLayout;
