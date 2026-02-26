import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, DollarSign, Calendar, ChevronRight, CheckCircle2 } from 'lucide-react';

const ServiceModal = ({ service, onClose }) => {
    const getYouTubeEmbedUrl = (url) => {
        if (!url) return null;
        // Check for YouTube domains
        if (!url.includes('youtube.com') && !url.includes('youtu.be')) return null;

        // This regex covers youtube.com/watch?v=, youtu.be/, youtube.com/embed/, and youtube.com/shorts/
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
        const match = url.match(regExp);

        // YouTube IDs are generally 11 characters
        if (match && match[2] && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}`;
        }
        return null;
    };

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (service) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [service]);

    if (!service) return null;

    return (
        <AnimatePresence>
            {service && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-0">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full h-full bg-white overflow-hidden shadow-2xl flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex flex-col md:flex-row h-full overflow-y-auto md:overflow-hidden">
                            {/* Left: Image (Sticky on Mobile, Fixed Height on Desktop) */}
                            <div className="w-full md:w-2/5 relative shrink-0">
                                <div className="h-64 sm:h-72 md:h-full w-full">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                                </div>

                                {/* Overlay Content over Image */}
                                <div className="absolute bottom-6 left-6 right-6 text-white text-left md:bottom-10 md:left-8">
                                    <span className="inline-block px-3 py-1 bg-purple-600/80 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-wider mb-3">
                                        {service.category}
                                    </span>
                                    <h2 className="text-3xl sm:text-4xl font-bold leading-tight drop-shadow-lg">
                                        {service.title}
                                    </h2>
                                </div>
                            </div>

                            {/* Right: Details Scrollable Area */}
                            <div className="w-full md:w-3/5 p-6 sm:p-8 md:p-10 bg-white overflow-y-auto custom-scrollbar flex flex-col">

                                {/* Key Highlights Matrix */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                    <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100/50 flex flex-col justify-center items-start">
                                        <div className="flex items-center text-purple-600 mb-1">
                                            <DollarSign size={18} className="mr-1.5" />
                                            <span className="text-xs font-bold uppercase tracking-wider text-purple-700/70">Price</span>
                                        </div>
                                        <span className="font-bold text-gray-900 text-lg">{service.price ? `₹${service.price}` : 'On Request'}</span>
                                    </div>
                                    <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100/50 flex flex-col justify-center items-start">
                                        <div className="flex items-center text-blue-600 mb-1">
                                            <Clock size={18} className="mr-1.5" />
                                            <span className="text-xs font-bold uppercase tracking-wider text-blue-700/70">Duration</span>
                                        </div>
                                        <span className="font-bold text-gray-900 text-lg">{service.duration || 'Flexible'}</span>
                                    </div>
                                    <div className="bg-rose-50 rounded-2xl p-4 border border-rose-100/50 flex flex-col justify-center items-start">
                                        <div className="flex items-center text-rose-600 mb-1">
                                            <MapPin size={18} className="mr-1.5" />
                                            <span className="text-xs font-bold uppercase tracking-wider text-rose-700/70">Location</span>
                                        </div>
                                        <span className="font-bold text-gray-900 text-lg truncate w-full" title={service.location || 'Anywhere'}>{service.location || 'Anywhere'}</span>
                                    </div>
                                </div>

                                {/* Full Description */}
                                <div className="mb-8 flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                        <CheckCircle2 size={20} className="text-purple-600 mr-2" />
                                        About This Service
                                    </h3>
                                    <div className="prose prose-purple max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                                        {service.description}
                                    </div>

                                    {/* From Your End */}
                                    {service.fromYourEnd && (
                                        <div className="mt-8">
                                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                                <CheckCircle2 size={20} className="text-purple-600 mr-2" />
                                                From Your End (Requirements)
                                            </h3>
                                            <div className="prose prose-purple max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                                                {service.fromYourEnd}
                                            </div>
                                        </div>
                                    )}

                                    {/* Terms & Conditions */}
                                    {service.terms && (
                                        <div className="mt-8">
                                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                                <CheckCircle2 size={20} className="text-purple-600 mr-2" />
                                                Terms & Conditions
                                            </h3>
                                            <div className="prose prose-purple max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                                                {service.terms}
                                            </div>
                                        </div>
                                    )}

                                    {/* YouTube Embed Area */}
                                    {service.youtubeLink && getYouTubeEmbedUrl(service.youtubeLink) && (
                                        <div className="mt-8 rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-black aspect-video">
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={getYouTubeEmbedUrl(service.youtubeLink)}
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                                className="w-full h-full object-cover"
                                            ></iframe>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4 sm:items-center">
                                    <a
                                        href="tel:+919014444665"
                                        className="w-full sm:w-1/2 flex items-center justify-center py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] transition-all"
                                    >
                                        Call to Book
                                    </a>
                                    <button
                                        onClick={onClose}
                                        className="w-full sm:w-1/2 flex items-center justify-center py-4 px-6 rounded-2xl bg-gray-100 text-gray-700 font-bold text-lg hover:bg-gray-200 transition-colors"
                                    >
                                        Close Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ServiceModal;
