import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';
import { setupGlobalErrorHandling } from './utils/errorHandler';
import { useAuthStore } from './store/authStore';
import { supabase } from './lib/supabase';

// Initialize global error handling
setupGlobalErrorHandling();

// Check for existing session on app start
const initializeAuth = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    useAuthStore.getState().setUser(session.user);
  }
};

initializeAuth().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
});
