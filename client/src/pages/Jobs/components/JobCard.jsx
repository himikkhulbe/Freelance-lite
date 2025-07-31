import { Clock, IndianRupee } from "lucide-react";

const JobCard = ({ data }) => {
  
  return (
    <>
      {data.map((job) => {
        return (
          <div
            key={job.id}
            className="p-5 border border-gray-200 shadow-lg rounded-md mt-5 flex flex-col gap-3 overflow-x-hidden bg-white"
          >
            <div className="flex sm:flex-row flex-col gap-[20px] ">
              <h2 className="font-medium text-xl">{job.title}</h2>
              <span className="py-2 bg-blue-200 text-blue-800 w-fit rounded-full text-xs text-center flex justify-center items-center  px-5 ">
                {job.category}
              </span>
            </div>
            <p className="text-gray-500">{job.description}</p>
            <div className="flex gap-10 justify-start items-center">
              <div className="flex items-center">
                <IndianRupee className="w-4 h-4 text-gray-500" />
                <span className="text-green-600">{job.budget}</span>
              </div>
              <span className="flex gap-1 justify-start items-center text-gray-500">
                <Clock className="w-4 h-4 text-gray-500" />
                {job.duration || job.experienceLevel}
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {job.requiredSkills?.slice(0, 3).map((skill) => {
                return (
                  <span
                    key={skill}
                    className="bg-gray-200 p-1 rounded-full text-sm text-gray-600 px-4 text-nowrap"
                  >
                    {skill}
                  </span>
                );
              })}
              {job.requiredSkills?.length > 3 && (
                <span className="bg-gray-200 p-1 rounded-full text-sm text-gray-600 px-4 text-nowrap">
                  +{job.requiredSkills.length - 3} more
                </span>
              )}
            </div>
            <div className="flex gap-4 pt-2 flex-wrap">
              <button className="px-14 py-2 bg-blue-700 sm:w-fit w-full text-white text-lg font-light rounded-lg text-nowrap">
                Apply Now
              </button>
              <button className="px-4 py-2 border text-gray-500 rounded-lg sm:w-fit w-full">
                {" "}
                View Details
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default JobCard;
