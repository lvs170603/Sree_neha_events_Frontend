import React from 'react';
import { Phone, Mail, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const TopBar = () => {
    return (
        <div className="bg-purple-900 text-white py-2 text-xs md:text-sm">
            <div className="container mx-auto px-4 flex flex-row justify-between items-center">
                <div className="flex items-center space-x-4">
                    <a href="tel:+911234567890" className="flex items-center hover:text-purple-200 transition-colors">
                        <Phone size={14} className="mr-1" />
                        <span>+91 9014444665</span>
                    </a>
                    <a href="mailto:contact@srinehaevents.com" className="hidden sm:flex items-center hover:text-purple-200 transition-colors">
                        <Mail size={14} className="mr-1" />
                        <span>srinehaevents@gmail.com</span>
                    </a>
                </div>

                <div className="flex items-center space-x-4">
                    <span className="hidden md:inline text-purple-200">Follow us:</span>
                    <div className="flex space-x-3">
                        <a href="https://www.instagram.com/srinehaevents?igsh=Zjl1amJmc3kxMm13" target='blank' className="hover:text-purple-200 transition-colors"><Instagram size={16} /></a>

                        <a href="#" target='blank' className="hover:text-purple-200 transition-colors"><Facebook size={16} /></a>

                        <a href="https://youtube.com/@srinehaevents159?si=AeOvcw5mzm9pTVCK" target='blank' className="hover:text-purple-200 transition-colors"><Youtube size={16} /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
