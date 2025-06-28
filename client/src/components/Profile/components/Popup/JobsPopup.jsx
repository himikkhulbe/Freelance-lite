import React from 'react'
import RatingCard from '../RatingSection/components/RatingCard/RatingCard'
import { X } from 'lucide-react'
import ServiceOrJobsCard from '../JobsCard/JobsCard'

function ServiceOrJobsPopup({ user, close, loggedInUser }) {
    return (
        <div className='fixed inset-0 bg-black/30 backdrop-blur-sm top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-full w-full flex md:items-center items-start justify-center z-[100]'>
            <div className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:w-[90%] w-[100%] max-w-[800px] md:h-[80%] h-full bg-white md:rounded-lg shadow-lg p-[20px] z-50 '>
                <div className="h-[50px] mb-[20px] flex justify-between items-center grow">
                    {user?.user?.role === "freelancer" && <p className="text-black text-lg font-semibold">Services Offered</p>}
                    {user?.user?.role === "client" && <p className="text-black text-lg font-semibold">Jobs Offered</p>}
                    <button onClick={() => close(false)} className="text-gray-600 hover:text-gray-800 transition-colors">
                        <X className="text-gray-600 w-4 h-4" />
                    </button>
                </div>
                <div className="w-full h-[calc(100%_-_70px)] px-4 border-[0.5px] border-slate-500 bg-slate-50 rounded-lg overflow-auto">
                    <div className="mt-[20px]">
                        {
                            user?.jobs.map((job) =>
                                <ServiceOrJobsCard
                                    key={job._id}
                                    job={job}
                                    user={user}
                                    loggedInUser={loggedInUser}
                                />
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceOrJobsPopup