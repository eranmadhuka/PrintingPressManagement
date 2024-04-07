import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/common/Header';
import Footer from './components/common/Footer'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminRoutes from './components/Routes/AdminRoutes';
import CustomerRoutes from './components/Routes/CustomerRoutes';
import EmployeeRoutes from './components/Routes/EmployeeRoutes';
import Register from './pages/Register';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import TellUsMore from './pages/TellUsMore';
import Checkout from './pages/Checkout';

function PublicLayout() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blog" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/tell-us-more" element={<TellUsMore />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/*" element={<PublicLayout />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Customer Routes */}
        <Route path="/user/*" element={<CustomerRoutes />} />

        {/* Employee Routes */}
        <Route path="/employee/*" element={<EmployeeRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
