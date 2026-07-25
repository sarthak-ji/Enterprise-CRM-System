// filepath: src/components/layout/Sidebar.jsx
// Responsive entry point. Renders the desktop sidebar on lg+ and a slide-in
// drawer on smaller screens. State is owned by SidebarContext.
import { DesktopSidebar } from './DesktopSidebar.jsx';
import { MobileSidebar  } from './MobileSidebar.jsx';

export const Sidebar = () => (
  <>
    <DesktopSidebar />
    <MobileSidebar />
  </>
);

export default Sidebar;
