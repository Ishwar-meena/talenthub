'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
const images = [
    "/crousel1.jpg",
    "/crousel2.jpg",
    "/crousel3.jpg",
    "/crousel4.jpg",
    "/crousel5.jpg",
];

export default function Crousel() {
    const [currentIdx, setCurrentIdx] = useState(0);

    const handlePrev = () => {
        setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };


    // Auto-scroll every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="w-full  mx-auto">
            <div className="relative w-full  md:min-h-[86vh] h-[22rem]  overflow-hidden shadow-lg">
                <Image
                    width={1400}
                    height={1200}
                    src={images[currentIdx]}
                    alt={`carousel${currentIdx + 1}`}
                    className="w-full h-full object-cover"
                    priority
                />
                {/* Prev Button */}
                <button
                    onClick={handlePrev}
                    className="absolute cursor-pointer top-1/2 left-4 -translate-y-1/2 bg-gray-300/70 hover:bg-white text-gray-700 rounded-full p-2 shadow transition"
                    aria-label="Previous"
                >
                    <Image
                        height={32}
                        width={32}
                        src={'/back.svg'}
                        alt="Previous"
                        className="md:h-6 md:w-6 h-4 w-4"
                    />
                </button>
                {/* Next Button */}
                <button
                    onClick={handleNext}
                    className="absolute cursor-pointer top-1/2 right-4 -translate-y-1/2 bg-gray-300/70 hover:bg-white text-gray-700 rounded-full p-2 shadow transition"
                    aria-label="Next"
                >
                    <Image
                        height={32}
                        width={32}
                        src={'/next.svg'}
                        alt="Next"
                        className="md:h-6 md:w-6 h-4 w-4"
                    />
                </button>
                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIdx(idx)}
                            className={`w-3 h-3 rounded-full ${currentIdx === idx ? 'bg-blue-500' : 'bg-gray-300'} border border-white`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}