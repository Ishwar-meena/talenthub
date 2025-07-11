import { Geist, Geist_Mono,Poppins } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable:'--font-poppins',
  subsets: ["latin"],
  weight: ["400", "700"], // Add weights you need
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable}  antialiased`}
        >
          <Navbar/>
          {children}
          <Footer/>
          <ToastContainer/>
        </body>
      </SessionWrapper>
    </html>
  );
}
