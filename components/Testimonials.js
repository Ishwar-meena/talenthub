// components/Testimonials.jsx
import Image from "next/image";
export default function Testimonials() {
    const testimonials = [
        {
            name: "Aarav Singh",
            role: "B.Tech Student",
            quote:
                "Thanks to the scholarship, I could focus on my studies without worrying about tuition. It's a life-changer!",
            image: "/student1.avif",
        },
        {
            name: "Sneha Patel",
            role: "Medical Aspirant",
            quote:
                "This support gave me the confidence to pursue my dreams. Thank you for believing in me!",
            image: "/student2.avif",
        },
        {
            name: "Rahul Verma",
            role: "Commerce Student",
            quote:
                "Financial support at the right time made all the difference. Truly grateful for this opportunity!",
            image: "/student3.jpg",
        },
    ];

    return (
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-10">What Our Students Say</h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((t, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition text-left flex flex-col items-start"
                        >
                            <p className="text-gray-600 italic">&quot;{t.quote}&quot;</p>
                            <div className="flex items-center mt-6">
                                <Image
                                    height={48}
                                    width={48}
                                    src={t.image}
                                    alt={t.name}
                                    className="w-12 h-12 rounded-full object-cover mr-4"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">{t.name}</p>
                                    <p className="text-sm text-gray-500">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
