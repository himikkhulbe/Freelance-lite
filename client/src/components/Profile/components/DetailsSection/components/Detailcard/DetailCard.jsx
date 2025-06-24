import { Edit } from 'lucide-react'
import IconWithtext from './components/IconWithtext/IconWithtext';

function DetailCard({ title, data, edit, user, loggedInUser ,open}) {
    return (
        <div className="w-full min-h-[120px] p-[30px] border-[0.5px] border-slate-500 bg-slate-50 rounded-lg">
            <div className="w-full flex justify-between items-center">
                <p className="text-black text-lg font-semibold">
                    {title}
                </p>
                {edit && loggedInUser?.user?._id === user?.user?._id &&
                    <Edit onClick={()=>{open(true)}} className="text-blue-600 w-4 h-4 cursor-pointer" />
                }                            </div>
            <div className="mt-[20px]">
                {data?.map((item, index) => (
                    <div key={index} >
                        {item.text && <IconWithtext
                            key={index}
                            Icon={item.Icon}
                            text={item.text}
                            link={item.link}
                        />}

                    </div>
                ))}
            </div>
        </div>
    )
}

export default DetailCard;