import { useState, useEffect } from 'react';
import { Edit, IndianRupee, Clock, Star, User, Trash2 } from 'lucide-react';
import DeleteServicePopup from './DeleteServicePopup.jsx';
import { useNavigate } from 'react-router-dom';
import RenderStars from "./RenderStars.jsx"

function ServiceCard({ data, loggedInUser }) {
    console.log("Service data:", data);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if (!isOpen) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
        return () => (document.body.style.overflow = 'auto');
    }, [isOpen]);

    const openService = () => {
        console.log("Open service clicked");
        navigate(`/service/${data?._id}`);
    }
    const EditService = () => {
        console.log("Edit service clicked");
        navigate(`/updateService/${data?._id}`);
    }

    return (
        <div
            key={data?._id}
            className="p-5 mb-5 border border-gray-200 shadow-lg rounded-md flex flex-col gap-3 overflow-x-hidden bg-white"
        >
            <DeleteServicePopup
                serviceId={data?._id}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />

            <div className="flex gap-[20px] justify-between items-center">
                <h2 className="font-medium text-lg">{data?.title}</h2>
                {/* Edit , Delete, Preview :- only show when the loggedin user own this service */}
                {loggedInUser?._id === data?.user?._id && (
                    <div className='flex gap-2'>
                        <Edit onClick={() => EditService()} className="text-blue-600 w-4 h-4 cursor-pointer" />
                        <Trash2 onClick={() => setIsOpen(true)} className="text-red-600 w-4 h-4 cursor-pointer" />
                    </div>
                )}
            </div>
            <p className="text-gray-500 text-sm">{data?.description}</p>
            <div className="flex gap-5 justify-start items-center">
                <div className="flex items-center">
                    <IndianRupee className="w-4 h-4 text-gray-500" />
                    <span className="text-green-600">{data?.price?.toLocaleString('en-IN')}</span>
                </div>
                <span className="flex gap-1 justify-start items-center text-gray-500">
                    <Clock className="w-4 h-4 text-gray-500" />
                    {data?.deliveryTime} days
                </span>
            </div>

            <div className="flex gap-2 flex-wrap">
                <span className="bg-blue-200 text-blue-800 p-1 rounded-full text-xs px-2 text-nowrap">
                    {data?.category}
                </span>
                {/* tag will load not more than 3 tags after that it will show {number} more */}
                {data?.tags?.slice(0, 3).map((tag) => {
                    return (
                        <span
                            key={tag}
                            className="bg-gray-200 p-1 rounded-full text-xs text-gray-600 px-2 text-nowrap"
                        >
                            {tag}
                        </span>
                    );
                })}
                {data?.tags?.length > 3 && (
                    <span className="bg-gray-200 p-1 rounded-full text-xs text-gray-600 px-2 text-nowrap">
                        +{data?.tags?.length - 3} more
                    </span>
                )}
            </div>
                {/* order now and view details button only show when the loggedin user is not the owner of the service */}
            {loggedInUser?._id !== data?.user?._id && (
                <div className="flex gap-4 pt-2 flex-wrap">
                    <button className="px-14 py-2 bg-blue-700 sm:w-fit w-full text-white text-lg font-light rounded-lg text-nowrap">
                        Order Now
                    </button>
                    <button onClick={openService} className="px-4 py-2 border text-gray-500 rounded-lg sm:w-fit w-full">
                        View Details
                    </button>
                </div>
            )}
        </div>
    );
}

export default ServiceCard;