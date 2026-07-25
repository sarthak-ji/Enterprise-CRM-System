// filepath: src/app/providers/AppProviders.jsx
// Centralized provider composition. Add global providers (Auth, Theme, Toast, Query, etc.) here.
import { AuthProvider } from '@/context/AuthContext.jsx';
import { ThemeProvider } from '@/context/ThemeContext.jsx';
import { SidebarProvider } from '@/context/SidebarContext.jsx';
import { Toaster } from 'react-hot-toast';

export const AppProviders = ({ children }) => (
  <ThemeProvider>
    <AuthProvider>
      <SidebarProvider>
        {children}
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </SidebarProvider>
    </AuthProvider>
  </ThemeProvider>
);
