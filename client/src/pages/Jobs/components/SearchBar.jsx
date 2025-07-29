import {Search, Filter} from "lucide-react";
import { useState } from "react";

const SearchBar = ({searchTerm, setSearchTerm, setShowMobileFilters}) => {

    const [isSearchFocused, setIsSearchFocused] = useState(false);
    

    
  return (
    <>
        <div className="px-4 py-4 lg:w-full rounded-md border border-gray-200 shadow-lg flex gap-3 justify-center bg-white overflow-x-hidden">
            <div
              style={isSearchFocused ? { border: "2px solid #2463EB" } : {}}
              className="p-2 border border-gray-300 rounded-md flex gap-4 w-full "
            >
              <Search className="text-gray-500" />
              <input
                className="px-2 w-full border-collapse border-0 focus:ring-0 focus:border-transparent outline-none"
                type="text"
                placeholder="Search jobs by title, skills, or description..."
                value={searchTerm}
                onFocus={()=>{
                  setIsSearchFocused(true);
                }}
                onBlur={()=>{
                  setIsSearchFocused(false);
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex border text-gray-600 border-gray-300 rounded-md items-center py-1 px-2 gap-2"
            >
              <Filter className="text-gray-500 text-sm w-5 h-5" />
              Filters
            </button>
          </div>
    </>
  )
}

export default SearchBar