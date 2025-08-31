import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { RevenueCyclePage } from './pages/RevenueCyclePage';

import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route element={<PrivateRoute />}>
        <Route path="/revenue-cycles" element={<RevenueCyclePage />} />
        <Route path="/dashboard" element={<Dashboard />} />        
        <Route path="/" element={<Navigate to="/revenue-cycles" replace />} /> 
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  );
}