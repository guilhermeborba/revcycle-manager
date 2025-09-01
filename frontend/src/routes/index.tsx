import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import RevenueCyclePage from '../pages/RevenueCyclePage/RevenueCyclePage';
import PrivateRoute from '../components/PrivateRoute';
import Layout from '../components/Layout';

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}> 
          <Route path="/revenue-cycles" element={<RevenueCyclePage />} />

          <Route path="/" element={<Navigate to="/revenue-cycles" replace />} /> 
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}