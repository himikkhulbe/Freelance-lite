import { Search, Filter, MapPin, Clock, DollarSign, IndianRupee, User, Star, Bookmark, BookmarkCheck, Eye, X, Menu } from 'lucide-react';
import { useState } from 'react';


const jobsData = [
  {
    "_id": "68563628adb7c8fa5c4ac9bd",
    "client": "6855becd96f186bf3e4cbaaf",
    "title": "Build a Landing Page for SaaS Product",
    "description": "Need a responsive landing page built with React and Tailwind. Should include hero section, features, pricing, and contact form.",
    "requiredSkills": ["React", "Tailwind CSS", "JavaScript"],
    "budget": 25000,
    "duration": "2 weeks",
    "deadline": "2025-07-10T00:00:00.000Z",
    "category": "Web Development",
    "isOpen": true,
    "proposals": [],
    "createdAt": "2025-06-21T04:33:44.135Z",
    "updatedAt": "2025-06-21T04:33:44.135Z",
    "__v": 0
  },
  {
    "_id": "68563628adb7c8fa5c4ac9be",
    "client": "6855becd96f186bf3e4cbaaf",
    "title": "Mobile App UI/UX Design for Healthcare App",
    "description": "Seeking a talented UI/UX designer to create intuitive and accessible designs for our healthcare mobile application. Experience in healthcare industry preferred.",
    "requiredSkills": ["UI/UX Design", "Mobile Design", "Figma", "Healthcare", "Accessibility"],
    "budget": 35000,
    "duration": "1 month",
    "deadline": "2025-07-25T00:00:00.000Z",
    "category": "Design",
    "isOpen": true,
    "proposals": [],
    "createdAt": "2025-06-22T04:33:44.135Z",
    "updatedAt": "2025-06-22T04:33:44.135Z",
    "__v": 0
  },
  {
    "_id": "68563628adb7c8fa5c4ac9bf",
    "client": "6855becd96f186bf3e4cbaaf",
    "title": "Content Writing for Digital Marketing Campaign",
    "description": "Need experienced content writers for various digital marketing campaigns. Must be able to write engaging blog posts, social media content, and email campaigns.",
    "requiredSkills": ["Content Writing", "SEO", "Social Media", "Email Marketing", "Copywriting"],
    "budget": 15000,
    "duration": "3 weeks",
    "deadline": "2025-07-15T00:00:00.000Z",
    "category": "Writing",
    "isOpen": true,
    "proposals": [],
    "createdAt": "2025-06-21T04:33:44.135Z",
    "updatedAt": "2025-06-21T04:33:44.135Z",
    "__v": 0
  },
  {
    "_id": "68563628adb7c8fa5c4ac9c0",
    "client": "6855becd96f186bf3e4cbaaf",
    "title": "Data Analysis and Visualization Dashboard",
    "description": "Looking for a data scientist to create interactive dashboards and perform complex data analysis. Experience with Python, Tableau, and statistical modeling required.",
    "requiredSkills": ["Python", "Tableau", "Data Analysis", "Statistics", "SQL"],
    "budget": 45000,
    "duration": "6 weeks",
    "deadline": "2025-08-05T00:00:00.000Z",
    "category": "Data Science",
    "isOpen": true,
    "proposals": [],
    "createdAt": "2025-06-19T04:33:44.135Z",
    "updatedAt": "2025-06-19T04:33:44.135Z",
    "__v": 0
  },
  {
    "_id": "68563628adb7c8fa5c4ac9c1",
    "client": "6855becd96f186bf3e4cbaaf",
    "title": "Video Editing for YouTube Channel",
    "description": "Seeking a skilled video editor for ongoing YouTube content creation. Must be proficient in After Effects and Premiere Pro with a creative eye for storytelling.",
    "requiredSkills": ["Video Editing", "After Effects", "Premiere Pro", "Motion Graphics", "YouTube"],
    "budget": 20000,
    "duration": "4 weeks",
    "deadline": "2025-07-20T00:00:00.000Z",
    "category": "Video & Animation",
    "isOpen": true,
    "proposals": [],
    "createdAt": "2025-06-23T04:33:44.135Z",
    "updatedAt": "2025-06-23T04:33:44.135Z",
    "__v": 0
  },
  {
    "_id": "68563628adb7c8fa5c4ac9c2",
    "client": "6855becd96f186bf3e4cbaaf",
    "title": "SEO Optimization for E-commerce Website",
    "description": "Need an SEO expert to improve organic search rankings for our e-commerce website. Must have proven track record with technical SEO and content optimization.",
    "requiredSkills": ["SEO", "Google Analytics", "Keyword Research", "Technical SEO", "Content Strategy"],
    "budget": 30000,
    "duration": "5 weeks",
    "deadline": "2025-07-30T00:00:00.000Z",
    "category": "Digital Marketing",
    "isOpen": true,
    "proposals": [],
    "createdAt": "2025-06-18T04:33:44.135Z",
    "updatedAt": "2025-06-18T04:33:44.135Z",
    "__v": 0
  }
];


const Jobs = () => {

  const [jobData, setJobData] = useState(jobsData)

  return (
    <div className="min-h-screen">
      <div className="py-6 px-4 border-b shadow-sm sm:px-6 lg:px-8">
        <div className="lg:pl-24">
          <h1 className="text-3xl font-bold mb-3">Find Your Next Project</h1>
          <h4 className="text-gray-500">
            Discover oppurtunities that match your skills and interests
          </h4>
        </div>
      </div>

      {/* Main */}
      <div className="p-5">
        <div className="px-2 py-4 rounded-md border flex gap-3 justify-center">
          <div className='p-2 border border-gray-300 rounded-md flex gap-2'>
            <Search className='text-gray-500' />
            <input className='px-2' type="text" placeholder="Search jobs by title, skills, or description..."  />
          </div>
          <button className='flex border text-gray-600 border-gray-300 rounded-md items-center py-1 px-2 gap-2'>
            <Filter className='text-gray-500 text-sm w-5 h-5' />
            Filters
          </button>
        </div>
        <div className=''>
          {jobData.map((job) => {
            return <div key={job._id} className='p-5 border-gray-300 border rounded-md mt-5 flex flex-col gap-3 overflow-x-hidden'>
            <div className='flex sm:flex-row flex-col gap-[20px] '>
              <h2 className='font-medium text-xl'>{job.title}</h2>
              <span className='py-2 bg-blue-200 text-blue-800 w-fit rounded-full text-xs text-center flex justify-center items-center  px-5 '>{job.category}</span>
            </div>
            <p className='text-gray-500'>{job.description}</p>
            <div className='flex gap-10 justify-start items-center'>
              <div className='flex items-center'>
                  <IndianRupee className="w-4 h-4 text-gray-500" />
              <span className='text-green-600'>{job.budget}</span>
              </div>
              <span className='flex gap-1 justify-start items-center text-gray-500'><Clock className="w-4 h-4 text-gray-500" />{job.duration}</span>
            </div>
            <div className='flex gap-2 flex-wrap'>
              {job.requiredSkills.slice(0,3).map((skill) => {
                return <span key={skill} className='bg-gray-200 p-1 rounded-full text-sm text-gray-600 px-4 text-nowrap'>{skill}</span>
              })}
            </div>
            <div className='flex gap-4 pt-5 flex-wrap'>
              <button className='px-14 py-2 bg-blue-700 sm:w-fit w-full text-white text-lg font-light rounded-lg text-nowrap'>Apply Now</button>
                <button className='px-4 py-2 border text-gray-500 rounded-lg sm:w-fit w-full'> View Details</button>
            </div>
          </div>
          })}
          
        </div>
      </div>
    </div>
  );
};

export default Jobs;
