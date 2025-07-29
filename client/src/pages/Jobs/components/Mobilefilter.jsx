import { X } from "lucide-react";

const Mobilefilter = ({
  selectedCategory,
  setSelectedCategory,
  selectedBudget,
  setSelectedBudget,
  sortBy,
  setSortBy,
  categories,
  budgetRanges,
  showMobileFilters,
  setShowMobileFilters,
}) => {
  return (
    <>
      {showMobileFilters && (
        <div className="border rounded-md shadow-lg p-2 bg-white h-min mt-5">
          <div className="flex justify-between pt-2 px-3 mb-4">
            <h3 className="font-semibold text-xl">Filters</h3>
            <X
              onClick={() => setShowMobileFilters(false)}
              className="w-6 h-6"
            />
          </div>
          {/* Category Filter */}
          <div className="p-3 ">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Filter */}
          <div className="p-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget Range
            </label>
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {budgetRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div className="p-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="budget-high">Highest Budget</option>
              <option value="budget-low">Lowest Budget</option>
              <option value="deadline">Deadline (Urgent First)</option>
            </select>
          </div>

          {/* Clear Filters */}
          <div className="p-3">
            <button
              onClick={() => {
                setSelectedCategory("All Categories");
                setSelectedBudget("All Budgets");
                // setSearchTerm('');
                setSortBy("newest");
              }}
              className="w-full px-4 py-2  text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Mobilefilter;
