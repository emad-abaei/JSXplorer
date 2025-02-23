import { Outlet } from "react-router-dom";
import { useSidebar } from "../../contexts/SidebarContext";
import Logo from "../Logo";
import AppNav from "../AppNav";
import SidebarFooter from "../SidebarFooter";
import ButtonSidebar from "../ButtonSidebar";
import styles from "./Sidebar.module.css";

function Sidebar() {
  const { isSidebarOpen } = useSidebar();

  return (
    <aside
      className={`${styles.sidebar} ${isSidebarOpen && styles.active}`}
      role='complementary'
      aria-labelledby='sidebar-title'
      aria-expanded={isSidebarOpen}>
      <Logo />
      <AppNav />
      <Outlet />
      <ButtonSidebar />
      <SidebarFooter />
    </aside>
  );
}

export default Sidebar;
