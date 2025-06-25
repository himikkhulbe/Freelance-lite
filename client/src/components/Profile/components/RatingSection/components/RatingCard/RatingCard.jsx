import React from 'react'
import { Key, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function RatingCard({ profile, name, rating, comment, date, renderStars, profileId }) {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate(`/profile/${profileId}`);
    }
    return (
        <div className="flex flex-col gap-[10px] w-full border-b-[0.5px] border-gray-300 pb-[5px] mb-[20px]">
            <div className="flex justify-between items-center w-full">
                <div className="flex gap-[8px] items-center">
                    {profile ? <div className="h-[40px] rounded-full aspect-[1/1] bg-gray-300"
                        style={{ backgroundImage: `url(${profile})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    </div>
                        :
                        <div className="h-[40px] rounded-full aspect-[1/1] bg-gray-300 flex justify-center items-center">
                            <User className="h-6 w-6 text-gray-500" h-full w-full />
                        </div>
                    }
                    <div className="flex flex-col justify-center items-start">
                        <p onClick={handleProfileClick} className="text-black text-md font-semibold cursor-pointer">{name}</p>
                        <div className="flex items-center gap-[5px]">
                            <div className='flex items-center'>
                                {renderStars(rating)}
                            </div>
                            <p>{Number(rating).toFixed(1)}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-gray-600 text-xs">{date}</p>
                </div>
            </div>
            <div className="w-full">
                <p className="">{`"${comment}"`}</p>
                {/* <a className="text-sm text-blue-600" href="">{`Service: ${service}`}</a> */}
            </div>
        </div>
    )
}

export default RatingCard