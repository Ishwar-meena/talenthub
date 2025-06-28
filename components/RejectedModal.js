
const RejectedModal = ({action, reason }) => {
    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                {/* Modal Content */}
                <div className="relative bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md sm:w-full pointer-events-auto">
                    <h2 className="text-xl font-bold mb-4 text-red-600">Rejected Reason</h2>
                    <button
                        onClick={() => action.setOpen2(!action.open2)}
                        className='text-2xl cursor-pointer absolute top-5 right-6'
                    >X</button>
                    <p className="mb-4  text-red-500">{reason}</p>
                </div>
            </div>
        </div>
    )
}
export default RejectedModal
