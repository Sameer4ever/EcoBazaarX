import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import SellerDashboard from "./SellerDashboard";
import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";  // ✅ add this
import Checkout from "./pages/Checkout";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Router>
        <Routes>
          {/* Storefront homepage */}
          <Route path="/" element={<Home />} />

          {/* Single Product Page */}
          <Route path="/product/:id" element={<SingleProduct />} />

          <Route path="/checkout" element={<Checkout />} />

          {/* Authentication */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Dashboards */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />

          {/* Catch-all: redirect unknown routes to homepage */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </StyledEngineProvider>
  );
}

export default App;
