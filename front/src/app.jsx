import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import Onboarding from './Pages/Onboarding';
import TestBank from './Pages/TestBank';
import ProductDetails from './Pages/ProductDetails';
import ExamInterface from './Pages/ExamInterface';
import Results from './Pages/Results';
import Dashboard from './Pages/Dashboard';
import Cart from './Pages/Cart';
import Pricing from './Pages/Pricing';
import Legal from './Pages/Legal';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Blog from './Pages/Blog';
import { CartProvider } from './Context/CartContext';

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/test-bank" element={<TestBank />} />
          <Route path="/test-bank/:slug" element={<ProductDetails />} />
          <Route path="/exams/:id" element={<ExamInterface />} />
          <Route path="/results" element={<Results />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/plans" element={<Pricing />} />
          <Route path="/refund-policy" element={<Legal title="Refund Policy" />} />
          <Route path="/privacy-policy" element={<Legal title="Privacy Policy" />} />
          <Route path="/terms" element={<Legal title="Terms & Conditions" />} />
          <Route path="/disclaimer" element={<Legal title="Legal Disclaimer" />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
