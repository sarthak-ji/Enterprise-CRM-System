// filepath: src/app/App.jsx
// Root application composition. Wraps the app with global providers and mounts the router.
import { AppProviders } from './providers/AppProviders.jsx';
import { AppRouter } from './router/AppRouter.jsx';

const App = () => (
  <AppProviders>
    <AppRouter />
  </AppProviders>
);

export default App;
