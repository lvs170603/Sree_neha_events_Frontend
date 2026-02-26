import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import API_BASE_URL from '../config';

const BannerCarousel = () => {
    const [banners, setBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/banners`);
                setBanners(res.data);
            } catch (err) {
                console.error('Error fetching banners:', err);
            }
        };
        fetchBanners();
    }, []);

    // Auto-slide every 5 seconds
    useEffect(() => {
        if (banners.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [banners.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
    };

    if (banners.length === 0) return null; // Don't render anything if no banners

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-2 md:pb-4">
            <div className="relative w-full aspect-[16/7] rounded-md overflow-hidden shadow-lg group">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={banners[currentIndex].imageUrl}
                        alt="Banner"
                        className="absolute w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                </AnimatePresence>

                {/* Navigation Arrows (visible on hover) */}
                {banners.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/60 text-gray-800 hover:bg-white shadow-md transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
                        >
                            <ChevronLeft size={24} className="md:w-6 md:h-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/60 text-gray-800 hover:bg-white shadow-md transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                        >
                            <ChevronRight size={24} className="md:w-6 md:h-6" />
                        </button>
                    </>
                )}
            </div>

            {/* Dots */}
            {banners.length > 1 && (
                <div className="flex justify-center mt-4 md:mt-6 space-x-1.5 md:space-x-2">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ease-out ${index === currentIndex ? 'bg-gray-800 w-6 md:w-8' : 'bg-gray-300 w-1.5 md:w-2 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BannerCarousel;
