import Image from "next/image"

const UserCard = ({ userData }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6 flex flex-col sm:flex-row items-center gap-4 relative">
            <div className="relative">
                <Image
                    src={userData.avatar || '/google.png'} // Replace with dynamic URL
                    alt="Profile Picture"
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                />
                <button
                    className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow"
                >
                </button>
            </div>
            <div className="text-center sm:text-left relative">
                <div className="flex items-center justify-center sm:justify-between gap-2">
                    <h2 className="text-xl font-semibold ">@{userData.username || 'username'}</h2>
                    <button
                        className="p-1 rounded-full hover:bg-gray-100"
                    >
                    </button>
                </div>
                <p className="text-gray-600">{userData.email || 'useremail'}</p>
            </div>
            {
                userData?.admin && <div className="bg-green-600 rounded-full px-2 py-1 text-white font-medium text-2xl">Admin</div>
            }
        </div>
    )
}
export default UserCard
