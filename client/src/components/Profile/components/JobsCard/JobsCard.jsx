import { Edit, IndianRupee, Clock } from 'lucide-react'

function JobsCard({ job, user, loggedInUser }) {
    console.log("Job data:", job);
    console.log("User data:", user);
    console.log("Logged-in user data:", loggedInUser);
    return (
        <div
            key={job._id}
            className="p-5 mb-5 border border-gray-200 shadow-lg rounded-md mt-5 flex flex-col gap-3 overflow-x-hidden bg-white "
        >

            <div className="flex gap-[20px] justify-between items-center ">
                <h2 className="font-medium text-lg">{job.title}</h2>
                {loggedInUser?.user?._id === user?.user?._id &&
                    <Edit className="text-blue-600 w-4 h-4 cursor-pointer" />
                }
            </div>


            <p className="text-gray-500 text-sm">{job.description}</p>
            <div className="flex gap-5 justify-start items-center">
                <div className="flex items-center">
                    <IndianRupee className="w-4 h-4 text-gray-500" />
                    <span className="text-green-600">{job.budget.toLocaleString('en-IN')}</span>
                </div>
                <span className="flex gap-1 justify-start items-center text-gray-500">
                    <Clock className="w-4 h-4 text-gray-500" />
                    {job.duration}
                </span>
            </div>
            <div className="flex gap-2 flex-wrap">
                <span className=" bg-blue-200 text-blue-800  p-1 rounded-full text-xs px-2 text-nowrap">
                    {job.category}
                </span>
                {job.requiredSkills.slice(0, 3).map((skill) => {
                    return (
                        <span
                            key={skill}
                            className="bg-gray-200 p-1 rounded-full text-xs text-gray-600 px-2 text-nowrap"
                        >
                            {skill}
                        </span>
                    );
                })}
                {job.requiredSkills.length > 3 && (
                    <span
                        className="bg-gray-200 p-1 rounded-full text-xs text-gray-600 px-2 text-nowrap"
                    >
                        +{job.requiredSkills.length - 3} more
                    </span>
                )}
            </div>
            {loggedInUser?.user?._id !== user?.user?._id &&
                <div className="flex gap-4 pt-2 flex-wrap">
                    <button className="px-14 py-2 bg-blue-700 sm:w-fit w-full text-white text-lg font-light rounded-lg text-nowrap ">
                        Apply Now
                    </button>
                    <button className="px-4 py-2 border text-gray-500 rounded-lg sm:w-fit w-full">
                        {" "}
                        View Details
                    </button>
                </div>}

        </div>
    )
}

export default JobsCard