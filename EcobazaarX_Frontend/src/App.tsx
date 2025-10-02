import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// --- CONTEXT PROVIDERS ---
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

// --- PAGES ---
import Homepage from "./pages/Home/Homepage";
import NotFound from "./pages/Home/NotFound";
import SignIn from "./pages/Dashboard/SignIn";
import SignUp from "./pages/Dashboard/SignUp";
import Dashboard from "./pages/Dashboard/Admin Dashboard";
import SellerDashboard from "./pages/Dashboard/Seller Dashboard";
import Checkout from "./pages/Home/Checkout";
import AllProductsPage from "./pages/Home/AllProductsPage";
import CartPage from "./pages/Home/CartPage";
import ProfilePage from "./pages/Home/ProfilePage"; // <-- Import the new Profile Page
import SellerOrderHistoryPage from "./pages/Seller/SellerOrderHistoryPage";

// Seller Actions
import AddProductPage from "./pages/Seller/AddProduct";
import ManageProductsPage from "./pages/Seller/ManageProducts";
import DashboardLayout from "./layout/DashboardLayout";
import CarbonReport from "./pages/Seller/CarbonReport";
import InventoryPage from "./pages/Seller/InventoryPage";
import PendingApprovalPage from "./pages/Seller/PendingApprovalPage";
import SellerBlocked from "./pages/Seller/SellerBlocked";
import IncomingOrdersPage from "./pages/Seller/IncomingOrdersPage";
import TopSellingProductsPage from "./pages/Seller/TopSellingProductsPage";

// Admin Actions
import SellersPage from "./pages/Admin/SellersPage";
import ProductCataloguePage from "./pages/Admin/ProductCataloguePage";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import AdminCarbonReportPage from "./pages/Admin/AdminCarbonReportPage";
import ManageUsersPage from "./pages/Admin/AdminManageUser";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* AuthProvider wraps everything to provide global authentication state */}
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Storefront Pages */}
              <Route path="/" element={<Homepage />} />
              <Route path="/AllProductsPage" element={<AllProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<ProfilePage />} />{" "}
              {/* <-- Add Profile Route */}
              {/* Authentication */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              {/* Admin Dashboard */}
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<AdminHomePage />} />
                <Route path="sellers" element={<SellersPage />} />
                <Route path="product-catalogue" element={<ProductCataloguePage />}/>
                <Route path="tasks" element={<AdminCarbonReportPage />} />
                <Route path="users" element={<ManageUsersPage />} />
              </Route>


              {/* Seller Dashboard */}
              <Route path="/seller-dashboard" element={<SellerDashboard />} />
              <Route path="/seller-dashboard" element={<DashboardLayout />}>
                <Route path="add-product" element={<AddProductPage />} />
                <Route
                  path="manage-products"
                  element={<ManageProductsPage />}
                />
                <Route path="orders" element={<IncomingOrdersPage />} />
                <Route
                  path="orderHistory"
                  element={<SellerOrderHistoryPage />}
                />
                <Route path="carbon-report" element={<CarbonReport />} />
                <Route path="inventory" element={<InventoryPage />} />
                <Route path="analytics" element={<TopSellingProductsPage />} />
              </Route>
              {/* Other Seller Pages */}
              <Route
                path="/pending-approval"
                element={<PendingApprovalPage />}
              />
              <Route path="/seller-blocked" element={<SellerBlocked />} />
              {/* Catch-all for unknown routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
