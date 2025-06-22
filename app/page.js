import Crousel from "@/components/Crousel";
import Notification from "@/components/Notification";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <Crousel />
      <Notification />
      <div className="flex justify-center items-center">
        <div className="w-full">
          <Image
            src={'/herosection-1.jpg'}
            alt="Schlorship image"
            width={600}
            height={800}
          />
        </div>
        <div className="w-full">
          <div className="text-4xl font-medium my-2 hover:border w-fit p-2 rounded-md hover:bg-blue-500 hover:text-white cursor-pointer">Apply Now</div>
          <h1 className="text-4xl my-2 font-semibold">Student Excellence Scholarship!</h1>
          
          <p className="">Empowering talented students to achieve their dreams. If you’ve excelled in academics, competitive exams, or contributed to your community — apply today and take the next step toward success!</p>
        </div>
      </div>
    </>

  );
}
