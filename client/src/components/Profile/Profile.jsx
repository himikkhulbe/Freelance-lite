import React from 'react'
import { useAuth } from "../../contexts/AuthContext";
import { Star } from 'lucide-react';



function Profile() {
    const { user } = useAuth();
    console.log(user);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
        ));
    };

    return (
        <div className='min-h-screen flex flex-col pt-[60px] items-center justify-start bg-gray-100 gap-[30px]'>
            {/* Profile Section */}
            <div className='w-[80%] min-h-[250px] border-[0.5px] border-slate-500 bg-slate-50 rounded-xl flex md:flex-row flex-col justify-start md:gap-[30px] gap-[20px] md:items-end items-start pb-[30px] px-[30px] pt-[50px] relative'>
                <div className='w-full h-[125px] bg-blue-600 absolute top-0 left-0 rounded-tl-xl rounded-tr-xl'></div>
                <div  className='md:w-[150px] w-[120px] aspect-[1/1] bg-slate-300 rounded-full shadow-md relative z-20'>
                <img className='w-full h-full object-cover rounded-full' src={user?.user?.profilePicture} alt={`${user?.user?.name} profile`} />
                </div>
                <div className="flex md:flex-row flex-col justify-between md:items-center md:gap-[30px] gap-[20px] grow h-full">
                    <div>
                        <p className='text-black text-4xl font-bold'>{user?.user?.name}</p>
                        <p className='text-black text-md'>{`@${user?.user?.username}`}</p>
                        <p className='text-lg font-semibold text-blue-600'>{user?.user?.role}</p>
                    </div>
                    <div className='flex flex-wrap items-center gap-[7px]'>
                        <div className='flex items-center'>{renderStars(user?.user?.averageRating)}</div>
                        <p>{user?.user?.averageRating}.0</p>
                        <p className='text-gray-500'>{`(5 reviews)`}</p>
                    </div>
                </div>
            </div>
            {/* bottom Section */}
            <div className='w-[80%] min-h-[250px] border-[0.5px] border-slate-500 bg-slate-50 rounded-xl'>
                {/* left side */}
                <div>
                    
                </div>
                {/* right side */}
                <div></div>
            </div>
        </div>
    )
}

export default Profile