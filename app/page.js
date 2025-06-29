'use client';
import Crousel from "@/components/Crousel";
import ImpactStats from "@/components/ImpactStats";
import Notification from "@/components/Notification";
import Testimonials from "@/components/Testimonials";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <Crousel />
      <Notification />
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="w-full">
            <Image
              src="/herosection-1.jpg"
              alt="Scholarship image"
              width={600}
              height={800}
              className="w-full h-auto rounded-xl shadow-md object-cover"
            />
          </div>
          {/* Content */}
          <div className="w-full">
            <button className="text-lg font-semibold bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-700 transition duration-300 shadow-md">
              <Link href={'/scholarship'}> Apply Now</Link>
            </button>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mt-6">
              Student Excellence Scholarship!
            </h1>

            <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
              Empowering talented students to achieve their dreams. If you’ve
              excelled in academics, competitive exams, or contributed to your
              community — apply today and take the next step toward success!
            </p>
          </div>
        </div>
      </section>
      <div>
        <ImpactStats />
      </div>
      <div>
        <Testimonials />
      </div>
    </>

  );
}
