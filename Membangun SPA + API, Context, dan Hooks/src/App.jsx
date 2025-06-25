import './i18n'; // harus sebelum komponen lain
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import Loading from './components/Loading';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
import AppRoutes from './routes';
import './styles/style.css';


function AppContent() {
  const { initializing } = React.useContext(AuthContext);

  if (initializing) return <Loading />;

  return (
    <>
      <Navigation />
      <AppRoutes />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}


export default App;
