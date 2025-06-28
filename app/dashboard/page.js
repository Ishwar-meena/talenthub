'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchStudentData } from '@/actions/schlorshipActions';
import { fetchUserData } from '@/actions/userActions';
import UserCard from '@/components/UserCard';
import Link from 'next/link';
import RejectedModal from '@/components/RejectedModal';
import Image from 'next/image';


export default function UserDashboard() {
    const { data: session } = useSession();
    const [studentData, setStudentData] = useState([]);
    const [userData, setUserData] = useState({});
    const [open2, setOpen2] = useState(false); // this open reject reason modal  
    const [rejectedReason, setRejectedReason] = useState('');

    useEffect(() => {
        const studentData = async () => {
            if (session?.user?.id) {
                const result = await fetchStudentData({ userId: session.user.id });
                if (result.success) {
                    setStudentData(result.data);
                } else {
                    toast.error(result.message);
                }
            }
        }
        const userData = async () => {
            if (session?.user?.email) {
                const result = await fetchUserData({ email: session.user.email });
                if (result.success) {
                    setUserData(result.data);
                } else {
                    console.log(result.message);
                }
            }
        }
        studentData();
        userData();
    }, [session])



    if (!session) {
        return <div className='h-screen w-full flex justify-center items-center font-medium text-2xl '>Please wait or login to access this page</div>
    }
    return (
        <>
            <div className="max-w-3xl mx-auto p-4">
                {
                    userData?.admin && <p className='text-center text-lg font-medium text-green-600 my-2'>Congrats you are now an admin go to <Link href="/admin" className='underline hover:italic'> admin page</Link></p>
                }
                <UserCard
                    userData={userData}
                />
            </div>

            <div className='my-8 text-center font-medium text-2xl'>Track your document progress here</div>
            {
                studentData.length === 0 ? <div className='my-8 text-center font-medium text-xl'>There is no schlorship form filled by you</div>
                    : <div className="w-full overflow-x-auto mb-16 ">
                        <div className="min-w-[1000px] mx-auto">
                            <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md table-auto">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 border-b text-left text-sm md:text-base font-semibold text-gray-700">Name</th>
                                        <th className="px-4 py-3 border-b text-left text-sm md:text-base font-semibold text-gray-700">Father Name</th>
                                        <th className="px-4 py-3 border-b text-left text-sm md:text-base font-semibold text-gray-700">Mother Name</th>
                                        <th className="px-4 py-3 border-b text-left text-sm md:text-base font-semibold text-gray-700">City</th>
                                        <th className="px-4 py-3 border-b text-left text-sm md:text-base font-semibold text-gray-700">Institution</th>
                                        <th className="px-4 py-3 border-b text-left text-sm md:text-base font-semibold text-gray-700">Exam</th>
                                        <th className="px-4 py-3 border-b text-left text-sm md:text-base font-semibold text-gray-700">Marks</th>
                                        <th className="px-4 py-3 border-b text-left text-sm md:text-base font-semibold text-gray-700">Marksheet</th>
                                        <th className="px-4 py-3 border-b text-left text-sm md:text-base font-semibold text-gray-700">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentData && studentData.map((student, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50 transition">
                                            <td className="px-4 py-3 border-b text-gray-800 font-medium capitalize text-sm md:text-base">{student.name}</td>
                                            <td className="px-4 py-3 border-b text-gray-700 capitalize text-sm md:text-base">{student.fathername}</td>
                                            <td className="px-4 py-3 border-b text-gray-700 capitalize text-sm md:text-base">{student.mothername}</td>
                                            <td className="px-4 py-3 border-b text-gray-700 capitalize text-sm md:text-base">{student.city}</td>
                                            <td className="px-4 py-3 border-b text-gray-700 text-sm md:text-base">{student.insistitution}</td>
                                            <td className="px-4 py-3 border-b text-gray-700 text-sm md:text-base">{student.exam}</td>
                                            <td className="px-4 py-3 border-b text-green-700 font-semibold text-sm md:text-base">{student.result}</td>
                                            <td className="px-4 py-3 border-b">
                                                <a href={student.marksheet} target='_blank' rel="noopener noreferrer">
                                                    <Image
                                                        width={32}  
                                                        height={32}
                                                        src="/file.png"
                                                        alt="marksheet"
                                                        className='h-8 inline'
                                                    />
                                                </a>
                                            </td>
                                            <td className={`px-4 py-3 border-b font-medium text-sm md:text-base ${student.verified ? 'text-green-600' : 'text-red-600'}`}>
                                                {
                                                    student.rejected ?
                                                        <button onClick={() => { setOpen2(true), setRejectedReason(student.reason) }} className='cursor-pointer'>rejected</button>
                                                        : student.verified ? 'verified' : 'pending'
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

            }
            {
                open2 && <RejectedModal
                    reason={rejectedReason}
                    action={{ open2, setOpen2 }}
                />
            }
        </>
    );
}