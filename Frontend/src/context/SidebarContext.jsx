// filepath: src/context/SidebarContext.jsx
// Tracks sidebar open/collapsed state + mobile drawer state across the app.
// State is persisted to localStorage so the user's preference survives reloads.
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery.js';

const STORAGE_KEY = 'crm_sidebar_collapsed';
const SidebarContext = createContext(null);

export const SidebarProvider = ({ children }) => {
  // Desktop: collapsed = icons-only rail. Mobile: open = drawer visible.
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'true'; } catch { return false; }
  });
  const [isMobileOpen, setMobileOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Auto-close the mobile drawer when crossing into desktop
  useEffect(() => { if (isDesktop) setMobileOpen(false); }, [isDesktop]);

  // Persist collapsed preference
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, String(isCollapsed)); } catch {}
  }, [isCollapsed]);

  const toggleCollapsed = useCallback(() => setIsCollapsed((v) => !v), []);
  const toggleMobile     = useCallback(() => setMobileOpen((v) => !v), []);
  const closeMobile      = useCallback(() => setMobileOpen(false), []);

  // Back-compat alias used by PrivateLayout ("isOpen" = full sidebar visible on desktop)
  const isOpen = !isCollapsed;

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        isCollapsed,
        isMobileOpen,
        isDesktop,
        setIsCollapsed,
        toggleCollapsed,
        setMobileOpen,
        toggleMobile,
        closeMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider');
  return ctx;
};
