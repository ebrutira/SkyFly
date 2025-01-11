import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Layout/Navbar';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

// SkyFly özel renk paleti
const theme = createTheme({
  palette: {
    primary: {
      main: '#7392B7',
      light: '#759EB8',
      dark: '#5C7A9E',
    },
    secondary: {
      main: '#FFECD6',
      light: '#FFF4E6',
      dark: '#FFE0BA',
    },
    background: {
      default: '#D8E1E9',
      paper: '#B3C5D7',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#7392B7',
    },
    action: {
      hover: '#C5D5EA',
    },
  },
  typography: {
    fontFamily: '"Arial", "Helvetica", sans-serif',
    h1: {
      fontWeight: 600,
      color: '#7392B7',
    },
    h2: {
      fontWeight: 500,
      color: '#7392B7',
    },
    h3: {
      fontWeight: 500,
      color: '#7392B7',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          padding: '10px 20px',
          fontWeight: 'bold',
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          borderRadius: 10,
          border: '1px solid #C5D5EA',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  return (
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <div className="App">
              <Navbar />
              <AppRoutes />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </Router>
  );
}

export default App;