import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import ServiceCard from './ServiceCard';
import ServiceModal from './ServiceModal';
import Hero from './Hero';
import API_BASE_URL from '../config';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/services`);
                setServices(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch services');
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const categories = ['All', ...new Set(services.map(service => service.category))];

    const filteredServices = filter === 'All'
        ? services
        : services.filter(service => service.category === filter);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center text-red-500 font-medium text-lg">
            {error}
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-gray-50 min-h-screen pb-20"
        >
            <Hero />

            <div className="container mx-auto px-4 -mt-20 relative z-20" id="services">
                {/* Filter Section */}
                <div className="glass rounded-2xl p-6 mb-12 shadow-xl shadow-purple-900/5">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center space-x-2 text-gray-800 font-bold text-lg">
                            <Filter className="text-purple-600" />
                            <span>Filter Services</span>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setFilter(category)}
                                    className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${filter === category
                                        ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-purple-600 border border-gray-200'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Services Grid */}
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={filter}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        {filteredServices.map(service => (
                            <ServiceCard
                                key={service._id}
                                service={service}
                                onClick={() => setSelectedService(service)}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {filteredServices.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-600">No services found</h3>
                        <p className="text-gray-400">Try adjusting your filters.</p>
                    </motion.div>
                )}
            </div>

            {/* Service Details Modal */}
            <ServiceModal
                service={selectedService}
                onClose={() => setSelectedService(null)}
            />
        </motion.div>
    );
};

export default ServiceList;
