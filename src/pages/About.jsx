import React from 'react';
import { motion } from 'framer-motion';
import { CalendarHeart, Star, Users, Award, MapPin, Phone, Mail, Heart, Camera, Music, Utensils, Sparkles } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' }
    })
};

const About = () => {
    const stats = [
        { icon: <CalendarHeart size={28} />, value: '500+', label: 'Events Completed' },
        { icon: <Users size={28} />, value: '1000+', label: 'Happy Clients' },
        { icon: <Star size={28} />, value: '8+', label: 'Years Experience' },
        { icon: <Award size={28} />, value: '50+', label: 'Expert Team' },
    ];

    const services = [
        { icon: <Heart size={24} />, title: 'Weddings', desc: 'Dream weddings crafted with love and attention to every detail.' },
        { icon: <Sparkles size={24} />, title: 'Birthdays', desc: 'Unforgettable birthday celebrations for all ages.' },
        { icon: <Camera size={24} />, title: 'Photography', desc: 'Professional photography to capture every precious moment.' },
        { icon: <Music size={24} />, title: 'Entertainment', desc: 'Live music, DJs, and performances to keep the energy alive.' },
        { icon: <Utensils size={24} />, title: 'Catering', desc: 'Delicious cuisine curated to suit your taste and occasion.' },
        { icon: <CalendarHeart size={24} />, title: 'Decoration', desc: 'Stunning décor that transforms any venue into a magical space.' },
    ];

    const team = [
        { name: 'Sree Neha', role: 'Founder & Event Director', initial: 'SN' },
        { name: 'Creative Team', role: 'Décor & Design Specialists', initial: 'CT' },
        { name: 'Operations', role: 'Logistics & Coordination', initial: 'OP' },
    ];

    return (
        <div className="pt-28 md:pt-36 pb-16 bg-gray-50 min-h-screen">

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-purple-600 to-pink-600 text-white py-20 px-4">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }}
                />
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
                        className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Sparkles size={16} />
                        <span>Est. 2016 — Machilipatnam, Andhra Pradesh</span>
                    </motion.div>
                    <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
                        className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Making Memories That <br />
                        <span className="text-yellow-300">Last a Lifetime</span>
                    </motion.h1>
                    <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
                        className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
                        We are Sree Neha Events — a passionate team dedicated to transforming your special occasions into extraordinary experiences full of joy, elegance, and warmth.
                    </motion.p>
                </div>
            </section>

            {/* Stats */}
            <section className="container mx-auto max-w-5xl px-4 -mt-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                            className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600 mb-3">
                                {stat.icon}
                            </div>
                            <p className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">{stat.value}</p>
                            <p className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Our Story */}
            <section className="container mx-auto max-w-5xl px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Story</span>
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6" />
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Sree Neha Events was born from a simple belief — that every celebration deserves to be extraordinary. Founded in Machilipatnam, we started as a small wedding planning service and have grown into a full-service event management company trusted by hundreds of families across Andhra Pradesh.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Our journey began with a passion for bringing smiles to people's faces on their most important days. Today, we bring that same passion to every birthday party, wedding ceremony, corporate event, and cultural celebration we undertake.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            From intimate gatherings to grand celebrations, we handle every aspect of event planning with professionalism, creativity, and care — so you can simply enjoy the moment.
                        </p>
                    </motion.div>
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
                        className="relative">
                        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl">
                            <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
                            <p className="leading-relaxed text-purple-100 mb-6">
                                To create magical celebrations that reflect your unique story, bringing people together through beautifully organised events that exceed expectations.
                            </p>
                            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                            <p className="leading-relaxed text-purple-100">
                                To be the most trusted and celebrated event management company in Andhra Pradesh, known for our creativity, reliability, and heartfelt service.
                            </p>
                        </div>
                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-2xl opacity-20 blur-xl" />
                        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-pink-400 rounded-2xl opacity-20 blur-xl" />
                    </motion.div>
                </div>
            </section>

            {/* Services We Offer */}
            <section className="bg-white py-16 px-4">
                <div className="container mx-auto max-w-5xl">
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                            What We <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Offer</span>
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto">From planning to execution, we cover every aspect of your event with care and expertise.</p>
                    </motion.div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {services.map((s, i) => (
                            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1}
                                className="p-6 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all group cursor-default">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                                    {s.icon}
                                </div>
                                <h3 className="font-bold text-gray-800 mb-2">{s.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="container mx-auto max-w-5xl px-4 py-16">
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                        Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Us?</span>
                    </h2>
                </motion.div>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: 'Personalised Approach', desc: 'Every event is unique. We listen to your vision and tailor everything to match your style and budget.', emoji: '🎯' },
                        { title: 'Experienced Team', desc: '8+ years of experience means we\'ve seen it all — and we know how to handle any situation gracefully.', emoji: '💼' },
                        { title: 'End-to-End Service', desc: 'From initial consultation to the final clean-up, we manage everything so you\'re stress-free on your big day.', emoji: '✅' },
                        { title: 'Premium Vendors', desc: 'We work with a trusted network of vendors — photographers, caterers, decorators — to ensure top quality.', emoji: '🤝' },
                        { title: 'Transparent Pricing', desc: 'No hidden costs. We provide detailed quotes and stick to the agreed budget.', emoji: '💰' },
                        { title: 'Memories for Life', desc: 'Our goal is simple: when you look back, you\'ll smile. We create moments that last a lifetime.', emoji: '❤️' },
                    ].map((item, i) => (
                        <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <span className="text-3xl mb-3 block">{item.emoji}</span>
                            <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Team */}
            <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-16 px-4">
                <div className="container mx-auto max-w-5xl">
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                            Meet the <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Team</span>
                        </h2>
                        <p className="text-gray-500">The passionate people behind every memorable event.</p>
                    </motion.div>
                    <div className="flex flex-wrap justify-center gap-8">
                        {team.map((member, i) => (
                            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.15}
                                className="bg-white rounded-2xl p-8 shadow-md text-center w-60 hover:shadow-xl transition-shadow">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                                    {member.initial}
                                </div>
                                <h3 className="font-bold text-gray-800 text-lg">{member.name}</h3>
                                <p className="text-sm text-purple-600 mt-1">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="container mx-auto max-w-4xl px-4 py-16">
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-10 text-white text-center shadow-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Plan Your Dream Event!</h2>
                    <p className="text-purple-100 mb-8 text-lg max-w-xl mx-auto">
                        Ready to make your celebration extraordinary? Get in touch with us today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="tel:+919014444665"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-700 font-bold rounded-full hover:shadow-lg transition-all hover:-translate-y-0.5">
                            <Phone size={18} /> +91 9014444665
                        </a>
                        <a href="mailto:srinehaevents@gmail.com"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur text-white font-bold rounded-full border-2 border-white/40 hover:bg-white/30 transition-all hover:-translate-y-0.5">
                            <Mail size={18} /> srinehaevents@gmail.com
                        </a>
                    </div>
                    <p className="mt-6 text-purple-200 flex items-center justify-center gap-2 text-sm">
                        <MapPin size={16} /> Machilipatnam, Andhra Pradesh, India
                    </p>
                </motion.div>
            </section>

        </div>
    );
};

export default About;
