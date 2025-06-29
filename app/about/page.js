// pages/About.jsx or components/AboutUs.jsx
import Image from 'next/image';
import { FaHeart, FaUsers, FaAward } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-blue-50 py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            About Our Mission
          </h1>
          <p className="text-lg text-gray-600">
            We are a non-profit organization dedicated to supporting and empowering talented students by providing them with scholarships to chase their academic dreams.
          </p>
        </div>
      </section>

      {/* Zigzag Section */}
      <section className="py-16 px-4 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="/crousel3.jpg"
              alt="Students"
              width={600}
              height={400}
              className="rounded-xl shadow-md"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-4">Why We Exist</h2>
            <p className="text-gray-600 leading-relaxed">
              In many parts of the country, talented students are unable to continue their education due to financial constraints. Our NGO aims to bridge that gap by identifying deserving students and supporting them financially so they can unlock their full potential.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-slate-100 py-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <FaUsers className="text-3xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Inclusivity</h3>
              <p className="text-gray-600 text-sm">
                We support students from all backgrounds and regions with equal care and opportunity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <FaHeart className="text-3xl text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Empathy</h3>
              <p className="text-gray-600 text-sm">
                We listen, understand, and act with compassion to remove financial barriers to education.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <FaAward className="text-3xl text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">
                We invest in high-potential students committed to making a positive impact.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
