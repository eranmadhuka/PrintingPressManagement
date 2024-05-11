import "./App.css";
import { useAuthContext } from "../src/hooks/useAuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios"; // Import Axios

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AdminRoutes from "./components/Routes/AdminRoutes";
import CustomerRoutes from "./components/Routes/CustomerRoutes";
import EmployeeRoutes from "./components/Routes/EmployeeRoutes";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import TellUsMore from "./pages/TellUsMore";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Checkout from "./pages/Checkout";
import Elogin from "./pages/Emplogin";

function PublicLayout() {
  const { user } = useAuthContext();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blog" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route path="/emplogin" element={<Elogin />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />

        <Route path="/product/:productId" element={<ProductDetail />} />
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
