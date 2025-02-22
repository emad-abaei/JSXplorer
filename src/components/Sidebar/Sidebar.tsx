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
    <div className={`${styles.sidebar} ${isSidebarOpen && styles.active}`}>
      <Logo />
      <AppNav />
      <Outlet />
      <ButtonSidebar />
      <SidebarFooter />
    </div>
  );
}

export default Sidebar;
