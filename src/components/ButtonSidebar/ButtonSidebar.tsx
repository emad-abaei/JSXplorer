import { useSidebar } from "../../contexts/SidebarContext";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi";
import styles from "./ButtonSidebar.module.css";

function ButtonSidebar() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <button className={styles.sidebarBtn} onClick={toggleSidebar}>
      {isSidebarOpen ? (
        <HiChevronDoubleLeft size={14} color='#fff' />
      ) : (
        <HiChevronDoubleRight size={14} color='#fff' />
      )}
    </button>
  );
}

export default ButtonSidebar;
