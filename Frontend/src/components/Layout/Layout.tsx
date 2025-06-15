// src/Layout/Layout.tsx
import React, {useState} from 'react';

import Sidebar from './Sidebar';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Footer from './Footer';


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Page content */}
      {children}

      {/* Hamburger Menu Button (optional, for a left sidebar trigger) */}
      <IconButton
        onClick={toggleSidebar}
        sx={{ position: 'fixed', top:2, right: 15, zIndex: 20, color: 'black'  }}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar Component (MUI - right side pop-up) */}
      <Sidebar open={isSidebarOpen} onClose={closeSidebar} />

      <Footer/>

      {/* <MouseDotTrail/> */}

      {/* Right vertical sidebar (your existing code - make it clickable) */}
      {/* <div
        onClick={toggleSidebar} // Trigger the sidebar on click
        className="fixed right-0 top-0 h-screen w-16 bg-blue-900 text-white z-20 flex items-center justify-center cursor-pointer" // Added cursor-pointer
      >
        <div className="rotate-90 tracking-widest text-sm">MENU</div>
      </div> */}
    </div>
  );
};

export default Layout;