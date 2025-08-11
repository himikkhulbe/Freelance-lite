import { useState, useEffect } from 'react';
import { Edit, IndianRupee, Clock, Trash2, Eye } from 'lucide-react'
import DeleteJobPopup from './DeleteJobPopup.jsx';
import { useNavigate } from 'react-router-dom';

function JobsCard({ data, loggedInUser, size=false}) {
    const navigate = useNavigate();
    console.log("Job data:", data);
    console.log("Logged-in user data:", loggedInUser);

    const editJob = () => {
        console.log("Edit service clicked");
        navigate(`/updateJob/${data?._id}`);
    }
    const viewJob = () => {
        console.log("View service clicked");
        navigate(`/job/${data?._id}`);
    }

    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if (!isOpen) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
        return () => (document.body.style.overflow = 'auto');
    }, [isOpen]);
    return (

        <div
            key={data._id}
            className="p-5 mb-5 border border-gray-200 shadow-lg rounded-md flex flex-col gap-3 overflow-x-hidden bg-white "
        >
            <DeleteJobPopup
                jobId={data?._id}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <div className="flex gap-[20px] justify-between items-center ">
                <h2 className="font-medium text-lg">{data.title}</h2>
                {loggedInUser?._id === data?.client?._id &&
                    <div className='flex gap-2'>
                        <Eye onClick={viewJob} className="text-gray-600 w-4 h-4 cursor-pointer" />
                        <Edit onClick={() => editJob()} className="text-blue-600 w-4 h-4 cursor-pointer" />
                        <Trash2 onClick={() => setIsOpen(true)} className="text-red-600 w-4 h-4 cursor-pointer" />
                    </div>
                }
            </div>
            <p className="text-gray-500 text-sm">{data?.description.slice(0, 100)}{data?.description.length > 100 ? <span onClick={() => {
                viewJob()
            }} className="text-blue-600 cursor-pointer">...more</span> : ''}</p>
            <div className="flex gap-5 justify-start items-center">
                <div className="flex items-center">
                    <IndianRupee className="w-4 h-4 text-gray-500" />
                    <span className="text-green-600">{data.budget.toLocaleString('en-IN')}</span>
                </div>
                <span className="flex gap-1 justify-start items-center text-gray-500">
                    <Clock className="w-4 h-4 text-gray-500" />
                    {data.duration}
                </span>
            </div>
            <div className="flex gap-2 flex-wrap">
                <span className=" bg-blue-200 text-blue-800  p-1 rounded-full text-xs px-2 text-nowrap">
                    {data.category}
                </span>
                {data.requiredSkills.slice(0, 3).map((skill) => {
                    return (
                        <span
                            key={skill}
                            className="bg-gray-200 p-1 rounded-full text-xs text-gray-600 px-2 text-nowrap"
                        >
                            {skill}
                        </span>
                    );
                })}
                {data.requiredSkills.length > 3 && (
                    <span
                        className="bg-gray-200 p-1 rounded-full text-xs text-gray-600 px-2 text-nowrap"
                    >
                        +{data.requiredSkills.length - 3} more
                    </span>
                )}
            </div>
            {loggedInUser?._id !== data?.client?._id &&
                <div className="flex gap-4 pt-2 flex-wrap ">
                    <button className={`px-14 py-2 bg-blue-700 ${size ? "sm:w-fit lg:w-full" : "sm:w-fit"} w-full text-white text-lg font-light rounded-lg text-nowrap `}>
                        Apply Now
                    </button>
                    <button onClick={() => viewJob()} className={`px-14 py-2 border text-gray-500 rounded-lg ${size ? "sm:w-fit lg:w-full" : "sm:w-fit"} w-full`}>
                        {" "}
                        View Details
                    </button>
                </div>}
        </div>
    )
}

export default JobsCard