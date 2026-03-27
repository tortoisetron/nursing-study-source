import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './Pages/AdminDashboard';
import Orders from './Pages/Orders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/orders" element={<Orders />} />
        {/* Placeholder for more routes */}
        <Route path="/exams" element={<div className="p-20 text-white">Manage Exams (Coming Soon)</div>} />
        <Route path="/users" element={<div className="p-20 text-white">Manage Students (Coming Soon)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
