import {Eye} from 'lucide-react';
import RatingCard from './components/RatingCard/RatingCard';

function RatingSection({user, renderStars, formatDate}) {
    return (
        <div className="w-full min-h-[120px] p-[30px] border-[0.5px] border-slate-500 bg-slate-50 rounded-lg">
            <div className="flex justify-between items-center grow">
                <p className="text-black text-lg font-semibold">Recent Reviews</p>
                {user?.ratings?.length > 3 &&
                    <button className="bg-gray-200 h-[42px] flex px-[10px] py-[5px] rounded-md justify-center items-center gap-[7px] text-sm text-gray-600">
                        <Eye className="text-gray-600 w-4 h-4" /> View All
                    </button>
                }

            </div>
            <div className="mt-[20px]">
                {user?.ratings?.length === 0 ? (
                    <p className="text-gray-500 text-sm font-semibold">No rating found</p>
                ) : (
                        user?.ratings?.slice(user?.ratings?.length - 3, user?.ratings?.length).map((rating) => (
                        <RatingCard
                            key={rating._id}
                            profile={rating.raterProfile}
                            name={rating.raterName}
                            rating={rating.rating}
                            comment={rating.comment}
                            date={formatDate(rating.createdAt)}
                            service={rating.service}
                            renderStars={renderStars}
                        />
                    ))
                )}
            </div>

        </div>
    )
}

export default RatingSection