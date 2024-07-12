import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './components/LoginScreen.js';
import MainApp from './components/MainApp.js';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <PaperProvider>
      {isAuthenticated ? (
        <MainApp />
      ) : (
        <LoginScreen onLogin={() => setIsAuthenticated(true)} />
      )}
    </PaperProvider>
  );
}