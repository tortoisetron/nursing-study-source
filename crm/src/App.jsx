import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './Pages/AdminDashboard';
import Orders from './Pages/Orders';
import Products from './Pages/Products';
import Categories from './Pages/Categories';
import Login from './Pages/Login';
import Layout from './Components/Layout';
import { useAuth } from './utils/AuthContext';

function App() {
  const { auth, setAuth, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white font-bold">Loading SECURE API ENVIRONMENT...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={(auth && (auth.organization_id || auth.role === 'organization' || auth.role === 'admin')) ? <Navigate to="/" /> : <Login setAuth={setAuth} authUserState={auth} />} />
        
        <Route element={(auth && (auth.organization_id || auth.role === 'organization' || auth.role === 'admin')) ? <Layout /> : <Navigate to="/login" />}>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/exams" element={<div className="p-20 text-white">Manage Exams (Coming Soon)</div>} />
          <Route path="/users" element={<div className="p-20 text-white">Manage Students (Coming Soon)</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
