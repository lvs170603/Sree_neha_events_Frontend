import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import BannerCarousel from './components/BannerCarousel';
import ServiceList from './components/ServiceList';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import About from './pages/About';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

// Wrapper component to use useLocation hook inside Router
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <>
            <BannerCarousel />
            <ServiceList />
          </>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <footer className="bg-gray-900 text-white py-12 mt-auto">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                    Sree Neha Events
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Making your special moments unforgettable with our premium event management services.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li><a href="/about" className="hover:text-purple-400 transition-colors">About Us</a></li>
                    <li><a href="#" className="hover:text-purple-400 transition-colors">Services</a></li>
                    <li><a href="#" className="hover:text-purple-400 transition-colors">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-4">Contact Info</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>Machilipatnam, Andhra Pradesh</li>
                    <li>sreenehaevents@gmail.com</li>
                    <li>+91 9014444665</li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-xs">
                &copy; 2026 Sree Neha Events. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
