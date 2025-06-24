import { Edit, User } from 'lucide-react'

function ProfileMain({ renderStars, user, loggedInUser, openEdit }) {

    return (
        <div className="xl:w-[80%] w-[90%] min-h-[250px] border-[0.5px] border-slate-500 bg-slate-50 rounded-lg flex md:flex-row flex-col justify-start md:gap-[25px] gap-[20px] md:items-end items-start pb-[30px] px-[30px] pt-[50px] relative">
            <div className="w-full h-[125px] bg-blue-600 absolute top-0 left-0 rounded-tl-lg rounded-tr-lg"></div>
            <div className="md:w-[130px] w-[120px] aspect-[1/1] bg-slate-300 rounded-full shadow-md relative z-20 flex justify-center items-center">
                {user?.user?.profilePicture ? 
                    <img
                        className="w-full h-full object-cover rounded-full"
                        src={user?.user?.profilePicture}
                        alt={`${user?.user?.name} profile`}
                    />
                : 
                <User className="w-16 h-16 object-cover rounded-full" />
                }
            </div>
            <div className="flex md:flex-row flex-col justify-between md:items-center md:gap-[30px] gap-[20px] grow h-full">
                <div>
                    <div className="flex justify-start items-center gap-[8px]">
                        <p className="text-black text-4xl font-bold">{user?.user?.name.charAt(0).toUpperCase()+user?.user?.name.slice(1)}</p>
                        {loggedInUser?.user?._id === user?.user?._id &&
                                <Edit onClick={() => openEdit(true)} className="text-blue-600 w-4 h-4 cursor-pointer" />
                        }
                    </div>
                    <p className="text-black text-md">{`@${user?.user?.username}`}</p>
                    <p className="text-lg font-semibold text-blue-600">
                        {user?.user?.role.charAt(0).toUpperCase() + user?.user?.role.slice(1)}
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-[7px]">
                    <div className="flex items-center">
                        {renderStars(user?.user?.averageRating)}
                    </div>
                    <p>{user?.user?.averageRating}.0</p>
                    <p className="text-gray-500">{`(${user?.ratings?.length} reviews)`}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileMain