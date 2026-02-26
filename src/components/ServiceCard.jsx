import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, Calendar, ArrowRight } from 'lucide-react';

const ServiceCard = ({ service, onClick }) => {
    return (
        <motion.div
            onClick={onClick}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-full flex flex-col cursor-pointer"
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden">
                <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>

                <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">
                        {service.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-grow flex flex-col relative z-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {service.title}
                </h3>

                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                        <DollarSign size={14} className="text-green-500 mr-1" />
                        <span className="font-semibold text-gray-700">{service.price ? `₹${service.price}` : 'On Request'}</span>
                    </div>
                    <div className="flex items-center">
                        <Clock size={14} className="text-blue-500 mr-1" />
                        <span>{service.duration || 'Flexible'}</span>
                    </div>
                </div>

                <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {service.description}
                </p>

                {/* Meta details */}
                <div className="space-y-2 mb-6 pt-4 border-t border-gray-100 text-xs text-gray-500 font-medium">
                    <div className="flex items-center justify-between">
                        <span className="flex items-center"><MapPin size={14} className="mr-2 text-red-400" /> Location</span>
                        <span>{service.location || 'Anywhere'}</span>
                    </div>
                </div>

                <div className="mt-auto">
                    <motion.div
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center group-hover:from-purple-700 group-hover:to-pink-700"
                    >
                        View Full Details
                        <ArrowRight size={16} className="ml-2 opacity-80 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default ServiceCard;
