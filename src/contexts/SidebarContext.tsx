import { FC, useState, createContext } from 'react';

type SidebarContext = {
  sidebarToggle: boolean; // Update this based on the actual type
  toggleSidebar: () => void;
  closeSidebar: () => void;
};

interface SidebarProviderProps {
  children: React.ReactNode;
}

 
export const SidebarContext = createContext<SidebarContext>(
  {} as SidebarContext
);

export const SidebarProvider: FC<SidebarProviderProps> = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };
  const closeSidebar = () => {
    setSidebarToggle(false);
  };

  return (
    <SidebarContext.Provider
      value={{ sidebarToggle, toggleSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
