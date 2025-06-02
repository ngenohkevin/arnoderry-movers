import styles, { layout } from '../style.js';
import { useState } from 'react';
import whatsappService from '../services/whatsapp.js';
import Toast from './Toast.jsx';

const FreeQuote = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        movingTo: '',
        movingFrom: '',
        movingDate: '',
        moveType: 'house',
        bedrooms: '',
        staffCount: '',
        cleaningServices: false,
    });

    const [notification, setNotification] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const showToast = (message, type = 'info') => {
        setNotification({ message, type, id: Date.now() });
    };

    const hideToast = () => {
        setNotification(null);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        setFormData((prevData) => ({ ...prevData, [name]: fieldValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const requiredFields = ['fullName', 'email', 'phone', 'movingTo', 'movingFrom', 'movingDate'];
        const hasEmptyField = requiredFields.some((field) => !formData[field]);

        // Check for specific fields based on move type
        if (formData.moveType === 'house' && !formData.bedrooms) {
            showToast('Please select the number of bedrooms for house moving', 'error');
            setIsSubmitting(false);
            return;
        }

        if (formData.moveType === 'office' && !formData.staffCount) {
            showToast('Please enter the number of staff for office moving', 'error');
            setIsSubmitting(false);
            return;
        }

        if (hasEmptyField) {
            showToast('Please fill in all required fields', 'error');
            setIsSubmitting(false);
            return;
        }

        try {
            // Submit quote with Telegram as primary method
            const result = await whatsappService.submitQuoteRequest(formData);
            
            if (result.method === 'telegram') {
                showToast('✅ Quote submitted successfully! We\'ll contact you within 24 hours.', 'success');
            } else if (result.method === 'email') {
                showToast('📧 Quote sent via email! We\'ll contact you within 24 hours.', 'success');
            } else {
                showToast('💾 Quote saved! We\'ll contact you within 24 hours.', 'success');
            }
            
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                movingTo: '',
                movingFrom: '',
                movingDate: '',
                moveType: 'house',
                bedrooms: '',
                staffCount: '',
                cleaningServices: false,
            });

        } catch (error) {
            showToast('❌ Failed to submit quote. Please try the WhatsApp option below or call us directly.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // const handleWhatsAppDirect = () => {
    //     const requiredFields = ['movingTo', 'movingFrom', 'movingDate'];
    //     const hasEmptyRequired = requiredFields.some((field) => !formData[field]);
    //
    //     if (hasEmptyRequired) {
    //         showToast('Please fill Moving To, Current Location, and Date before sending via WhatsApp', 'error');
    //         return;
    //     }
    //
    //     const whatsappLink = whatsappService.generateWhatsAppLink(formData);
    //     window.open(whatsappLink, '_blank');
    //     showToast('📱 Opening WhatsApp... Please send the pre-filled message to complete your quote request.', 'success');
    // };

    // const isWhatsAppButtonDisabled = !formData.movingTo || !formData.movingFrom || !formData.movingDate;

    return (
        <section id="free-quote" className={`${layout.section} scroll-mt-32 relative overflow-hidden`}>
            {/* Background decorative elements */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl" />
            
            <div className="w-full max-w-6xl mx-auto relative z-10">
                <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h3 className={`${styles.heading2} text-gradient mb-4`}>Get Your Free Quote</h3>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                            Tell us about your moving needs and we`ll provide you with a personalized quote within 24 hours.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gradient">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800/50 border border-gray-600/50 text-white py-3 px-4 rounded-2xl 
                                        focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                                        placeholder-gray-400 transition-all duration-300 backdrop-blur-sm"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gradient">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800/50 border border-gray-600/50 text-white py-3 px-4 rounded-2xl 
                                        focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                                        placeholder-gray-400 transition-all duration-300 backdrop-blur-sm"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gradient">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800/50 border border-gray-600/50 text-white py-3 px-4 rounded-2xl 
                                        focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                                        placeholder-gray-400 transition-all duration-300 backdrop-blur-sm"
                                    placeholder="0712 345 678"
                                    required
                                />
                            </div>
                        </div>

                        {/* Moving Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gradient">
                                    Moving To *
                                </label>
                                <input
                                    type="text"
                                    name="movingTo"
                                    value={formData.movingTo}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800/50 border border-gray-600/50 text-white py-3 px-4 rounded-2xl 
                                        focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                                        placeholder-gray-400 transition-all duration-300 backdrop-blur-sm"
                                    placeholder="Destination address"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gradient">
                                    Current Location *
                                </label>
                                <input
                                    type="text"
                                    name="movingFrom"
                                    value={formData.movingFrom}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800/50 border border-gray-600/50 text-white py-3 px-4 rounded-2xl 
                                        focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                                        placeholder-gray-400 transition-all duration-300 backdrop-blur-sm"
                                    placeholder="Current address"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gradient">
                                    Moving Date *
                                </label>
                                <input
                                    type="date"
                                    name="movingDate"
                                    value={formData.movingDate}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800/50 border border-gray-600/50 text-white py-3 px-4 rounded-2xl 
                                        focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                                        transition-all duration-300 backdrop-blur-sm"
                                    required
                                />
                            </div>
                        </div>

                        {/* Moving Type and Specifications */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gradient">
                                    Moving Type *
                                </label>
                                <select
                                    name="moveType"
                                    value={formData.moveType}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800/50 border border-gray-600/50 text-white py-3 px-4 rounded-2xl 
                                        focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                                        transition-all duration-300 backdrop-blur-sm"
                                    required
                                >
                                    <option value="house">🏠 House Moving</option>
                                    <option value="office">🏢 Office Moving</option>
                                </select>
                            </div>
                            
                            {formData.moveType === 'house' && (
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gradient">
                                        Number of Bedrooms
                                    </label>
                                    <select
                                        name="bedrooms"
                                        value={formData.bedrooms}
                                        onChange={handleChange}
                                        className="w-full bg-gray-800/50 border border-gray-600/50 text-white py-3 px-4 rounded-2xl 
                                            focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                                            transition-all duration-300 backdrop-blur-sm"
                                        required
                                    >
                                        <option value="">Select bedrooms</option>
                                        <option value="1">1 Bedroom</option>
                                        <option value="2">2 Bedrooms</option>
                                        <option value="3">3 Bedrooms</option>
                                        <option value="4">4 Bedrooms</option>
                                        <option value="5+">5+ Bedrooms</option>
                                    </select>
                                </div>
                            )}
                            
                            {formData.moveType === 'office' && (
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gradient">
                                        Number of Staff
                                    </label>
                                    <input
                                        type="number"
                                        name="staffCount"
                                        value={formData.staffCount}
                                        onChange={handleChange}
                                        className="w-full bg-gray-800/50 border border-gray-600/50 text-white py-3 px-4 rounded-2xl 
                                            focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                                            placeholder-gray-400 transition-all duration-300 backdrop-blur-sm"
                                        placeholder="Number of employees"
                                        required
                                    />
                                </div>
                            )}
                        </div>

                        {/* Additional Services */}
                        <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-600/30">
                            <h4 className="text-white font-semibold mb-4 flex items-center">
                                <span className="text-blue-400 mr-2">✨</span>
                                Additional Services
                            </h4>
                            <label className="flex items-center space-x-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="cleaningServices"
                                    checked={formData.cleaningServices}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 
                                        focus:ring-blue-500 focus:ring-2 transition-colors duration-200"
                                />
                                <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                                    🧹 Include professional cleaning services
                                </span>
                            </label>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 
                                    text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300
                                    hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/25 
                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                                    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900
                                    text-sm sm:text-base"
                            >
                                <span className="relative z-10 flex items-center justify-center space-x-2">
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>📧</span>
                                            <span>Submit Quote Request</span>
                                        </>
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </button>
                            
                            {/*<button*/}
                            {/*    type="button"*/}
                            {/*    onClick={handleWhatsAppDirect}*/}
                            {/*    disabled={isWhatsAppButtonDisabled}*/}
                            {/*    className="flex-1 group relative overflow-hidden bg-green-600 hover:bg-green-700 */}
                            {/*        text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300*/}
                            {/*        hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/25*/}
                            {/*        disabled:bg-gray-600 disabled:cursor-not-allowed disabled:hover:scale-100*/}
                            {/*        focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2 focus:ring-offset-gray-900*/}
                            {/*        text-sm sm:text-base"*/}
                            {/*>*/}
                            {/*    <span className="relative z-10 flex items-center justify-center space-x-2">*/}
                            {/*        <span>💬</span>*/}
                            {/*        <span>Send via WhatsApp</span>*/}
                            {/*    </span>*/}
                            {/*</button>*/}
                        </div>

                        {/* Help Text */}
                        <div className="text-center pt-4">
                            <p className="text-gray-500 text-sm">
                                * Required fields. We`ll respond within 24 hours with your personalized quote.
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            {/* Toast Notification */}
            {notification && (
                <Toast 
                    key={notification.id}
                    message={notification.message} 
                    type={notification.type} 
                    onClose={hideToast}
                />
            )}
        </section>
    );
};

export default FreeQuote;