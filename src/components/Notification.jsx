

// eslint-disable-next-line react/prop-types
const Notification = ({ message, isError }) => {
    const notificationClassName = isError ? 'bg-red-500' : 'bg-green-500';
    const textColorClassName = isError ? 'text-white' : 'text-black';

    return (
        <div className={`py-2 px-4 rounded-md ${notificationClassName} ${textColorClassName}`}>
            {message}
        </div>
    );
};

export default Notification;
