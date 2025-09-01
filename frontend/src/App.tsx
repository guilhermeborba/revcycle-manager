import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';
import { Router } from './routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Toaster position="top-right" reverseOrder={false} />
      <Router />
    </ThemeProvider>
  );
}

export default App;