import React from 'react'

const Notification = () => {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="w-[95%]  sm:w-3/4 lg:w-1/2 border  border-gray-300 rounded-md p-4 overflow-hidden">
        <h1 className="text-center font-medium text-3xl sm:text-4xl lg:text-5xl my-4">Notifications</h1>
        <div className="min-h-80 overflow-hidden">
          <ul className="flex flex-col text-center gap-4 animate-scroll">
            <li>We proudly honor students who secured top ranks in government exams!</li>
            <li>Applications open for our 2025 Excellence Award — nominate a deserving student today!</li>
            <li>Special recognition for youth making a difference in their communities.</li>
            <li>Join our free mentorship program for aspiring civil service candidates.</li>
            <li>Scholarships awarded to underprivileged students excelling in academics.</li>
            <li>Congratulations to our achievers who qualified for government jobs this year!</li>
            <li>Thank you for supporting our mission to empower talented youth nationwide.</li>
            <li>Upcoming: Motivational talk by past awardees — register now!</li>

          </ul>
        </div>
      </div>
    </div>


  )
}

export default Notification
