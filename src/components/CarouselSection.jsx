// import { useState } from 'react';
//
//
// const CarouselSection = () => {
//     // const images = [move1, move2, move3]; // Replace move1, move2, move3 with your actual image URLs
//
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//
//     const goToNextImage = () => {
//         const nextIndex = (currentImageIndex + 1) % images.length;
//         setCurrentImageIndex(nextIndex);
//     };
//
//     const goToPreviousImage = () => {
//         const previousIndex = (currentImageIndex - 1 + images.length) % images.length;
//         setCurrentImageIndex(previousIndex);
//     };
//
//     return (
//         <section className="flex items-center justify-center">
//             <div className="max-w-3xl mx-auto">
//                 <div className="relative">
//                     <img
//                         src={images[currentImageIndex]}
//                         alt={`Image ${currentImageIndex + 1}`}
//                         className="w-full h-auto rounded"
//                     />
//                     <button
//                         className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
//                         onClick={goToPreviousImage}
//                     >
//                         &lt;
//                     </button>
//                     <button
//                         className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
//                         onClick={goToNextImage}
//                     >
//                         &gt;
//                     </button>
//                 </div>
//             </div>
//         </section>
//     );
// };
//
// export default CarouselSection;
