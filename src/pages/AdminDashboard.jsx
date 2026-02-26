import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash, Edit, X, Save, Search, LayoutGrid, List } from 'lucide-react';
import API_BASE_URL from '../config';

const AdminDashboard = () => {
    const [services, setServices] = useState([]);
    const [banners, setBanners] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentService, setCurrentService] = useState({
        title: '', image: '', category: 'Birthday', customCategory: '', price: '', duration: '', location: '', youtubeLink: '', description: '', terms: '', fromYourEnd: ''
    });
    const [serviceImageFile, setServiceImageFile] = useState(null);
    const [newBannerFile, setNewBannerFile] = useState(null);
    const [isUploadingBanner, setIsUploadingBanner] = useState(false);
    const [activeTab, setActiveTab] = useState('services'); // 'services' or 'banners'

    const categories = ['Birthday', 'Wedding', 'Decoration', 'Photography', 'Catering', 'Entertainment', 'Other'];

    useEffect(() => {
        fetchServices();
        fetchBanners();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/services`);
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const fetchBanners = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/banners`);
            setBanners(response.data);
        } catch (error) {
            console.error('Error fetching banners:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentService({ ...currentService, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            // Append all text fields
            Object.keys(currentService).forEach(key => {
                // Skip the temporary customCategory field
                if (key === 'customCategory') return;

                // Handle custom category logic
                if (key === 'category' && currentService.category === 'Other' && currentService.customCategory.trim() !== '') {
                    formData.append('category', currentService.customCategory.trim());
                } else {
                    formData.append(key, currentService[key]);
                }
            });

            // Append the actual file if one was selected
            if (serviceImageFile) {
                formData.append('imageFile', serviceImageFile);
            }

            if (isEditing) {
                await axios.put(`${API_BASE_URL}/api/services/${currentService._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            } else {
                await axios.post(`${API_BASE_URL}/api/services`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            }
            fetchServices();
            resetForm();
        } catch (error) {
            console.error('Error saving service:', error);
            alert('Error saving service.');
        }
    };

    const handleEdit = (service) => {
        const isStandardCategory = categories.includes(service.category);
        setCurrentService({
            ...service,
            category: isStandardCategory ? service.category : 'Other',
            customCategory: isStandardCategory ? '' : service.category
        });
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await axios.delete(`${API_BASE_URL}/api/services/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                fetchServices();
            } catch (error) {
                console.error('Error deleting service:', error);
            }
        }
    };

    const handleBannerUpload = async (e) => {
        e.preventDefault();
        if (!newBannerFile) return;

        setIsUploadingBanner(true);
        const formData = new FormData();
        formData.append('image', newBannerFile);

        try {
            await axios.post(`${API_BASE_URL}/api/banners`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setNewBannerFile(null);
            document.getElementById('bannerFileInput').value = ''; // Reset input
            fetchBanners();
        } catch (error) {
            console.error('Error uploading banner:', error);
            alert('Failed to upload banner');
        } finally {
            setIsUploadingBanner(false);
        }
    };

    const handleDeleteBanner = async (id) => {
        if (window.confirm('Are you sure you want to delete this banner?')) {
            try {
                await axios.delete(`${API_BASE_URL}/api/banners/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                fetchBanners();
            } catch (error) {
                console.error('Error deleting banner:', error);
            }
        }
    };

    const resetForm = () => {
        setCurrentService({
            title: '', image: '', category: 'Birthday', customCategory: '', price: '', duration: '', location: '', youtubeLink: '', description: '', terms: '', fromYourEnd: ''
        });
        setServiceImageFile(null);
        const fileInput = document.getElementById('serviceFileInput');
        if (fileInput) fileInput.value = '';
        setIsEditing(false);
    };

    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 py-8 pb-20 pt-28 md:pt-36"
        >
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4 md:mb-0 text-center md:text-left">
                    Admin Dashboard
                </h1>

                <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1 mb-4 md:mb-0">
                    <button
                        onClick={() => setActiveTab('services')}
                        className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'services' ? 'bg-purple-100 text-purple-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Services
                    </button>
                    <button
                        onClick={() => setActiveTab('banners')}
                        className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'banners' ? 'bg-purple-100 text-purple-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Banners
                    </button>
                </div>

                {activeTab === 'services' && (
                    <div className="relative w-full md:w-auto">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none w-full md:w-64 transition-all"
                        />
                    </div>
                )}
            </div>

            {activeTab === 'services' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-1">
                        <div className="glass rounded-2xl p-6 shadow-xl sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold flex items-center text-gray-800">
                                    {isEditing ? <Edit className="mr-2 text-purple-600" size={20} /> : <Plus className="mr-2 text-green-600" size={20} />}
                                    {isEditing ? 'Edit Service' : 'Add New Service'}
                                </h2>
                                {isEditing && (
                                    <button onClick={resetForm} className="text-gray-400 hover:text-red-500 transition-colors">
                                        <X size={20} />
                                    </button>
                                )}
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
                                    <input type="text" name="title" placeholder="e.g. Grand Wedding" value={currentService.title} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image Upload (File)</label>
                                    <input
                                        type="file"
                                        id="serviceFileInput"
                                        accept="image/*"
                                        onChange={(e) => setServiceImageFile(e.target.files[0])}
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-all mb-2"
                                    />
                                    <label className="block text-xs font-medium text-gray-500 mb-1">OR provide an Image URL (if no file is uploaded)</label>
                                    <input type="text" name="image" placeholder="https://..." value={currentService.image} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                        <select name="category" value={currentService.category} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all bg-white mb-2">
                                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                        {currentService.category === 'Other' && (
                                            <input
                                                type="text"
                                                name="customCategory"
                                                placeholder="Custom Category Name"
                                                value={currentService.customCategory}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                        <input type="text" name="price" placeholder="e.g. 5000" value={currentService.price} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                        <input type="text" name="duration" placeholder="e.g. 4 hrs" value={currentService.duration} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        <input type="text" name="location" placeholder="e.g. Hyderabad" value={currentService.location} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Video Link (Optional)</label>
                                    <input type="text" name="youtubeLink" placeholder="e.g. https://www.youtube.com/watch?v=..." value={currentService.youtubeLink || ''} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea name="description" placeholder="Service details..." value={currentService.description} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all" rows="3"></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">From Your End (Requirements)</label>
                                    <textarea name="fromYourEnd" placeholder="What you need from the client..." value={currentService.fromYourEnd} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all" rows="2"></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Terms & Conditions</label>
                                    <textarea name="terms" placeholder="Terms apply..." value={currentService.terms} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all" rows="2"></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transform transition-all hover:scale-[1.02] flex items-center justify-center ${isEditing ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-gradient-to-r from-purple-600 to-pink-600'
                                        }`}
                                >
                                    <Save size={18} className="mr-2" />
                                    {isEditing ? 'Update Service' : 'Add Service'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* List Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                                <h3 className="font-bold text-gray-700 flex items-center">
                                    <List size={18} className="mr-2" /> Existing Services ({filteredServices.length})
                                </h3>
                            </div>

                            {/* Mobile Optimized View (Cards) */}
                            <div className="block md:hidden">
                                <AnimatePresence>
                                    {filteredServices.map(service => (
                                        <motion.div
                                            key={service._id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="p-4 border-b border-gray-100 flex items-center space-x-4"
                                        >
                                            <div className="h-14 w-14 flex-shrink-0">
                                                <img className="h-full w-full rounded-lg object-cover shadow-sm" src={service.image} alt="" />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="text-sm font-bold text-gray-900">{service.title}</div>
                                                <div className="text-xs text-gray-500 mb-1">{service.category}</div>
                                                <div className="text-xs font-semibold text-purple-600">{service.price ? `₹${service.price}` : '-'}</div>
                                            </div>
                                            <div className="flex flex-col space-y-2">
                                                <button
                                                    onClick={() => handleEdit(service)}
                                                    className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(service._id)}
                                                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                                                >
                                                    <Trash size={16} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Desktop View (Table) */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        <AnimatePresence>
                                            {filteredServices.map(service => (
                                                <motion.tr
                                                    key={service._id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    layout
                                                    className="hover:bg-purple-50/50 transition-colors"
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            <div className="h-10 w-10 flex-shrink-0">
                                                                <img className="h-10 w-10 rounded-full object-cover shadow-sm" src={service.image} alt="" />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{service.title}</div>
                                                                <div className="text-xs text-gray-500 truncate max-w-[150px]">{service.location}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                                                            {service.category}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {service.price ? `₹${service.price}` : '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex justify-end space-x-3">
                                                            <button
                                                                onClick={() => handleEdit(service)}
                                                                className="text-indigo-500 hover:text-indigo-700 transition-colors p-1 hover:bg-indigo-50 rounded"
                                                                title="Edit"
                                                            >
                                                                <Edit size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(service._id)}
                                                                className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded"
                                                                title="Delete"
                                                            >
                                                                <Trash size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>
                            {filteredServices.length === 0 && (
                                <div className="text-center py-10 text-gray-400">
                                    No services found matching your search.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                /* Banners Tab */
                <div className="space-y-8">
                    {/* Upload Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                        <h2 className="text-xl font-bold flex items-center text-gray-800 mb-4">
                            <Plus className="mr-2 text-purple-600" size={20} /> Upload New Banner
                        </h2>
                        <form onSubmit={handleBannerUpload} className="flex flex-col md:flex-row gap-4 items-center">
                            <input
                                type="file"
                                id="bannerFileInput"
                                accept="image/*"
                                onChange={(e) => setNewBannerFile(e.target.files[0])}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                                required
                            />
                            <button
                                type="submit"
                                disabled={isUploadingBanner || !newBannerFile}
                                className={`w-full md:w-auto px-6 py-2 rounded-xl font-bold text-white shadow-lg transition-all ${isUploadingBanner || !newBannerFile ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-[1.02]'}`}
                            >
                                {isUploadingBanner ? 'Uploading...' : 'Upload Banner'}
                            </button>
                        </form>
                    </div>

                    {/* Banner Grid */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden p-6">
                        <h3 className="font-bold text-gray-700 flex items-center mb-6">
                            <LayoutGrid size={18} className="mr-2" /> Manage Existing Banners ({banners.length})
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {banners.map((banner) => (
                                    <motion.div
                                        key={banner._id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="relative group rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                                    >
                                        <img
                                            src={banner.imageUrl}
                                            alt="Banner"
                                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <button
                                                onClick={() => handleDeleteBanner(banner._id)}
                                                className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 shadow-lg transform hover:scale-110 transition-all"
                                                title="Delete Banner"
                                            >
                                                <Trash size={20} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        {banners.length === 0 && (
                            <div className="text-center py-10 text-gray-400">
                                No banners uploaded yet.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default AdminDashboard;
