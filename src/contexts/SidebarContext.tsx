import { createContext, ReactNode, useContext, useState } from "react";

interface SidebarProviderProps {
  children: ReactNode;
}

const SidebarContext = createContext({
  isSidebarOpen: false,
  openSidebar: () => {},
  toggleSidebar: () => {}
});

function SidebarProvider({ children }: SidebarProviderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  function toggleSidebar() {
    setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen);
  }

  function openSidebar() {
    setIsSidebarOpen(true);
  }

  return (
    <SidebarContext.Provider
      value={{ isSidebarOpen, toggleSidebar, openSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const ctx = useContext(SidebarContext);

  if (ctx === undefined)
    throw new Error("useSidebar must be used within the SidebarProvider");

  return ctx;
}

export { SidebarProvider, useSidebar };
