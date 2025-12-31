import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import PostListing from "./pages/PostListing";
import Browse from "./pages/Browse";
import ListingDetail from "./pages/ListingDetail";
import MyListings from "./pages/MyListings";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Disclaimer from "./pages/Disclaimer";
import Regions from "./pages/Regions";
import Categories from "./pages/Categories";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/admin/Dashboard";
import AdminListings from "./pages/admin/AdminListings";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/post-listing" element={<PostListing />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/listing/:id" element={<ListingDetail />} />
            <Route path="/my-listings" element={<MyListings />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/regions" element={<Regions />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Admin Routes */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/listings" element={<AdminListings />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/payments" element={<AdminPayments />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
