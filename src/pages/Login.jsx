import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';
const Login = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1 = Email phase, 2 = OTP phase
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);
    const { sendOtp, verifyOtp } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });
        setIsLoading(true);

        const result = await sendOtp(email);
        setIsLoading(false);

        if (result.success) {
            setStep(2);
            setMessage({ text: result.message, type: 'success' });
        } else {
            setMessage({ text: result.message, type: 'error' });
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });
        setIsLoading(true);

        const result = await verifyOtp(email, otp);
        setIsLoading(false);

        if (result.success) {
            navigate('/admin');
        } else {
            setMessage({ text: result.message, type: 'error' });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="min-h-screen flex items-center justify-center bg-gray-50 px-4 select-none"
        >
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
                    <p className="text-gray-500 text-sm">Sign in to access the admin dashboard</p>
                </div>

                {message.text && (
                    <div className={`mb-4 p-3 rounded-lg text-sm text-center border ${message.type === 'error' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'
                        }`}>
                        {message.text}
                    </div>
                )}

                {step === 1 ? (
                    <form onSubmit={handleSendOtp} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all caret-transparent selection:bg-transparent"
                                    placeholder="admin@srinehaevents.com"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Sending...' : 'Send OTP'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Enter 6-digit OTP</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 text-center tracking-widest text-xl rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all caret-transparent selection:bg-transparent"
                                    placeholder="------"
                                    maxLength="6"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Verifying...' : 'Verify & Login'}
                        </button>

                        <div className="text-center mt-4">
                            <button
                                type="button"
                                onClick={() => { setStep(1); setOtp(''); setMessage({ text: '', type: '' }); }}
                                className="text-sm text-purple-600 hover:text-purple-800 transition-colors"
                            >
                                Back to Email
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </motion.div>
    );
};

export default Login;
