import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative pt-8 pb-16 lg:pt-12 lg:pb-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-20 right-10 w-48 h-48 md:w-72 md:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-48 h-48 md:w-72 md:h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-purple-200 bg-purple-50 text-purple-700 text-xs md:text-sm font-medium mb-6 shadow-sm">
                        <Sparkles size={14} className="mr-2" />
                        Creating Moments That Last Forever
                    </span>

                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-gray-900 leading-tight">
                        Celebrate Life with <br className="hidden sm:block" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500">
                            Sree Neha Events
                        </span>
                    </h1>

                    <p className="text-lg md:text-2xl text-gray-600 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-2">
                        From majestic weddings to intimate birthday bashes, we turn your dream events into breathtaking realities.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0">
                        <motion.a
                            href="#services"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto px-8 py-3 md:py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-base md:text-lg shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all flex items-center justify-center group"
                        >
                            Explore Services
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                        <motion.a
                            href="#"
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto px-8 py-3 md:py-4 rounded-full bg-white text-gray-800 font-bold text-base md:text-lg shadow-md hover:shadow-lg transition-all border border-gray-100"
                        >
                            Book a Consultation
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
