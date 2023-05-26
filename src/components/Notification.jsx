import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const Notification = ({ message, type, timeout }) => {
    const [showNotification, setShowNotification] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotification(false);
        }, timeout);

        return () => {
            clearTimeout(timer);
        };
    }, [timeout]);

    if (!showNotification) {
        return null;
    }

    let notificationClassName = 'fixed top-0 left-1/2 transform -translate-x-1/2 w-64 p-4 rounded-md';
    if (type === 'success') {
        notificationClassName += ' bg-green-500 text-white';
    } else if (type === 'error') {
        notificationClassName += ' bg-red-500 text-white';
    } else {
        notificationClassName += ' bg-gray-500 text-white';
    }

    return (
        <div className={notificationClassName}>
            <p>{message}</p>
        </div>
    );
};

export default Notification;
