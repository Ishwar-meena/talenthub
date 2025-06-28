// components/ImpactStats.jsx
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaUserGraduate, FaRupeeSign, FaUsers } from "react-icons/fa"; // Optional: Font Awesome icons

const ImpactStats = () => {
    const { ref, inView } = useInView();

    const stats = [
        {
            label: "Students Got Scholarship",
            value: 1500,
            suffix: "+",
            decimals: 0,
            icon: <FaUserGraduate className="text-indigo-500 text-3xl mb-2" />,
        },
        {
            label: "Total Funds Distributed",
            value: 4.5,
            suffix: " Cr",
            decimals: 1,
            icon: <FaRupeeSign className="text-green-500 text-3xl mb-2" />,
        },
        {
            label: "Registered Students",
            value: 9000,
            suffix: "+",
            decimals: 0,
            icon: <FaUsers className="text-blue-500 text-3xl mb-2" />,
        },
    ];

    return (
        <section className="bg-white py-12 px-4 sm:px-6 lg:px-8" ref={ref}>
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Impact</h2>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-2xl p-6 shadow hover:shadow-lg transition"
                        >
                            {stat.icon}
                            <p className="text-3xl font-extrabold text-indigo-600">
                                {inView ? (
                                    <CountUp
                                        end={stat.value}
                                        duration={2}
                                        suffix={stat.suffix}
                                        decimals={stat.decimals}
                                        separator=","
                                    />
                                ) : (
                                    "0"
                                )}
                            </p>
                            <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactStats;
