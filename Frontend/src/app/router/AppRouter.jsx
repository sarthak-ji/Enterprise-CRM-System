// filepath: src/app/router/AppRouter.jsx
// Top-level routing configuration. All route definitions live here.
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes.jsx';

export const AppRouter = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);
