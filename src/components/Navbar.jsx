import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarHeart, Menu, X, LayoutDashboard, Home, Phone } from 'lucide-react';
import TopBar from './TopBar';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const { user, logout } = useContext(AuthContext);
    const isAdmin = location.pathname.startsWith('/admin');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
            <TopBar />
            <nav className={`w-full transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-200' : 'bg-white/60 backdrop-blur-md'}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2 group">
                            <motion.div
                                whileHover={{ rotate: 10, scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <CalendarHeart className="h-8 w-8 md:h-9 md:w-9 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 stroke-purple-600" />
                            </motion.div>
                            <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 tracking-tight group-hover:opacity-80 transition-opacity">
                                Sree Neha Events
                            </span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8 items-center">
                            <NavLink to="/" current={location.pathname === '/'} icon={<Home size={18} />}>
                                Home
                            </NavLink>
                            <NavLink to="/admin" current={isAdmin} icon={<LayoutDashboard size={18} />}>
                                Admin
                            </NavLink>
                            {user && (
                                <button
                                    onClick={logout}
                                    className="px-5 py-2.5 rounded-full border-2 border-purple-600 text-purple-600 font-medium hover:bg-purple-50 transition-all"
                                >
                                    Logout
                                </button>
                            )}
                            <motion.a
                                href="tel:+919014444665"
                                whileHover={{ scale: 1.05 }}
                                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all flex items-center space-x-2"
                            >
                                <Phone size={18} />
                                <span>Contact Us</span>
                            </motion.a>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-700 hover:text-purple-600 focus:outline-none transition-colors p-2"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-lg"
                        >
                            <div className="px-4 pt-4 pb-6 space-y-3">
                                <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
                                <MobileNavLink to="/admin" onClick={() => setIsOpen(false)}>Admin Dashboard</MobileNavLink>
                                {user && (
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsOpen(false);
                                        }}
                                        className="block w-full text-left px-4 py-3 text-red-600 font-medium hover:bg-red-50"
                                    >
                                        Logout
                                    </button>
                                )}
                                <a
                                    href="tel:+919014444665"
                                    className="block w-full text-center px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-md"
                                >
                                    Call Now
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </div>
    );
};

const NavLink = ({ to, children, current, icon }) => (
    <Link
        to={to}
        className={`relative flex items-center space-x-1.5 font-medium transition-colors ${current ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
            }`}
    >
        {icon}
        <span>{children}</span>
        {current && (
            <motion.div
                layoutId="underline"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"
            />
        )}
    </Link>
);

const MobileNavLink = ({ to, children, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-medium transition-colors"
    >
        {children}
    </Link>
);

export default Navbar;
