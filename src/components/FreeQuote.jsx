import styles, { layout } from '../style.js';
import { useState } from 'react';

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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        setFormData((prevData) => ({ ...prevData, [name]: fieldValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);

        // Reset form fields
        setFormData({
            fullName: '',
            email: '',
            phone: '',
            movingTo: '',
            movingFrom: '',
            movingDate: '',
            moveType: 'house',
            bedrooms: '1',
            staffCount: '',
            cleaningServices: false,
        });
    };


    return (
        <section id="free-quote" className={layout.section}>
            <div className={`bg-black-gradient flex-1 ml-6 p-6 rounded-[40px] text-[15px] font-poppins font-normal text-white`}>
                <h3 className={`${styles.heading2} text-gradient`}>Free Quote</h3>
                <form onSubmit={handleSubmit}>
                    <div className="grid-cols-3 gap-4 mt-3 md:grid">
                        <div className="mt-3">
                            <label className="font-poppins font-normal xs:text-[20px] text-[14px] xs:leading-[26px] leading-[21px] text-gradient ml-3">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full bg-gray-800 border border-gray-700 text-white py-2 px-3 rounded-full focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mt-3">
                            <label className="font-poppins font-normal xs:text-[20px] text-[14px] xs:leading-[26px] leading-[21px] text-gradient ml-3">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-gray-800 border border-gray-700 text-white py-2 px-3 rounded-full focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mt-3">
                            <label className="font-poppins font-normal xs:text-[20px] text-[14px] xs:leading-[26px] leading-[21px] text-gradient ml-3">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full bg-gray-800 border border-gray-700 text-white py-2 px-3 rounded-full focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mt-3">
                            <label className="font-poppins font-normal xs:text-[20px] text-[14px] xs:leading-[26px] leading-[21px] text-gradient ml-3">Moving To</label>
                            <input
                                type="text"
                                name="movingTo"
                                value={formData.movingTo}
                                onChange={handleChange}
                                className="w-full bg-gray-800 border border-gray-700 text-white py-2 px-3 rounded-full focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mt-3">
                            <label className="font-poppins font-normal xs:text-[20px] text-[14px] xs:leading-[26px] leading-[21px] text-gradient ml-3">Current Location</label>
                            <input
                                type="text"
                                name="movingFrom"
                                value={formData.movingFrom}
                                onChange={handleChange}
                                className="w-full bg-gray-800 border border-gray-700 text-white py-2 px-3 rounded-full focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mt-3">
                            <label className="font-poppins font-normal xs:text-[20px] text-[14px] xs:leading-[26px] leading-[21px] text-gradient ml-3">Date of Moving</label>
                            <input
                                type="date"
                                name="movingDate"
                                value={formData.movingDate}
                                onChange={handleChange}
                                className="w-full bg-gray-800 border border-gray-700 text-white py-2 px-3 rounded-full focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mt-3">
                            <label className="font-poppins font-normal xs:text-[20px] text-[14px] xs:leading-[26px] leading-[21px] text-gradient ml-3">Moving Type</label>
                            <select
                                name="moveType"
                                value={formData.moveType}
                                onChange={handleChange}
                                className="w-full bg-gray-800 border border-gray-700 text-white py-2 px-3 rounded-full focus:outline-none focus:border-blue-500"
                                required
                            >
                                <option value="house">House Moving</option>
                                <option value="office">Office Moving</option>
                            </select>
                        </div>
                        {formData.moveType === 'house' && (
                            <div className="mt-3">
                                <label className="font-poppins font-normal xs:text-[20px] text-[14px] xs:leading-[26px] leading-[21px] text-gradient ml-3">Number of Bedrooms</label>
                                <select
                                    name="bedrooms"
                                    value={formData.bedrooms}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800 border border-gray-700 text-white py-2 px-3 rounded-full focus:outline-none focus:border-blue-500"
                                    required
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5+">5+</option>
                                </select>
                            </div>
                        )}
                        {formData.moveType === 'office' && (
                            <div className="mt-3">
                                <label className="font-poppins font-normal xs:text-[20px] text-[14px] xs:leading-[26px] leading-[21px] text-gradient ml-3">Number of Staff</label>
                                <input
                                    type="number"
                                    name="staffCount"
                                    value={formData.staffCount}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800 border border-gray-700 text-white py-2 px-3 rounded-full focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                        )}
                        <div className="col-span-3">
                            <label className="font-poppins font-normal xs:text-[20px] text-[14px] xs:leading-[26px] leading-[21px] text-gradient ml-3">
                                <input
                                    type="checkbox"
                                    name="cleaningServices"
                                    checked={formData.cleaningServices}
                                    onChange={handleChange}
                                    className="mr-3 mt-4"
                                />
                                Cleaning Services
                            </label>
                        </div>
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Billing;
