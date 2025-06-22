'use client';
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { data: session } = useSession()
  const [profile, setProfile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = async () => {
    await signOut({ redirect: false });
    toast.success("You have logged out successfully!");
  };

  useEffect(() => {
    if(session?.user?.image){
      setProfile(session.user.image);
    }
  }, [session])
  


  return (
    <nav className="bg-gray-100 shadow-md text-black">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div className="text-2xl font-medium">
          <Link href="/">TalentHub</Link>
        </div>

        {/* Hamburger button (only visible on mobile) */}
        <button
          className="sm:hidden cursor-pointer text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-4 items-center">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/scholarship">Scholarship</Link>
          </li>
          {session ? (
            <>
              <li>
                <Link href="/dashboard" className="flex items-center gap-2">
                  {profile && (
                    <Image
                      src={profile}
                      alt="user"
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full"
                    />
                  )}
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 cursor-pointer px-3 py-1.5 text-white rounded-md"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                href="/login"
                className="bg-blue-500 px-3 py-2 text-white rounded-md"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="flex flex-col gap-3 px-4 pb-3 sm:hidden">
          <li>
            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li>
            <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
          </li>
          {session ? (
            <>
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  {profile && (
                    <Image
                      src={profile}
                      alt="user"
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full"
                    />
                  )}
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="bg-red-500 px-3 py-1.5 text-white rounded-md"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                href="/login"
                className="bg-blue-500 px-3 py-1.5 text-white rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}

export default Navbar