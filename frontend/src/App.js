import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Layout components
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Page components
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Rehearsals from './pages/Rehearsals';
import RehearsalDetail from './pages/RehearsalDetail';
import CreateRehearsal from './pages/CreateRehearsal';
import Groups from './pages/Groups';
import GroupDetail from './pages/GroupDetail';
import CreateGroup from './pages/CreateGroup';
import Venues from './pages/Venues';
import VenueDetail from './pages/VenueDetail';
import CreateVenue from './pages/CreateVenue';
import SetLists from './pages/SetLists';
import SetListDetail from './pages/SetListDetail';
import CreateSetList from './pages/CreateSetList';
import Songs from './pages/Songs';
import SongDetail from './pages/SongDetail';
import CreateSong from './pages/CreateSong';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4F3DD5',
    },
    secondary: {
      main: '#F73378',
    },
    background: {
      default: '#F5F7FA',
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Auth routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>
            
            {/* Protected routes */}
            <Route element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              
              <Route path="/rehearsals" element={<Rehearsals />} />
              <Route path="/rehearsals/:id" element={<RehearsalDetail />} />
              <Route path="/rehearsals/create" element={<CreateRehearsal />} />
              
              <Route path="/groups" element={<Groups />} />
              <Route path="/groups/:id" element={<GroupDetail />} />
              <Route path="/groups/create" element={<CreateGroup />} />
              
              <Route path="/venues" element={<Venues />} />
              <Route path="/venues/:id" element={<VenueDetail />} />
              <Route path="/venues/create" element={<CreateVenue />} />
              
              <Route path="/setlists" element={<SetLists />} />
              <Route path="/setlists/:id" element={<SetListDetail />} />
              <Route path="/setlists/create" element={<CreateSetList />} />
              
              <Route path="/songs" element={<Songs />} />
              <Route path="/songs/:id" element={<SongDetail />} />
              <Route path="/songs/create" element={<CreateSong />} />
              
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;