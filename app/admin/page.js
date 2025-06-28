'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import UserCard from '@/components/UserCard';
import { fetchUserData, userEmail, usersData, PromoteAsAdmin } from '@/actions/userActions';
import { rejectDocument, studentsAllData, verifyDocument } from '@/actions/schlorshipActions';
import { toast } from 'react-toastify';
import RejectedModal from '@/components/RejectedModal';
import { SendEmail } from '@/lib/sendEmail';
import Image from 'next/image';

const StudentsDataTable = () => {

    const [open, setOpen] = useState(false); // this open for add reason of rejection
    const [open2, setOpen2] = useState(false); // this open reject reason modal  
    const [rejectedReason, setRejectedReason] = useState('');
    const [reject, setReject] = useState('');
    const [docId, setDocId] = useState(null);
    const [studentsData, setStudentsData] = useState([]);

    useEffect(() => {
        const fetchStudentsData = async () => {
            const response = await studentsAllData();
            if (!response.success) {
                console.log(response.message);
            } else {
                setStudentsData(response.data);
            }
        }
        fetchStudentsData();
    }, [])


    const verifyStudentDetails = async (id, userId, name) => {
        toast.warning('document verifing...');
        const result = await verifyDocument(id);
        if (result.success) {
            toast.success(result.message);
            const emailName = await userEmail(userId);


            // send a notification email to user after successful submission;
            const res = await SendEmail({ email: emailName.data.email, username: name, type: 'verified' })
            const data = await res.json();

            if (data.success) {
                console.log(data.message);
            } else {
                console.log(data.message);
            }

        } else {
            toast.error(result.message);
        }
    }

    const rejectForm = async (userId, name) => {
        try {
            const result = await rejectDocument(docId, reject);
            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
            setOpen(false);
            setReject('');
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <>
            {
                studentsData.length === 0 ? <div className='my-8 text-center font-medium text-xl'>There is no schlorship form filled by students</div>
                    : <div className="w-full overflow-x-auto mb-16 ">
                        <div className='flex justify-center items-center text-green-600 gap-3 my-2 text-xl font-medium'>
                            <p>Download verified students data</p>
                            <Image
                                width={20}
                                height={20}
                                src="/file-download.png"
                                alt="download"
                                className='h-5 cursor-pointer hover:h-6'
                                onClick={() => {
                                    window.open('/api/export-excel', '_blank');
                                }}
                            />
                        </div>

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
                                        <th className="px-4 py-3 border-b text-left text-sm md:text-base font-semibold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentsData && studentsData.map((student, idx) => (
                                        <tr key={idx} className="hover:bg-gray-100 transition">
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
                                            <td className={`px-4 py-3 border-b font-medium text-sm md:text-base ${student.verified ? 'text-green-600' : 'text-red-600'}`}>
                                                <div className='flex justify-center items-center gap-2'>
                                                    {
                                                        student.rejected ? <p>No action needed</p>
                                                            : student.verified ? <p>No action needed</p>
                                                                : <>
                                                                    <Image
                                                                        width={24}
                                                                        height={24}
                                                                        src="/reject.png"
                                                                        alt="reject"
                                                                        title='reject'
                                                                        className='h-6 cursor-pointer hover:h-7'
                                                                        onClick={() => { setOpen(true), setDocId(student.id) }}
                                                                    />
                                                                    <Image
                                                                        width={24}
                                                                        height={24}
                                                                        src="/approve.png"
                                                                        alt="approve"
                                                                        title='approve'
                                                                        className='h-6 cursor-pointer hover:h-7'
                                                                        onClick={() => verifyStudentDetails(student.id, student.userId, student.name)}
                                                                    />
                                                                </>
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
            }
            <div>
                {open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                        {/* Modal Content */}
                        <div className="relative bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md sm:w-full pointer-events-auto">
                            <h2 className="text-xl font-bold mb-4">Reject Form</h2>
                            <button
                                onClick={() => setOpen(false)}
                                className='text-2xl cursor-pointer absolute top-5 right-6'
                            >X</button>
                            <p className="mb-4 text-gray-700">Please describe rejection reason </p>
                            {/* Reject Reason Field */}
                            <label htmlFor="reject-reason" className="block text-sm font-medium text-gray-700 mb-1">
                                Reject Reason
                            </label>
                            <textarea
                                name='reject'
                                value={reject}
                                onChange={(e) => setReject(e.target.value)}
                                rows={4}
                                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                                placeholder="Enter reason here..."
                            ></textarea>

                            {/* Buttons */}
                            <div className="flex justify-end gap-2">
                                <button
                                    className="px-4 py-2 cursor-pointer bg-gray-500 text-white rounded hover:bg-gray-600"
                                    onClick={() => { setOpen(false), setReject('') }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700"
                                    onClick={rejectForm}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* // this modal open for rejectedReason */}
                {open2 && (
                    <RejectedModal
                        reason={rejectedReason}
                        action={{ open2, setOpen2 }}
                    />
                )}
            </div>
        </>
    )
}


// this table for promote a user as admin so display users data
const AdminTable = () => {
    const [userData, setUserData] = useState([]);
    const [refresh, setRefresh] = useState(false); // Add this line

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await usersData();
            if (response.success) {
                setUserData(response.data);
            } else {
                console.log(response.message);
            }
        }
        fetchUserData();
    }, [refresh])

    const promoteAdmin = async (email, username) => {
        try {
            if (confirm('Do you want to promote user as admin')) {
                const result = await PromoteAsAdmin(email);
                if (result.success) {
                    // send a notification email to user after successful submission;
                    const res = await SendEmail({ email: email, username: username, type: 'admin' })
                    const data = await res.json();
                    if (data.success) {
                        console.log(data.message);
                    } else {
                        console.log(data.message);
                    }
                    toast.success(result.message);
                    setRefresh(prev => !prev);
                } else {
                    toast.error(result.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="w-full overflow-x-auto mb-16 ">
            <div className="min-w-full mx-auto">
                <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 border-b text-left text-sm md:text-base font-semibold text-gray-700">Username</th>
                            <th className="px-4 py-3 border-b text-left text-sm md:text-base font-semibold text-gray-700">Email</th>
                            <th className="px-4 py-3 border-b text-left text-sm md:text-base font-semibold text-gray-700">Status</th>
                            <th className="px-4 py-3 border-b text-left text-sm md:text-base font-semibold text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userData.length > 0 && userData.map((user, idx) => {
                                return (
                                    <tr key={idx} className="hover:bg-gray-100 transition">
                                        <td className="px-4 py-3 border-b text-gray-800 font-medium capitalize text-sm md:text-base">{user.username}</td>
                                        <td className="px-4 py-3 border-b text-gray-700 capitalize text-sm md:text-base">{user.email}</td>
                                        <td className="px-4 py-3 border-b text-gray-700 capitalize text-sm md:text-base">{user.admin ? 'Admin' : 'User'}</td>
                                        {
                                            user.admin ? <td className='text-red-400 border-b'>No action needed</td>
                                                : <td className='border-b '>
                                                    <Image
                                                        width={24}
                                                        height={24}
                                                        src="/approve.png"
                                                        alt="promote"
                                                        title='promote'
                                                        className='h-6 cursor-pointer hover:h-7'
                                                        onClick={() => promoteAdmin(user.email, user.username)}
                                                    />
                                                </td>
                                        }
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}



const Admin = () => {
    const { data: session } = useSession();
    const [userData, setUserData] = useState({});
    const [action, setAction] = useState('verify');

    useEffect(() => {
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
        userData();
    }, [session])


    if (!session) {
        return <div className='text-center mt-10 text-xl'>Please login to access this page</div>
    }
    if (session && !session?.user?.admin) {
        return <div className='text-center mt-10 text-xl'>Access denied!! Your are not an admin</div>
    }

    return (
        <>
            <div className="max-w-3xl mx-auto p-4">
                <UserCard
                    userData={userData}
                />
            </div>

            <div className=' border border-gray-200 text-center p-2 my-2'>
                <span onClick={() => setAction('verify')} className={`mx-4 font-medium text-2xl cursor-pointer ${action === 'verify' && 'underline underline-offset-8'} `}>Verify</span>
                <span onClick={() => setAction('admin')} className={`mx-4 font-medium text-2xl cursor-pointer ${action === 'admin' && 'underline underline-offset-8'}`}>Admin</span>
            </div>
            {
                action === 'verify' &&
                <>
                    <div className='text-center text-2xl font-medium mt-8 mb-5'>Verify Students details</div>
                    <StudentsDataTable
                    />
                </>
            }

            {
                action === 'admin' &&
                <div>
                    <div className='text-center text-2xl font-medium my-8'>Promote users as admin</div>

                    <AdminTable />
                </div>
            }
        </>
    )
}

export default Admin
