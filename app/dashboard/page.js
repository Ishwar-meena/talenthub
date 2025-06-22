'use client';
import Image from 'next/image';
import { Pencil, Check, X, Dice1 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';

export default function UserDashboard() {
    const { data: session } = useSession();
    const [editing, setEditing] = useState(null);

    if (!session) {
        return <div className='h-screen w-full text-center font-medium text-2xl'>Please wait or login to access this page</div>
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            {/* User Info Card */}
            <div className="bg-white rounded-lg shadow p-6 flex flex-col sm:flex-row items-center gap-4 relative">
                <div className="relative">
                    <Image
                        src={session?.user?.image} // Replace with dynamic URL
                        alt="Profile Picture"
                        width={100}
                        height={100}
                        className="rounded-full object-cover"
                    />
                    <button
                        className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow"
                    >
                        <Pencil className="cursor-pointer w-4 h-4 text-gray-600" />
                    </button>
                </div>

                <div className="text-center sm:text-left relative">
                    <div className="flex items-center gap-2">
                        {editing ? (
                            <>
                                <input
                                    type="text"
                                    value={newName}
                                    className="border p-1 rounded text-sm"
                                />
                                <button className="cursor-pointer text-green-600">
                                    <Check className="w-4 h-4" />
                                </button>
                                <button className="cursor-pointer text-red-600">
                                    <X className="w-4 h-4" />
                                </button>
                            </>
                        ) : (
                            <>
                                <h2 className="text-xl font-semibold">@{session?.user?.email}</h2>
                                <button
                                    className="p-1 rounded-full hover:bg-gray-100"
                                >
                                    <Pencil className="cursor-pointer w-4 h-4 text-gray-600" />
                                </button>
                            </>
                        )}
                    </div>
                    <p className="text-gray-600">{session?.user?.email}</p>
                </div>
            </div>
            <div className='mt-8 text-center font-medium text-2xl'>Track your document progress here</div>

        </div>
    );
}