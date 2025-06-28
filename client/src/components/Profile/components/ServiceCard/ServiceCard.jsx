import React from 'react';
import { Edit, IndianRupee, Clock, Star, User } from 'lucide-react';

function ServiceCard({ service, user, loggedInUser }) {
    console.log("Service data:", service);
    console.log("User data:", user);
    console.log("Logged-in user data:", loggedInUser);


    return (
        <div
            key={service?._id}
            className="p-5 mb-5 border border-gray-200 shadow-lg rounded-md mt-5 flex flex-col gap-3 overflow-x-hidden bg-white"
        >
            <div className="flex gap-[20px] justify-between items-center">
                <h2 className="font-medium text-lg">{service?.title}</h2>
                {loggedInUser?.user?._id === user?.user?._id && (
                    <Edit className="text-blue-600 w-4 h-4 cursor-pointer" />
                )}
            </div>

            <p className="text-gray-500 text-sm">{service?.description}</p>

            <div className="flex gap-5 justify-start items-center">
                <div className="flex items-center">
                    <IndianRupee className="w-4 h-4 text-gray-500" />
                    <span className="text-green-600">{service?.price.toLocaleString('en-IN')}</span>
                </div>
                <span className="flex gap-1 justify-start items-center text-gray-500">
                    <Clock className="w-4 h-4 text-gray-500" />
                    {service?.deliveryTime} days
                </span>
                {service?.rating > 0 && (
                    <span className="flex gap-1 justify-start items-center text-gray-500">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        {service?.rating} ({service?.reviewCount})
                    </span>
                )}
            </div>

            <div className="flex gap-2 flex-wrap">
                <span className="bg-blue-200 text-blue-800 p-1 rounded-full text-xs px-2 text-nowrap">
                    {service?.category}
                </span>
                {service?.tags.slice(0, 3).map((tag) => {
                    return (
                        <span
                            key={tag}
                            className="bg-gray-200 p-1 rounded-full text-xs text-gray-600 px-2 text-nowrap"
                        >
                            {tag}
                        </span>
                    );
                })}
                {service?.tags?.length > 3 && (
                    <span className="bg-gray-200 p-1 rounded-full text-xs text-gray-600 px-2 text-nowrap">
                        +{service?.tags?.length - 3} more
                    </span>
                )}
            </div>

            {loggedInUser?.user?._id !== user?.user?._id && (
                <div className="flex gap-4 pt-2 flex-wrap">
                    <button className="px-14 py-2 bg-blue-700 sm:w-fit w-full text-white text-lg font-light rounded-lg text-nowrap">
                        Order Now
                    </button>
                    <button className="px-4 py-2 border text-gray-500 rounded-lg sm:w-fit w-full">
                        View Details
                    </button>
                </div>
            )}
        </div>
    );
}

export default ServiceCard;